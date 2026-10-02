#!/usr/bin/env python3
"""
Gemini 3.8 Flash Text-to-Speech (TTS) Generator for The Thread Seers (Vietnamese edition).

Model: models/gemini-3.8-flash-tts
Audio: Native 24kHz 16-bit mono audio/wav encoded to high-fidelity MP3 via lameenc.
Voice Persona: Prebuilt voice (default: Kore — calm, warm, contemplative, ideal for YA fantasy).

Usage:
  # Quick test greeting:
  python3 scripts/gemini_tts.py --test-hello

  # Synthesize a specific chapter by slug (e.g. prologue, chapter-1):
  python3 scripts/gemini_tts.py --chapter prologue

  # Synthesize all chapters sequentially starting from prologue to end:
  python3 scripts/gemini_tts.py --all-from prologue
"""

import argparse
import base64
import json
import os
import re
import sys
import time
import urllib.request
import urllib.error
import wave
from pathlib import Path


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


def chunk_text(text: str, max_chars: int = 1500) -> list[str]:
    """Split chapter text into natural paragraph chunks suitable for Gemini TTS token limits."""
    paragraphs = [p.strip() for p in text.split('\n\n') if p.strip()]
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
    import io

    with wave.open(io.BytesIO(wav_bytes), 'rb') as w:
        n_channels = w.getnchannels()
        sampwidth = w.getsampwidth()
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


def generate_gemini_38_tts(
    api_key: str,
    text: str,
    model: str = "gemini-3.8-flash-tts",
    voice: str = "Aoede",
    max_retries: int = 5
) -> bytes:
    """Generate audio/wav using Gemini 3.8 Flash TTS with a strictly pinned voice persona."""
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"

    payload = {
        "contents": [
            {
                "parts": [
                    {"text": text}
                ]
            }
        ],
        "generationConfig": {
            "responseModalities": ["AUDIO"],
            "speechConfig": {
                "voiceConfig": {
                    "prebuiltVoiceConfig": {
                        "voiceName": voice
                    }
                }
            }
        }
    }

    data_bytes = json.dumps(payload).encode('utf-8')
    headers = {"Content-Type": "application/json"}

    for attempt in range(max_retries):
        req = urllib.request.Request(url, data=data_bytes, headers=headers)
        try:
            with urllib.request.urlopen(req, timeout=120) as resp:
                data = json.loads(resp.read().decode('utf-8'))

            candidates = data.get("candidates", [])
            if not candidates:
                raise RuntimeError(f"No candidates returned: {data}")

            parts = candidates[0].get("content", {}).get("parts", [])
            for part in parts:
                inline_data = part.get("inlineData")
                if inline_data and "data" in inline_data:
                    return base64.b64decode(inline_data["data"])
            raise RuntimeError(f"No audio inlineData in response: {parts}")

        except urllib.error.HTTPError as e:
            err_msg = e.read().decode('utf-8')
            if e.code in (429, 500, 503) and attempt < max_retries - 1:
                wait_sec = (2 ** attempt) * 3
                print(f"    ⚠️ HTTP {e.code} (Rate limit/busy), retrying in {wait_sec}s...")
                time.sleep(wait_sec)
                continue
            raise RuntimeError(f"Gemini API HTTP {e.code}: {err_msg}")
        except Exception as e:
            if attempt < max_retries - 1:
                wait_sec = (2 ** attempt) * 2
                print(f"    ⚠️ Connection error ({e}), retrying in {wait_sec}s...")
                time.sleep(wait_sec)
                continue
            raise e

    raise RuntimeError("Failed to generate TTS after max retries.")


def concatenate_wav_bytes(wav_list: list[bytes]) -> bytes:
    """Concatenate multiple WAV bytes of identical format into a single WAV byte stream."""
    import io
    if not wav_list:
        return b""
    if len(wav_list) == 1:
        return wav_list[0]

    all_frames = []
    params = None

    for b in wav_list:
        with wave.open(io.BytesIO(b), 'rb') as w:
            if params is None:
                params = w.getparams()
            all_frames.append(w.readframes(w.getnframes()))

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
    model: str = "gemini-3.8-flash-tts",
    voice: str = "Aoede",
    limit_paragraphs: int = None
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

    chunks = chunk_text(text)
    print(f"  📄 Text length: {len(text):,} chars | {len(chunks)} chunk(s)")

    wav_chunks = []
    for i, chunk in enumerate(chunks, 1):
        print(f"  ⏳ Synthesizing chunk {i}/{len(chunks)} ({len(chunk)} chars)...", end="", flush=True)
        t0 = time.time()
        wav_data = generate_gemini_38_tts(api_key, chunk, model=model, voice=voice)
        elapsed = time.time() - t0
        print(f" done ({elapsed:.1f}s)")
        wav_chunks.append(wav_data)
        if i < len(chunks):
            time.sleep(1.2)  # Respect rate limits between sequential chunks

    print(f"  🔗 Merging and encoding MP3...", end="", flush=True)
    combined_wav = concatenate_wav_bytes(wav_chunks)
    wav_to_mp3(combined_wav, output_mp3)
    size_kb = output_mp3.stat().st_size // 1024
    print(f" done: {output_mp3.name} ({size_kb:,} KB)")


def main():
    load_dotenv()

    parser = argparse.ArgumentParser(description="Gemini 3.8 TTS Generator for The Thread Seers")
    parser.add_argument('--file', type=str, help="Path to markdown chapter file")
    parser.add_argument('--chapter', type=str, help="Chapter slug (e.g. prologue, chapter-1)")
    parser.add_argument('--all-from', type=str, help="Synthesize all chapters sequentially starting from this slug (e.g. prologue)")
    parser.add_argument('--text', type=str, help="Direct text string to synthesize")
    parser.add_argument('--test-hello', action='store_true', help="Synthesize greeting test audio")
    parser.add_argument('--output', type=str, help="Output MP3 path")
    parser.add_argument('--model', type=str, default="gemini-3.8-flash-tts", help="Gemini TTS model (default: gemini-3.8-flash-tts)")
    parser.add_argument('--voice', type=str, default="Aoede", help="Pinned voice name (default: Aoede, or Kore, Charon, Puck, Fenrir)")
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

    manifest = get_chapter_manifest()
    out_dir = Path("public/audio/vi")
    out_dir.mkdir(parents=True, exist_ok=True)

    if args.test_hello:
        out_mp3 = Path(args.output) if args.output else out_dir / "gemini-3.8-hello.mp3"
        text = (
            "Xin chào! Đây là bản thử nghiệm giọng đọc tiếng Việt bằng Gemini 3.8 Text-to-Speech "
            "cho bộ tiểu thuyết Những Người Thấy Sợi Chỉ của tác giả Lê Việt Hồng. "
            "Mọi thanh âm và sợi tơ của Mạng Dệt đang bắt đầu ngân vang."
        )
        wav_data = generate_gemini_38_tts(api_key, text, model=args.model, voice=args.voice)
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

        print(f"\n🚀 Beginning sequential batch synthesis of {total} chapters from '{start_slug}'...")

        for idx, ch in enumerate(target_chapters, 1):
            slug = ch['slug']
            ch_output = out_dir / f"{slug}.mp3"
            print(f"\n[{idx}/{total}] 📖 {slug} — {ch['viTitle']}")

            if ch_output.exists() and ch_output.stat().st_size > 20000 and not args.force:
                print(f"  ⏭️ Already exists ({ch_output.stat().st_size // 1024:,} KB). Skipping.")
                continue

            synthesize_chapter(
                api_key,
                ch['viPath'],
                ch_output,
                model=args.model,
                voice=args.voice,
                limit_paragraphs=args.limit_paragraphs
            )
            # Brief pause between chapters
            time.sleep(2.0)

        print(f"\n🎉 All {total} chapters processed successfully!")

    elif args.chapter:
        target_slug = args.chapter.strip()
        matched = [c for c in manifest if c['slug'] == target_slug]
        if not matched:
            print(f"❌ Error: Chapter slug '{target_slug}' not found.")
            sys.exit(1)
        ch = matched[0]
        out_mp3 = Path(args.output) if args.output else out_dir / f"{target_slug}.mp3"
        print(f"\n📖 Synthesizing: {target_slug} ({ch['viTitle']})")
        synthesize_chapter(
            api_key,
            ch['viPath'],
            out_mp3,
            model=args.model,
            voice=args.voice,
            limit_paragraphs=args.limit_paragraphs
        )
        print(f"✅ Success! Saved to {out_mp3}")

    elif args.file:
        file_path = Path(args.file)
        out_mp3 = Path(args.output) if args.output else out_dir / f"{file_path.stem}.mp3"
        synthesize_chapter(
            api_key,
            file_path,
            out_mp3,
            model=args.model,
            voice=args.voice,
            limit_paragraphs=args.limit_paragraphs
        )
        print(f"✅ Success! Saved to {out_mp3}")

    elif args.text:
        out_mp3 = Path(args.output) if args.output else out_dir / "custom-text.mp3"
        wav_data = generate_gemini_38_tts(api_key, args.text, model=args.model, voice=args.voice)
        wav_to_mp3(wav_data, out_mp3)
        print(f"✅ Success! Saved to {out_mp3}")

    else:
        print("❌ Error: Please specify --chapter <slug>, --all-from <slug>, --file <path>, or --test-hello.")
        sys.exit(1)


if __name__ == '__main__':
    main()
