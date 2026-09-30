import { statSync, existsSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Downloadable artifacts.
 *
 * Only current, verified builds are listed. The pre-revision EPUB2 and legacy
 * EPUB were removed: they were stale copies of older text, and the source
 * repository marks them superseded. Shipping them next to current files would
 * have meant three different versions of the same book under download links.
 *
 * Sizes are read from disk at build time rather than hardcoded, so a
 * regenerated artifact can never be advertised with a stale byte count.
 */

const BOOKS = join(process.cwd(), 'public', 'books')

export interface Artifact {
  /** Filename under public/books/ */
  file: string
  format: string
  locale: 'en' | 'vi'
  bytes: number
  note: { en: string; vi: string }
  recommended?: boolean
}

const defs: Omit<Artifact, 'bytes'>[] = [
  {
    file: 'the_thread_seers_epub3.epub',
    format: 'EPUB3',
    locale: 'en',
    note: {
      en: 'Recommended · most e-readers and reading apps',
      vi: 'Khuyên dùng · phù hợp hầu hết máy đọc sách',
    },
    recommended: true,
  },
  {
    file: 'the_thread_seers_sach_mot.epub',
    format: 'EPUB3',
    locale: 'vi',
    note: {
      en: 'Bản tiếng Việt · Vietnamese edition',
      vi: 'Bản tiếng Việt · khuyên dùng',
    },
    recommended: true,
  },
  {
    file: 'the_thread_seers.pdf',
    format: 'PDF',
    locale: 'en',
    note: { en: 'Print, sharing, desktop reading', vi: 'In ấn, chia sẻ, đọc trên máy tính' },
  },
  {
    file: 'the_thread_seers_sach_mot.pdf',
    format: 'PDF',
    locale: 'vi',
    // No hardcoded page count: it goes stale on the next rebuild, and a wrong
    // number is worse than none. The byte size is read from disk above and
    // rendered next to this note.
    note: { en: 'Bản tiếng Việt', vi: 'Bản tiếng Việt · in ấn, chia sẻ' },
  },
  {
    file: 'the_thread_seers.md',
    format: 'MD',
    locale: 'en',
    note: { en: 'Plain text · search, notes, remixing', vi: 'Văn bản thuần · tìm kiếm, ghi chú' },
  },
  {
    file: 'the_thread_seers_sach_mot.md',
    format: 'MD',
    locale: 'vi',
    note: { en: 'Bản tiếng Việt · plain text', vi: 'Bản tiếng Việt · văn bản thuần' },
  },
]

const missing: string[] = []
export const artifacts: Artifact[] = defs.map((d) => {
  const path = join(BOOKS, d.file)
  if (!existsSync(path)) {
    missing.push(d.file)
    return { ...d, bytes: 0 }
  }
  return { ...d, bytes: statSync(path).size }
})

if (missing.length) {
  // Fail the build: a download link to a missing file is a broken promise to
  // readers, and it is easy to miss in review.
  throw new Error(
    `artifacts.ts: referenced files are missing from public/books: ${missing.join(', ')}`,
  )
}

export function forLocale(locale: 'en' | 'vi'): Artifact[] {
  return artifacts.filter((a) => a.locale === locale)
}

export function sizeLabel(bytes: number, locale: 'en' | 'vi'): string {
  const mb = bytes / 1048576
  const value = mb >= 1 ? mb.toFixed(1) : (bytes / 1024).toFixed(0)
  if (locale === 'vi') {
    return mb >= 1 ? `${value.replace('.', ',')} MB` : `${value} KB`
  }
  return mb >= 1 ? `${value} MB` : `${value} KB`
}

export const platformLinks: { name: string; url: string }[] = [
  { name: 'Kindle', url: 'https://www.amazon.com/dp/B0FBHK972Q/' },
  {
    name: 'Google Play Books',
    url: 'https://play.google.com/store/books/details/LE_VIET_HONG_The_Thread_Seers?id=hpVfEQAAQBAJ&hl=en',
  },
]
