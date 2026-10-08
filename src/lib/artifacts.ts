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
      en: 'Recommended · optimized typography for e-readers and mobile apps',
      vi: 'Khuyên dùng · định dạng chuẩn cho máy đọc sách và ứng dụng đọc',
    },
    recommended: true,
  },
  {
    file: 'the_thread_seers_sach_mot.epub',
    format: 'EPUB3',
    locale: 'vi',
    note: {
      en: 'Vietnamese edition · recommended for e-readers and apps',
      vi: 'Bản tiếng Việt · khuyên dùng cho máy đọc sách và ứng dụng di động',
    },
    recommended: true,
  },
  {
    file: 'the_thread_seers.pdf',
    format: 'PDF',
    locale: 'en',
    note: {
      en: 'Reading edition · laid out for desktop and tablet, with room for notes',
      vi: 'Bản đọc · dàn trang cho máy tính và máy tính bảng, có lề để ghi chú',
    },
  },
  {
    file: 'the_thread_seers_sach_mot.pdf',
    format: 'PDF',
    locale: 'vi',
    note: {
      en: 'Vietnamese edition · PDF reading copy for desktop and tablet',
      vi: 'Bản tiếng Việt · bản đọc PDF cho máy tính và máy tính bảng',
    },
  },
  {
    file: 'the_thread_seers.md',
    format: 'MD',
    locale: 'en',
    note: {
      en: 'Clean Markdown · plain text for notes, offline reading, and indexing',
      vi: 'Văn bản thuần Markdown · tiện tra cứu, ghi chú và lưu trữ cá nhân',
    },
  },
  {
    file: 'the_thread_seers_sach_mot.md',
    format: 'MD',
    locale: 'vi',
    note: {
      en: 'Vietnamese edition · clean plain text Markdown',
      vi: 'Bản tiếng Việt · văn bản thuần Markdown tiện tra cứu và lưu trữ',
    },
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
