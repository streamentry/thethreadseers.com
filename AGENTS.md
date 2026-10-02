# The Thread Seers — Agent Guidelines & Architecture

## Overview
*The Thread Seers* (`thethreadseers.com`) is a bilingual (English and Vietnamese) static website built with Astro, Tailwind CSS, and TypeScript, dedicated to the YA fantasy novel series by Lê Việt Hồng.

---

## Text-to-Speech (TTS) Pipeline — Gemini 3.8 Flash TTS

The project incorporates native Vietnamese and English audiobook synthesis powered by **Google Gemini 3.8 Text-to-Speech**.

### 1. Model & Engine Specifications
- **Model:** `gemini-3.8-flash-tts` (`models/gemini-3.8-flash-tts`)
- **Fallback Models:** `gemini-3.8-flash-lite-tts`, `gemini-2.5-flash-preview-tts`
- **Canon Voice Persona:** `Aoede` (pinned in `speechConfig.voiceConfig.prebuiltVoiceConfig.voiceName = "Aoede"` for consistent timbre and expressive audiobook narration)
- **Audio Output:** Native 24,000 Hz, 16-bit mono PCM encapsulated in RIFF/WAVE (`audio/wav`)
- **Distribution Format:** 192 kbps Constant Bitrate MP3 (`.mp3`) encoded via `lameenc` (pure portable C extension, zero system dependency on external ffmpeg)
- **Target Location:** `public/audio/vi/` (Vietnamese) and `public/audio/en/` (English)

### 2. Configuration & Credentials
Credentials must be stored in `.env` (which is excluded in `.gitignore`):

```bash
# Gemini API Configuration
GEMINI_API_KEY=AQ.Ab8RN6K9WL-kXXDOvWwC9K7DBqhBCRRXQracZC2ne3SGTSydHQ
GOOGLE_GENAI_API_KEY=AQ.Ab8RN6K9WL-kXXDOvWwC9K7DBqhBCRRXQracZC2ne3SGTSydHQ
GEMINI_PROJECT_NAME=projects/550797633213
GEMINI_PROJECT_NUMBER=550797633213
```

### 3. Generator Tooling (`scripts/gemini_tts.py`)
All synthesis workflows run through [`scripts/gemini_tts.py`](scripts/gemini_tts.py).

#### Features:
- **Pure Manuscript Synthesis:** Passes cleaned manuscript text directly to the model with zero spoken instruction preambles or meta-prompts.
- **Markdown Normalization:** Automatically strips headers, section dividers (`---`), images, and markdown asterisks/underscores before sending to the model.
- **Smart Paragraph Chunking:** Segments long manuscripts by paragraph boundaries (`~1500` characters per segment) to stay within token budgets and latency constraints.
- **Lossless WAV Stitching:** Combines sequential PCM chunks seamlessly before encoding to MP3.

### 4. Running the TTS Generator
Run the script using `uv` (fast Python tool runner):

```bash
# Test greeting:
uv run --with lameenc python3 scripts/gemini_tts.py --test-hello

# Test sample excerpt (first N paragraphs of a chapter):
uv run --with lameenc python3 scripts/gemini_tts.py \
  --file content/03_BOOK_ONE_VIETNAMESE/01_DISCOVERY/stretch_1_normal_world/1.md \
  --limit-paragraphs 6 \
  --output public/audio/vi/chapter-1-gemini38-sample.mp3

# Synthesize full chapter:
uv run --with lameenc python3 scripts/gemini_tts.py \
  --file content/03_BOOK_ONE_VIETNAMESE/01_DISCOVERY/stretch_1_normal_world/1.md \
  --output public/audio/vi/chapter-1.mp3
```

---

## Project Structure & Conventions

- `content/`: Bilingual manuscript sources.
  - `03_BOOK_ONE/`: English manuscript source files.
  - `03_BOOK_ONE_VIETNAMESE/`: Vietnamese manuscript source files.
- `src/lib/`:
  - `i18n.ts`: Single source of truth for UI translations (132 keys, strict parity).
  - `chapters.ts`: Bilingual chapter manifest mapping slugs and paths.
  - `content.ts`: Story metadata, spectra, seer archetypes, glossary.
  - `pages.ts`: Editorial premise, quartet profiles, field notes.
- `src/pages/`:
  - `[lang]/series/book-one/read/[chapter].astro`: Reader interface.
  - `[lang]/download.astro`: Full offline downloads (EPUB, PDF, Markdown).
- `public/audio/`: Static audiobook assets served directly to the reader.
- `scripts/`: Build and generation utilities (`check-i18n.mjs`, `prerender.mjs`, `postbuild.mjs`, `gemini_tts.py`).

---

## Build & Validation Commands
- `npm run check:i18n` — Validates 100% key parity between English and Vietnamese.
- `npm run build` — Compiles 111 static HTML pages, sitemaps, `robots.txt`, and `llms.txt`.
