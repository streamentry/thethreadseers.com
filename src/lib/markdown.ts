import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { marked, type Tokens } from 'marked'

/**
 * Build-time chapter loading and markdown rendering.
 *
 * Chapters are plain markdown with a small, predictable shape: an H1, then
 * paragraphs, blockquotes, thematic breaks, emphasis, and an occasional list.
 * Rendering happens once at build time, so the output is static HTML that
 * crawlers and readers without JavaScript can both read.
 */

const CONTENT = join(process.cwd(), 'content')

/** Glob-free raw reader: paths come from the generated chapter manifest. */
export function readChapter(relPath: string): string {
  return readFileSync(join(CONTENT, relPath), 'utf8')
}

export function stripTopHeading(md: string): string {
  const lines = md.split('\n')
  if (!lines[0]?.trim().startsWith('#')) return md
  lines.shift()
  while (lines[0]?.trim() === '') lines.shift()
  return lines.join('\n')
}

export function firstHeading(md: string): string {
  const line = md.split('\n', 1)[0] ?? ''
  return line.replace(/^#+\s*/, '').trim()
}

export function wordCount(md: string): number {
  return md
    .replace(/^#.*$/gm, '')
    .split(/\s+/)
    .filter(Boolean).length
}

/** Plain-text paragraphs, used for meta descriptions and llms.txt. */
export function toParagraphs(md: string): string[] {
  return stripTopHeading(md)
    .split(/\n\s*\n/)
    .map((block) =>
      block
        .replace(/^>\s?/gm, '')
        .replace(/^#{1,6}\s+/gm, '')
        .replace(/^[-*]\s+/gm, '')
        .replace(/^---+$/gm, '')
        .replace(/[*_`]/g, '')
        .replace(/\s+/g, ' ')
        .trim(),
    )
    .filter(Boolean)
}

/**
 * Derive a meta description from a chapter's own opening prose. Beats a
 * repeated template: every chapter gets a description that actually describes
 * that chapter, in that language.
 */
export function describe(
  paragraphs: string[],
  opts: { label: string; title: string; locale: 'en' | 'vi' },
): string {
  const opening = paragraphs.find((p) => p.length > 90) ?? paragraphs[0] ?? ''
  const clamp = opts.locale === 'vi' ? 150 : 170
  const trimmed =
    opening.length > clamp ? opening.slice(0, clamp).replace(/\s+\S*$/, '') + '…' : opening
  const lead = opts.title
    .replace(/^(Chapter \d+[AB]?)\s*[:—-]\s*/i, '')
    .replace(/^(Chương \d+[AB]?)\s*[:—-]\s*/i, '')
    .replace(/^(Interlude|Tiểu khúc)\s*:\s*/i, '')
  return opts.locale === 'vi'
    ? `${lead} — Chương ${opts.label} của Những Người Thấy Sợi Chỉ, Sách Một. ${trimmed} Đọc miễn phí trực tuyến, không cần đăng ký.`
    : `${lead} — Chapter ${opts.label} of The Thread Seers, Book One. ${trimmed} Read free online, no sign-up.`
}

let rendererConfigured = false

export function renderMarkdown(md: string): string {
  if (!rendererConfigured) {
    // The manuscripts use straight quotes and no HTML; escaping is handled by
    // marked, but disable raw HTML pass-through so nothing in a manuscript can
    // inject markup at build time.
    marked.use({ gfm: true, breaks: false })
    rendererConfigured = true
  }
  return marked.parse(md, { async: false }) as string
}

export function countWords(md: string): number {
  return wordCount(md)
}

export type { Tokens }
