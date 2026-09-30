/**
 * Regenerates src/lib/chapters.ts from the two manuscripts plus the author's
 * chapter-order.txt.
 *
 *   node scripts/gen-chapters.mjs
 *
 * The two editions use identical relative paths, so one pass produces a
 * bilingual manifest. Reading order comes from chapter-order.txt; titles come
 * from each manuscript's own H1, which keeps EN and VI headings in sync with
 * the files rather than with a hand-typed table.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const CONTENT = join(ROOT, 'content')
const EN = '03_BOOK_ONE'
const VI = '03_BOOK_ONE_VIETNAMESE'
const ORDER_FILE = process.argv[2] || '/Volumes/SSD/the_thread_seers/chapter-order.txt'

function readHead(file) {
  const first = readFileSync(file, 'utf8').split('\n', 1)[0] ?? ''
  return first.replace(/^#+\s*/, '').trim()
}

function labelFor(name, heading) {
  if (name === 'preface.md') return 'Preface'
  if (name === 'saigon_1943.md') return 'Prologue'
  if (name === 'epilogue.md') return 'Epilogue'
  const m = heading.match(/^Chapter\s+(\d+[AB]?)\b/i)
  if (m) return m[1]
  return 'Interlude'
}

const order = readFileSync(ORDER_FILE, 'utf8')
  .split('\n')
  .map((l) => l.trim().match(/^\[(.+)\]$/))
  .filter(Boolean)
  .map((m) => m[1])

if (!order.length) throw new Error(`no entries parsed from ${ORDER_FILE}`)

const rows = []
let position = 0
const missing = []

for (const entry of order) {
  const rel = entry.split(`${EN}/`, 2)[1]
  if (!rel) throw new Error(`unexpected order entry: ${entry}`)
  const enFile = join(CONTENT, EN, rel)
  const viFile = join(CONTENT, VI, rel)
  for (const [lang, f] of [['en', enFile], ['vi', viFile]]) {
    if (!existsSync(f)) missing.push(`${lang}: ${rel}`)
  }
  if (missing.length) continue

  const enTitle = readHead(enFile)
  const viTitle = readHead(viFile)
  const name = rel.split('/').pop()
  const label = labelFor(name, enTitle)
  const kind = label === 'Preface' || label === 'Prologue' ? 'front' : label === 'Epilogue' ? 'back' : 'chapter'
  if (kind === 'chapter') position += 1

  rows.push({
    slug: name === 'preface.md' ? 'preface' : name === 'saigon_1943.md' ? 'prologue' : name === 'epilogue.md' ? 'epilogue' : `chapter-${name.replace(/\.md$/, '').toLowerCase()}`,
    enPath: `${EN}/${rel}`,
    viPath: `${VI}/${rel}`,
    label,
    enTitle,
    viTitle,
    kind,
    position: kind === 'chapter' ? position : 0,
  })
}

if (missing.length) {
  console.error('missing manuscript files:')
  for (const m of missing) console.error('  ' + m)
  process.exit(1)
}

const q = (s) => `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
const dq = (s) => JSON.stringify(s)

const out = `/**
 * Bilingual chapter manifest.
 *
 * Reading order comes from the author's \`chapter-order.txt\`; both editions
 * (EN and VI) use identical relative paths, so one manifest drives both
 * locales and they cannot drift apart.
 *
 * GENERATED — do not hand-edit. Regenerate with:
 *   node scripts/gen-chapters.mjs
 */

export type Locale = 'en' | 'vi'

export interface ChapterEntry {
  /** URL slug, shared across locales: /en/series/book-one/read/chapter-12a */
  slug: string
  /** Path relative to content/, e.g. 03_BOOK_ONE/01_DISCOVERY/.../12A.md */
  enPath: string
  viPath: string
  /** Chapter label: "12A", "Prologue", "Epilogue" (English) */
  label: string
  /** Heading as written in each manuscript. */
  enTitle: string
  viTitle: string
  kind: 'front' | 'chapter' | 'back'
  /** 1-based position among numbered chapters; 0 for front/back matter. */
  position: number
}

export const chapterOrder: ChapterEntry[] = [
${rows
  .map(
    (r) =>
      `  { slug: ${q(r.slug)}, enPath: ${q(r.enPath)}, viPath: ${q(r.viPath)}, label: ${q(
        r.label,
      )}, enTitle: ${dq(r.enTitle)}, viTitle: ${dq(r.viTitle)}, kind: ${q(r.kind)}, position: ${r.position} },`,
  )
  .join('\n')}
]

export const LOCALES = ['en', 'vi'] as const
export const DEFAULT_LOCALE: Locale = 'en'
export const TOTAL_PARTS = chapterOrder.length
export const NUMBERED_CHAPTERS = chapterOrder.filter((c) => c.kind === 'chapter').length

export function isLocale(value: string | undefined): value is Locale {
  return value === 'en' || value === 'vi'
}

export function findChapter(slug: string): ChapterEntry | undefined {
  return chapterOrder.find((c) => c.slug === slug)
}

export function chapterIndex(slug: string): number {
  return chapterOrder.findIndex((c) => c.slug === slug)
}

export function titleFor(chapter: ChapterEntry, locale: Locale): string {
  return locale === 'vi' ? chapter.viTitle : chapter.enTitle
}

export function pathFor(chapter: ChapterEntry, locale: Locale): string {
  return locale === 'vi' ? chapter.viPath : chapter.enPath
}
`

writeFileSync(join(ROOT, 'src', 'lib', 'chapters.ts'), out)
console.log(
  `gen-chapters: ${rows.length} entries ` +
    `(${rows.filter((r) => r.kind === 'chapter').length} numbered) from ${ORDER_FILE}`,
)
