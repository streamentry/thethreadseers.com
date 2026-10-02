import { existsSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { chapterOrder, type ChapterEntry, type Locale } from './chapters'

export interface AudioTrack {
  slug: string
  locale: Locale
  /** Root-relative path to static audio asset, e.g. /audio/vi/chapter-1.mp3 */
  url: string
  bytes: number
  /** Formatted size label, e.g. "23,0 MB" */
  sizeLabel: string
  filename: string
  downloadName: string
  chapter: ChapterEntry
}

export interface PlaylistItem {
  slug: string
  label: string
  title: string
  filename: string
  sizeLabel: string
  downloadName: string
}

const AUDIO_DIR = join(process.cwd(), 'public', 'audio')

export function formatAudioSize(bytes: number, locale: Locale): string {
  const mb = bytes / 1048576
  const value = mb >= 1 ? mb.toFixed(1) : (bytes / 1024).toFixed(0)
  if (locale === 'vi') {
    return mb >= 1 ? `${value.replace('.', ',')} MB` : `${value} KB`
  }
  return mb >= 1 ? `${value} MB` : `${value} KB`
}

export function getAudioTrack(locale: Locale, slug: string): AudioTrack | null {
  const chapter = chapterOrder.find((c) => c.slug === slug)
  if (!chapter) return null

  const filename = `${slug}.mp3`
  const filePath = join(AUDIO_DIR, locale, filename)
  if (!existsSync(filePath)) return null

  const bytes = statSync(filePath).size
  const downloadName =
    locale === 'vi'
      ? `nhung-nguoi-thay-soi-chi-${slug}.mp3`
      : `the-thread-seers-${slug}.mp3`

  return {
    slug,
    locale,
    url: `/audio/${locale}/${filename}`,
    bytes,
    sizeLabel: formatAudioSize(bytes, locale),
    filename,
    downloadName,
    chapter,
  }
}

export function getAvailableAudioTracks(locale: Locale): AudioTrack[] {
  const tracks: AudioTrack[] = []
  for (const chapter of chapterOrder) {
    const track = getAudioTrack(locale, chapter.slug)
    if (track) tracks.push(track)
  }
  return tracks
}

export function getAudioPlaylist(locale: Locale): PlaylistItem[] {
  const tracks = getAvailableAudioTracks(locale)
  return tracks.map((t) => ({
    slug: t.slug,
    label: t.chapter.label,
    title: locale === 'vi' ? t.chapter.viTitle : t.chapter.enTitle,
    filename: t.filename,
    sizeLabel: t.sizeLabel,
    downloadName: t.downloadName,
  }))
}

export function getNextAudioTrack(locale: Locale, currentSlug: string): AudioTrack | null {
  const tracks = getAvailableAudioTracks(locale)
  const idx = tracks.findIndex((t) => t.slug === currentSlug)
  if (idx !== -1 && idx < tracks.length - 1) {
    return tracks[idx + 1]
  }
  return null
}
