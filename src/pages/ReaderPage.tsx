import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Settings } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import ThreadDivider from '../components/ThreadDivider'

import { chapterOrder, TOTAL_CHAPTERS, type ChapterEntry } from '../lib/chapters'

const chapterFileImporters = import.meta.glob('../../content/03_BOOK_ONE/**/*.md', {
  query: '?raw',
  import: 'default',
}) as Record<string, () => Promise<string>>

const TOTAL = TOTAL_CHAPTERS

function getChapterIndex(slug: string): number {
  return chapterOrder.findIndex((chapter) => chapter.slug === slug)
}

/**
 * Match on the exact path from chapter-order.txt. Matching by bare filename is
 * ambiguous now that chapters split into A/B parts ("26.md" vs "26B.md").
 */
function getImporterByPath(path: string): (() => Promise<string>) | null {
  const suffix = `/content/03_BOOK_ONE/${path}`
  const match = Object.entries(chapterFileImporters).find(([key]) => key.endsWith(suffix))
  return match?.[1] ?? null
}

function extractTitle(markdown: string): string | null {
  const firstLine = markdown.split('\n', 1)[0]?.trim() ?? ''
  if (!firstLine.startsWith('#')) return null
  return firstLine.replace(/^#+\s+/, '').trim() || null
}

function stripTopHeading(markdown: string): string {
  const lines = markdown.split('\n')

  if (!lines[0]?.trim().startsWith('#')) return markdown

  lines.shift()
  while (lines[0]?.trim() === '') {
    lines.shift()
  }

  return lines.join('\n')
}

function chapterNumeral(chapter: ChapterEntry | null): string {
  if (!chapter) return '·'
  if (chapter.slug === 'preface') return '§'
  if (chapter.slug === 'prologue') return '◈'
  if (chapter.slug === 'epilogue') return '❦'
  return chapter.label.padStart(2, '0')
}

export default function ReaderPage() {
  const { bookSlug, chapterSlug } = useParams<{ bookSlug: string; chapterSlug: string }>()
  const [fontSize, setFontSize] = useState(18)
  const [showSettings, setShowSettings] = useState(false)
  const [title, setTitle] = useState('Loading…')
  const [markdown, setMarkdown] = useState<string | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)

  const effectiveBookSlug = bookSlug ?? 'book-one'
  const effectiveChapterSlug = chapterSlug ?? 'prologue'

  const chapterIndex = useMemo(() => getChapterIndex(effectiveChapterSlug), [effectiveChapterSlug])
  const chapterEntry = chapterIndex >= 0 ? chapterOrder[chapterIndex] : null

  const prevChapterSlug =
    chapterIndex > 0 ? chapterOrder[chapterIndex - 1].slug : null
  const nextChapterSlug =
    chapterIndex >= 0 && chapterIndex < chapterOrder.length - 1
      ? chapterOrder[chapterIndex + 1].slug
      : null

  useEffect(() => {
    let cancelled = false

    async function loadChapter() {
      setLoadError(null)
      setMarkdown(null)

      if (!chapterEntry) {
        setLoadError('This thread comes loose here — no such chapter.')
        setTitle('Thread Not Found')
        return
      }

      const importer = getImporterByPath(chapterEntry.path)
      if (!importer) {
        setLoadError('This thread comes loose here — the chapter file is missing.')
        setTitle('Thread Not Found')
        return
      }

      try {
        const raw = await importer()
        if (cancelled) return

        setTitle(extractTitle(raw) ?? chapterEntry.slug)
        setMarkdown(stripTopHeading(raw))
      } catch {
        if (cancelled) return
        setLoadError('This thread comes loose here — the chapter failed to load.')
        setTitle('Thread Not Found')
      }
    }

    void loadChapter()

    return () => {
      cancelled = true
    }
  }, [chapterEntry])

  if (loadError) {
    return (
      <div className="mx-auto max-w-reading px-6 py-24 text-center lg:px-8">
        <p className="eyebrow">the weave · interrupted</p>
        <h1 className="mt-4 font-display text-h1 font-light text-text-primary">{title}</h1>
        <p className="mx-auto mt-6 max-w-prose font-serif text-body text-text-body">{loadError}</p>
        <Link to={`/series/${effectiveBookSlug}`} className="ghost-link mt-8">
          Return to the book
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background-secondary/40">
      {/* Reader chrome */}
      <div className="sticky top-0 z-10 border-b border-text-primary/10 bg-background-primary/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-reading items-center justify-between px-6 py-4">
          <Link
            to={`/series/${effectiveBookSlug}`}
            className="ghost-link text-sm text-text-secondary hover:text-text-primary"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Book
          </Link>

          <p className="font-mono text-xs tracking-[0.18em] text-text-secondary uppercase">
            {chapterIndex >= 0 ? `ch. ${chapterIndex + 1} / ${TOTAL}` : '—'}
            <span className="hidden sm:inline"> · coherence steady</span>
          </p>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-sm text-text-secondary hover:text-accent-thread transition-colors"
            aria-label="Reader settings"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>

        {showSettings && (
          <div className="border-t border-text-primary/10">
            <div className="mx-auto flex max-w-reading items-center gap-6 px-6 py-4">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-text-secondary">Type size</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFontSize(Math.max(14, fontSize - 2))}
                  className="min-h-[44px] min-w-[44px] rounded-sm font-sans text-sm text-text-secondary hover:text-accent-thread transition-colors"
                  aria-label="Decrease type size"
                >
                  A−
                </button>
                <span className="w-14 text-center font-mono text-sm text-text-body">
                  {fontSize}px
                </span>
                <button
                  onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                  className="min-h-[44px] min-w-[44px] rounded-sm font-sans text-sm text-text-secondary hover:text-accent-thread transition-colors"
                  aria-label="Increase type size"
                >
                  A+
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* The calm room */}
      <div className="mx-auto max-w-reading px-6 py-14 lg:py-20">
        {!markdown ? (
          <div aria-label="Loading chapter">
            <div className="skeleton mb-6 h-16 w-24" />
            <div className="skeleton mb-4 h-5 w-full" />
            <div className="skeleton mb-4 h-5 w-full" />
            <div className="skeleton mb-4 h-5 w-11/12" />
            <div className="skeleton mb-4 h-5 w-full" />
            <div className="skeleton h-5 w-3/4" />
          </div>
        ) : (
          <>
            <p aria-hidden="true" className="font-display text-7xl font-light leading-none text-accent-thread/80">
              {chapterNumeral(chapterEntry)}
            </p>
            <h1 className="mt-6 font-display text-h1 font-light text-text-primary">{title}</h1>
            <ThreadDivider className="mb-10 mt-8" />
            <div className="prose-dark mx-0 max-w-none" style={{ fontSize: `${fontSize}px` }}>
              <ReactMarkdown
                components={{
                  hr: () => <ThreadDivider className="my-12" />,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l border-accent-thread/60 pl-5 font-serif italic text-text-body">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {markdown}
              </ReactMarkdown>
            </div>
          </>
        )}
      </div>

      {/* Chapter navigation */}
      <div className="border-t border-text-primary/10">
        <div className="mx-auto flex max-w-reading items-center justify-between px-6 py-6">
          {prevChapterSlug ? (
            <Link
              to={`/series/${effectiveBookSlug}/read/${prevChapterSlug}`}
              className="ghost-link text-text-secondary hover:text-text-primary"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous
            </Link>
          ) : (
            <span />
          )}

          {nextChapterSlug ? (
            <Link
              to={`/series/${effectiveBookSlug}/read/${nextChapterSlug}`}
              className="ghost-link text-text-secondary hover:text-text-primary"
            >
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          ) : (
            <Link to="/download" className="ghost-link text-accent-thread">
              Hold the whole book — free
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
