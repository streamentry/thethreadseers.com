#!/usr/bin/env python3
"""
Gemini 3.8 Flash Text-to-Speech (TTS) Generator for The Thread Seers (Vietnamese edition).

Model: gemini-3.8-flash-tts
Voice: Charon
Style: Vietnamese male narrator, deep warm baritone, calm, dignified, expressive, and captivating.
       Moderate measured pace, never rushed, with rich emotional inflection, dynamic cadence,
       clear articulation, and natural pauses — engaging and vivid, never flat, monotone, or sleepy.
       No chanting, no music. Read every word exactly as written, preserve repetitions. Do not add commentary.
Audio: Native 24kHz 16-bit mono audio/wav encoded to high-fidelity 192 kbps MP3 via lameenc.

Usage:
  # Quick test greeting:
  uv run --with lameenc python3 scripts/gemini_tts.py --test-hello

  # Synthesize a specific chapter by slug (e.g. prologue, chapter-1):
  uv run --with lameenc python3 scripts/gemini_tts.py --chapter prologue --force

  # Synthesize all chapters from preface to epilogue:
  uv run --with lameenc python3 scripts/gemini_tts.py --all-from preface --force
"""

import argparse
import base64
from concurrent.futures import ThreadPoolExecutor, as_completed
import hashlib
import io
import json
import os
import re
import sys
import tempfile
import time
import urllib.error
import urllib.request
import wave
from pathlib import Path


DEFAULT_MODEL = "gemini-3.8-flash-tts"
DEFAULT_VOICE = "Charon"
DEFAULT_STYLE = (
    "Vietnamese male narrator, deep warm baritone, calm, dignified, expressive, and captivating. "
    "Moderate measured pace, never rushed, with rich emotional inflection, dynamic cadence, "
    "clear articulation, and natural pauses — engaging and vivid, never flat, monotone, or sleepy. "
    "No chanting, no music. Read every word exactly as written, preserve repetitions. Do not add commentary."
)
DEFAULT_MAX_CHARS = 1400
DEFAULT_PAUSE_SECONDS = 0.35
CACHE_ROOT = Path(tempfile.gettempdir()) / "thethreadseers_tts_cache_charon"


def load_dotenv(env_path: Path = Path('.env')):
    """Load key-value pairs from .env into os.environ if not already present."""
    if not env_path.exists():
        return
    for line in env_path.read_text(encoding='utf-8').splitlines():
        line = line.strip()
        if not line or line.startswith('#') or '=' not in line:
            continue
        k, v = line.split('=', 1)
        k = k.strip()
        v = v.strip().strip('"').strip("'")
        if k and k not in os.environ:
            os.environ[k] = v


def get_chapter_manifest() -> list[dict]:
    """Parse chapter list from src/lib/chapters.ts to ensure 100% slug and path parity."""
    manifest_file = Path('src/lib/chapters.ts')
    if not manifest_file.exists():
        raise FileNotFoundError("src/lib/chapters.ts not found.")
    content = manifest_file.read_text(encoding='utf-8')
    pattern = re.compile(
        r'\{\s*slug:\s*[\x27\"]([^\x27\"]+)[\x27\"].*?viPath:\s*[\x27\"]([^\x27\"]+)[\x27\"].*?viTitle:\s*[\x27\"]([^\x27\"]+)[\x27\"]',
        re.DOTALL
    )
    entries = []
    for slug, vi_path, vi_title in pattern.findall(content):
        entries.append({
            'slug': slug,
            'viPath': Path('content') / vi_path,
            'viTitle': vi_title,
        })
    return entries


def clean_markdown_for_speech(raw: str) -> str:
    """Strip markdown formatting to yield pure, natural prose for audiobook narration."""
    lines = raw.splitlines()
    cleaned_lines = []
    for line in lines:
        stripped = line.strip()
        # Headings become natural spoken titles
        if stripped.startswith('#'):
            title = re.sub(r'^#+\s*', '', stripped)
            cleaned_lines.append(f"{title}.")
            continue
        # Skip horizontal scene dividers
        if re.match(r'^[-*_]{3,}$', stripped):
            continue
        # Strip images
        line = re.sub(r'!\[.*?\]\(.*?\)', '', line)
        # Convert links to plain text
        line = re.sub(r'\[(.*?)\]\(.*?\)', r'\1', line)
        # Remove bold / italics asterisks and underscores
        line = re.sub(r'[*_]{1,3}(.*?)[*_]{1,3}', r'\1', line)
        # Remove blockquote markers
        line = re.sub(r'^\s*>\s*', '', line)
        cleaned_lines.append(line)

    text = '\n'.join(cleaned_lines)
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()


def split_long_paragraph(text: str, max_chars: int = DEFAULT_MAX_CHARS) -> list[str]:
    """Split a paragraph exceeding max_chars at sentence boundaries."""
    parts = []
    while len(text) > max_chars:
        matches = list(re.finditer(r'[.!?…][”’\"\']?\s+', text[:max_chars]))
        if matches:
            cut = matches[-1].end()
        else:
            cut = max(text.rfind(' ', 0, max_chars), text.rfind('\n', 0, max_chars)) + 1
        if cut <= 0:
            cut = max_chars
        parts.append(text[:cut].strip())
        text = text[cut:].strip()
    if text:
        parts.append(text)
    return parts


def chunk_text(text: str, max_chars: int = DEFAULT_MAX_CHARS) -> list[str]:
    """Split chapter text into natural paragraph chunks within Gemini TTS limits."""
    raw_paragraphs = [p.strip() for p in text.split('\n\n') if p.strip()]
    paragraphs = []
    for p in raw_paragraphs:
        if len(p) > max_chars:
            paragraphs.extend(split_long_paragraph(p, max_chars=max_chars))
        else:
            paragraphs.append(p)

    chunks = []
    current_chunk = []
    current_len = 0

    for p in paragraphs:
        if current_len + len(p) + 2 > max_chars and current_chunk:
            chunks.append('\n\n'.join(current_chunk))
            current_chunk = [p]
            current_len = len(p)
        else:
            current_chunk.append(p)
            current_len += len(p) + 2

    if current_chunk:
        chunks.append('\n\n'.join(current_chunk))

    return chunks


def wav_to_mp3(wav_bytes: bytes, mp3_path: Path, bitrate: int = 192):
    """Encode WAV bytes into MP3 using lameenc."""
    import lameenc

    with wave.open(io.BytesIO(wav_bytes), 'rb') as w:
        n_channels = w.getnchannels()
        framerate = w.getframerate()
        pcm_data = w.readframes(w.getnframes())

    encoder = lameenc.Encoder()
    encoder.set_bit_rate(bitrate)
    encoder.set_in_sample_rate(framerate)
    encoder.set_channels(n_channels)
    encoder.set_quality(2)

    mp3_data = encoder.encode(pcm_data)
    mp3_data += encoder.flush()

    mp3_path.parent.mkdir(parents=True, exist_ok=True)
    temp_target = mp3_path.with_suffix('.tmp.mp3')
    temp_target.write_bytes(mp3_data)
    temp_target.replace(mp3_path)


def validate_wav_bytes(audio_bytes: bytes) -> bool:
    """Verify WAV bytes are non-empty 16-bit PCM."""
    try:
        with wave.open(io.BytesIO(audio_bytes), 'rb') as w:
            return w.getnframes() > 0 and w.getsampwidth() == 2
    except Exception:
        return False


def generate_gemini_38_tts(
    api_key: str,
    text: str,
    model: str = DEFAULT_MODEL,
    voice: str = DEFAULT_VOICE,
    style: str = DEFAULT_STYLE,
    max_retries: int = 6
) -> bytes:
    """Generate audio/wav using Gemini 3.8 Flash TTS interactions endpoint with speech_metadata style."""
    digest_key = hashlib.sha256(
        json.dumps({"model": model, "voice": voice, "style": style, "text": text}, ensure_ascii=False, sort_keys=True).encode('utf-8')
    ).hexdigest()
    CACHE_ROOT.mkdir(parents=True, exist_ok=True)
    cache_file = CACHE_ROOT / f"{digest_key}.wav"
    if cache_file.exists():
        cached = cache_file.read_bytes()
        if validate_wav_bytes(cached):
            return cached

    url = "https://generativelanguage.googleapis.com/v1beta/interactions"
    payload = {
        "model": model,
        "input": [
            {
                "type": "user_input",
                "content": [
                    {
                        "type": "text",
                        "text": text,
                        "annotations": [
                            {
                                "type": "speech_metadata",
                                "style": style,
                            }
                        ],
                    }
                ],
            }
        ],
        "response_format": {"type": "audio"},
        "generation_config": {
            "speech_config": [{"voice": voice}]
        },
    }

    data_bytes = json.dumps(payload, ensure_ascii=False).encode('utf-8')
    headers = {
        "Content-Type": "application/json",
        "x-goog-api-key": api_key,
    }

    for attempt in range(max_retries):
        req = urllib.request.Request(url, data=data_bytes, headers=headers)
        try:
            with urllib.request.urlopen(req, timeout=180) as resp:
                data = json.loads(resp.read().decode('utf-8'))

            blocks = [
                c
                for s in data.get("steps", [])
                if s.get("type") == "model_output"
                for c in s.get("content", [])
                if c.get("type") == "audio" and "data" in c
            ]
            if not blocks:
                raise RuntimeError("Provider returned no audio block in interactions response")

            audio_bytes = base64.b64decode(blocks[-1]["data"])
            if not validate_wav_bytes(audio_bytes):
                raise RuntimeError("Invalid or empty WAV returned by provider")

            tmp_cache = cache_file.with_suffix(f".{os.getpid()}.{time.time_ns()}.tmp")
            tmp_cache.write_bytes(audio_bytes)
            tmp_cache.replace(cache_file)
            return audio_bytes

        except urllib.error.HTTPError as e:
            if e.code in (429, 500, 502, 503, 504) and attempt < max_retries - 1:
                wait_sec = min(45, (2 ** attempt) * 3)
                print(f"    ⚠️ HTTP {e.code} (Rate limit/busy), retrying in {wait_sec}s...", flush=True)
                time.sleep(wait_sec)
                continue
            raise RuntimeError(f"Gemini API HTTP {e.code}") from None
        except Exception as e:
            if attempt < max_retries - 1:
                wait_sec = min(30, (2 ** attempt) * 2)
                print(f"    ⚠️ Error ({e}), retrying in {wait_sec}s...", flush=True)
                time.sleep(wait_sec)
                continue
            raise e

    raise RuntimeError("Failed to generate TTS after max retries.")


def concatenate_wav_bytes(wav_list: list[bytes], pause_seconds: float = DEFAULT_PAUSE_SECONDS) -> bytes:
    """Concatenate multiple WAV bytes of identical format with natural inter-chunk pauses."""
    if not wav_list:
        return b""
    if len(wav_list) == 1:
        return wav_list[0]

    all_frames = []
    params = None
    silence_bytes = b""

    for idx, b in enumerate(wav_list):
        with wave.open(io.BytesIO(b), 'rb') as w:
            if params is None:
                params = w.getparams()
                if pause_seconds > 0:
                    n_silence_frames = int(params.framerate * pause_seconds)
                    silence_bytes = b'\x00' * (n_silence_frames * params.nchannels * params.sampwidth)
            all_frames.append(w.readframes(w.getnframes()))
            if silence_bytes and idx < len(wav_list) - 1:
                all_frames.append(silence_bytes)

    out_io = io.BytesIO()
    with wave.open(out_io, 'wb') as out_w:
        out_w.setparams(params)
        for frames in all_frames:
            out_w.writeframes(frames)

    return out_io.getvalue()


def synthesize_chapter(
    api_key: str,
    chapter_path: Path,
    output_mp3: Path,
    model: str = DEFAULT_MODEL,
    voice: str = DEFAULT_VOICE,
    style: str = DEFAULT_STYLE,
    limit_paragraphs: int = None,
    concurrency: int = 4,
):
    """Synthesize an entire chapter file to an MP3 audiobook file."""
    if not chapter_path.exists():
        raise FileNotFoundError(f"Chapter file not found: {chapter_path}")

    raw_content = chapter_path.read_text(encoding='utf-8')
    cleaned = clean_markdown_for_speech(raw_content)

    if limit_paragraphs:
        paras = cleaned.split('\n\n')[:limit_paragraphs]
        text = '\n\n'.join(paras)
    else:
        text = cleaned

    chunks = chunk_text(text, max_chars=DEFAULT_MAX_CHARS)
    total_chunks = len(chunks)
    print(f"  📄 Text length: {len(text):,} chars | {total_chunks} chunk(s) | concurrency={concurrency}", flush=True)

    wav_chunks: list[bytes | None] = [None] * total_chunks
    t_chapter_start = time.time()

    if concurrency <= 1 or total_chunks == 1:
        for i, chunk in enumerate(chunks, 1):
            print(f"  ⏳ Synthesizing chunk {i}/{total_chunks} ({len(chunk)} chars)...", end="", flush=True)
            t0 = time.time()
            wav_data = generate_gemini_38_tts(api_key, chunk, model=model, voice=voice, style=style)
            elapsed = time.time() - t0
            print(f" done ({elapsed:.1f}s)", flush=True)
            wav_chunks[i - 1] = wav_data
            if i < total_chunks:
                time.sleep(0.5)
    else:
        def _worker(idx_zero: int, chunk_str: str):
            t0 = time.time()
            wav = generate_gemini_38_tts(api_key, chunk_str, model=model, voice=voice, style=style)
            return idx_zero, wav, time.time() - t0, len(chunk_str)

        completed_count = 0
        with ThreadPoolExecutor(max_workers=concurrency) as pool:
            futures = [pool.submit(_worker, idx, ch_text) for idx, ch_text in enumerate(chunks)]
            for fut in as_completed(futures):
                idx_zero, wav_data, elapsed, ch_len = fut.result()
                wav_chunks[idx_zero] = wav_data
                completed_count += 1
                print(
                    f"  ✅ Chunk {idx_zero + 1}/{total_chunks} ({ch_len} chars) done in {elapsed:.1f}s "
                    f"[{completed_count}/{total_chunks}]",
                    flush=True,
                )

    print(f"  🔗 Merging and encoding MP3...", end="", flush=True)
    combined_wav = concatenate_wav_bytes([w for w in wav_chunks if w is not None], pause_seconds=DEFAULT_PAUSE_SECONDS)
    wav_to_mp3(combined_wav, output_mp3)
    size_kb = output_mp3.stat().st_size // 1024
    total_elapsed = time.time() - t_chapter_start
    print(f" done: {output_mp3.name} ({size_kb:,} KB in {total_elapsed:.1f}s)", flush=True)


def main():
    load_dotenv()

    parser = argparse.ArgumentParser(description="Gemini 3.8 TTS Generator for The Thread Seers")
    parser.add_argument('--file', type=str, help="Path to markdown chapter file")
    parser.add_argument('--chapter', type=str, help="Chapter slug (e.g. preface, prologue, chapter-1)")
    parser.add_argument('--all-from', type=str, help="Synthesize all chapters sequentially starting from this slug (e.g. preface)")
    parser.add_argument('--text', type=str, help="Direct text string to synthesize")
    parser.add_argument('--test-hello', action='store_true', help="Synthesize greeting test audio")
    parser.add_argument('--output', type=str, help="Output MP3 path")
    parser.add_argument('--model', type=str, default=DEFAULT_MODEL, help=f"Gemini TTS model (default: {DEFAULT_MODEL})")
    parser.add_argument('--voice', type=str, default=DEFAULT_VOICE, help=f"Pinned voice name (default: {DEFAULT_VOICE})")
    parser.add_argument('--style', type=str, default=DEFAULT_STYLE, help="Speech metadata style prompt")
    parser.add_argument('--concurrency', type=int, default=4, help="Parallel chunk workers per chapter (default: 4)")
    parser.add_argument('--limit-paragraphs', type=int, default=None, help="Limit number of paragraphs for testing")
    parser.add_argument('--skip-existing', action='store_true', default=True, help="Skip chapters that already exist (default: True)")
    parser.add_argument('--force', action='store_true', help="Force re-generation even if output already exists")
    parser.add_argument('--api-key', type=str, default=None, help="Gemini API Key")
    args = parser.parse_args()

    api_key = args.api_key or os.environ.get('GEMINI_API_KEY') or os.environ.get('GOOGLE_GENAI_API_KEY')
    if not api_key:
        print("\n❌ Error: GEMINI_API_KEY not found in environment or .env file.")
        print("Please set it in .env or pass --api-key <YOUR_KEY>.\n")
        sys.exit(1)

    print(f"🎙️ Engine: {args.model} | Pinned Voice: {args.voice}")
    print(f"🎭 Style: {args.style}")

    manifest = get_chapter_manifest()
    out_dir = Path("public/audio/vi")
    out_dir.mkdir(parents=True, exist_ok=True)

    if args.test_hello:
        out_mp3 = Path(args.output) if args.output else out_dir / "gemini-3.8-hello.mp3"
        text = (
            "Xin chào! Đây là bản thử nghiệm giọng đọc tiếng Việt bằng Gemini 3.8 Text-to-Speech "
            "với giọng nam trầm ấm Charon cho bộ tiểu thuyết Những Người Thấy Sợi Chỉ của tác giả Lê Việt Hồng. "
            "Mọi thanh âm và sợi tơ của Mạng Dệt đang bắt đầu ngân vang."
        )
        wav_data = generate_gemini_38_tts(api_key, text, model=args.model, voice=args.voice, style=args.style)
        wav_to_mp3(wav_data, out_mp3)
        print(f"✅ Success! Audio file generated at: {out_mp3} ({out_mp3.stat().st_size // 1024} KB)")

    elif args.all_from:
        start_slug = args.all_from.strip()
        slugs = [c['slug'] for c in manifest]
        if start_slug not in slugs:
            print(f"❌ Error: Starting slug '{start_slug}' not found in manifest.")
            print(f"Available slugs: {', '.join(slugs)}")
            sys.exit(1)

        start_idx = slugs.index(start_slug)
        target_chapters = manifest[start_idx:]
        total = len(target_chapters)

        print(f"\n🚀 Beginning batch synthesis of {total} chapters from '{start_slug}' (force={args.force})...", flush=True)

        for idx, ch in enumerate(target_chapters, 1):
            slug = ch['slug']
            ch_output = out_dir / f"{slug}.mp3"
            print(f"\n[{idx}/{total}] 📖 {slug} — {ch['viTitle']}", flush=True)

            if ch_output.exists() and ch_output.stat().st_size > 20000 and not args.force:
                print(f"  ⏭️ Already exists ({ch_output.stat().st_size // 1024:,} KB). Skipping.", flush=True)
                continue

            for ch_attempt in range(3):
                try:
                    synthesize_chapter(
                        api_key,
                        ch['viPath'],
                        ch_output,
                        model=args.model,
                        voice=args.voice,
                        style=args.style,
                        limit_paragraphs=args.limit_paragraphs,
                        concurrency=args.concurrency,
                    )
                    break
                except Exception as err:
                    if ch_attempt < 2:
                        print(f"  ⚠️ Chapter {slug} failed ({err}), retrying chapter ({ch_attempt + 1}/3)...", flush=True)
                        time.sleep(5)
                    else:
                        raise

        print(f"\n🎉 All {total} chapters processed successfully!", flush=True)

    elif args.chapter:
        target_slug = args.chapter.strip()
        matched = [c for c in manifest if c['slug'] == target_slug]
        if not matched:
            print(f"❌ Error: Chapter slug '{target_slug}' not found.")
            sys.exit(1)
        ch = matched[0]
        out_mp3 = Path(args.output) if args.output else out_dir / f"{target_slug}.mp3"
        print(f"\n📖 Synthesizing: {target_slug} ({ch['viTitle']})", flush=True)
        synthesize_chapter(
            api_key,
            ch['viPath'],
            out_mp3,
            model=args.model,
            voice=args.voice,
            style=args.style,
            limit_paragraphs=args.limit_paragraphs,
            concurrency=args.concurrency,
        )
        print(f"✅ Success! Saved to {out_mp3}", flush=True)

    elif args.file:
        file_path = Path(args.file)
        out_mp3 = Path(args.output) if args.output else out_dir / f"{file_path.stem}.mp3"
        synthesize_chapter(
            api_key,
            file_path,
            out_mp3,
            model=args.model,
            voice=args.voice,
            style=args.style,
            limit_paragraphs=args.limit_paragraphs,
            concurrency=args.concurrency,
        )
        print(f"✅ Success! Saved to {out_mp3}", flush=True)

    elif args.text:
        out_mp3 = Path(args.output) if args.output else out_dir / "custom-text.mp3"
        wav_data = generate_gemini_38_tts(api_key, args.text, model=args.model, voice=args.voice, style=args.style)
        wav_to_mp3(wav_data, out_mp3)
        print(f"✅ Success! Saved to {out_mp3}", flush=True)

    else:
        print("❌ Error: Please specify --chapter <slug>, --all-from <slug>, --file <path>, or --test-hello.")
        sys.exit(1)


if __name__ == '__main__':
    main()
