/**
 * SEO + GEO metadata for The Thread Seers.
 *
 * Two layers work together:
 *  1. Static prerender (scripts/prerender.mjs) writes real HTML, per-route meta,
 *     canonical URLs, and JSON-LD into dist/ so crawlers and answer engines see
 *     content without executing JavaScript.
 *  2. This module keeps those same values in sync on client-side navigation.
 *
 * Keep the route table here in sync with the fallback table in
 * scripts/prerender.mjs — the prerender script is plain Node (no TS), so it
 * cannot import this file.
 */

import { findChapter, type ChapterEntry } from './chapters'

export const SITE = {
  name: 'The Thread Seers',
  shortName: 'Thread Seers',
  author: 'Le Viet Hong',
  url: 'https://thethreadseers.com',
  locale: 'en_US',
  language: 'en',
  cover: 'https://thethreadseers.com/img/the_thread_seer_book1.jpg',
  publisher: {
    name: 'Le Viet Hong',
    url: 'https://thethreadseers.com',
  },
} as const

export interface SeoMeta {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article' | 'book'
  publishedTime?: string
  keywords?: string
}

const TITLE_SUFFIX = 'The Thread Seers'

export function absoluteUrl(path: string): string {
  if (path.startsWith('http')) return path
  return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`
}

const COMMON_KEYWORDS =
  'YA fantasy, young adult fantasy book, free ebook, Lumina Press, Lyra Chen, ' +
  'Threadweaver Academy, thread magic, relationship maps, Vietnamese American author'

export const ROUTES: Record<string, SeoMeta> = {
  '/': {
    title: 'The Thread Seers — a YA fantasy series about connection, free to read',
    description:
      'Lyra Chen sketches relationship maps in her notebook margins until the lines begin glowing in the air. Book One of The Thread Seers is free to read online and download in EPUB, PDF, and Markdown.',
    path: '/',
    type: 'website',
    keywords: COMMON_KEYWORDS,
  },
  '/download': {
    title: 'Download Book One free — EPUB, PDF, Markdown',
    description:
      'The complete The Thread Seers Book One, free in EPUB3, PDF, and Markdown. No gate, no sample, full text. Also on Kindle and Google Play Books.',
    path: '/download',
    keywords: COMMON_KEYWORDS + ', epub, pdf download, free ebook',
  },
  '/series': {
    title: 'The series — seven books, one weave',
    description:
      'The Thread Seers in order, from Book One through The Awakening Network. Blurbs, canon thread colors, and the series\' themes: dependent origination, communion versus control, and living cultural traditions.',
    path: '/series',
    keywords: COMMON_KEYWORDS + ', book series, series order',
  },
  '/series/book-one': {
    title: 'The Thread Seers: Book One — read or download free',
    description:
      'The Thread Seers Book One: sixteen-year-old artist Lyra Chen can see the luminous threads binding people, places, and secrets. Read it online or download the full text free.',
    path: '/series/book-one',
    type: 'book',
    keywords: COMMON_KEYWORDS,
  },
  '/world': {
    title: 'The world of the Weave — thread glossary and traditions',
    description:
      'How thread-sight works: the Weave, the Animus Argenti, thread colors, six kinds of Thread Seer, cultural thread traditions taught at Threadweaver Academy, and a full glossary.',
    path: '/world',
    keywords: COMMON_KEYWORDS + ', thread glossary, Animus Argenti, world guide',
  },
  '/author': {
    title: 'Le Viet Hong — author of The Thread Seers',
    description:
      'Le Viet Hong writes YA fantasy grounded in Buddhist philosophy, dependent origination, and thread traditions from Chinese, Korean, Indian, Egyptian, African, and Indigenous cultures.',
    path: '/author',
    keywords: 'Le Viet Hong, YA author, Vietnamese American author, fantasy author, Lumina Press',
  },
  '/news': {
    title: 'Echoes and announcements — The Thread Seers',
    description:
      'News and updates from the author of The Thread Seers: releases, series announcements, and behind-the-book notes.',
    path: '/news',
    keywords: COMMON_KEYWORDS + ', author updates',
  },
  '/series/book-one/read/preface': {
    title: 'Acknowledgments — The Thread Seers, Book One',
    description:
      'The acknowledgments to The Thread Seers, Book One, by Le Viet Hong. Read free online, or download the complete book in EPUB, PDF, and Markdown.',
    path: '/series/book-one/read/preface',
    type: 'article',
    keywords: COMMON_KEYWORDS + ', read online',
  },
  '/series/book-one/read/prologue': {
    title: 'Prologue: Saigon, 1943 — The Thread Seers, Book One',
    description:
      'The Thread Seers opens in Saigon in 1943, where lanterns are still lit and the currents drag, thick with hunger and sorrow. Read the prologue of Book One free online.',
    path: '/series/book-one/read/prologue',
    type: 'article',
    keywords: COMMON_KEYWORDS + ', read online, prologue, Saigon 1943',
  },
  '/series/book-one/read/epilogue': {
    title: 'Epilogue: The Thing That Is Not Finished — The Thread Seers',
    description:
      'The epilogue to The Thread Seers, Book One: the Weave-Quake counter, the board with a number on it, and what the quartet builds after the Convergence. Read it free online.',
    path: '/series/book-one/read/epilogue',
    type: 'article',
    keywords: COMMON_KEYWORDS + ', read online, epilogue',
  },
}

const CHAPTER_KEYWORDS =
  COMMON_KEYWORDS + ', read online, free chapter, full text online'

/**
 * Chapter metadata for client-side navigation. The prerendered HTML carries the
 * full title and a description drawn from the chapter's own opening prose, so
 * these are only what a client-side transition can know without re-parsing.
 */
export function chapterSeo(chapter: ChapterEntry): SeoMeta {
  const lead = chapter.title
    .replace(/^(Chapter \d+[AB]?)\s*[:—-]\s*/i, '')
    .replace(/^Interlude:\s*/i, '')
  return {
    title: `${chapter.title} — The Thread Seers, Book One (read free)`,
    description: `${lead} — Chapter ${chapter.label} of The Thread Seers, Book One by Le Viet Hong. Read the full text online, free, no sign-up — or download the whole book in EPUB, PDF, and Markdown.`,
    path: `/series/book-one/read/${chapter.slug}`,
    type: 'article',
    keywords: CHAPTER_KEYWORDS,
  }
}

export function newsPostSeo(slug: string, title: string): SeoMeta {
  return {
    title: `${title} — The Thread Seers`,
    description: `${title}. News and updates from Le Viet Hong on the Thread Seers series.`,
    path: `/news/${slug}`,
    type: 'article',
    keywords: COMMON_KEYWORDS,
  }
}

function resolveMeta(rawPathname: string): SeoMeta {
  // GitHub Pages serves /series/ as a directory, so the browser reports a
  // trailing slash. Normalise before matching or every directory route misses
  // the table and falls back to the homepage.
  const pathname =
    rawPathname.length > 1 ? rawPathname.replace(/\/+$/, '') || '/' : rawPathname

  if (ROUTES[pathname]) return ROUTES[pathname]
  // Chapter slugs carry A/B parts (chapter-12a, chapter-26b, chapter-34a),
  // so match the manifest rather than parsing a number out of the URL.
  const chapter = findChapter(pathname.replace(/^.*\/read\//, ''))
  if (chapter) return chapterSeo(chapter)
  const post = pathname.match(/^\/news\/([a-z0-9-]+)$/)
  if (post) {
    const titles: Record<string, string> = {
      'book-one-release': 'Book One Is Out — And It\'s Free',
      'series-announcement': 'Introducing The Thread Seers',
    }
    return newsPostSeo(post[1], titles[post[1]] ?? 'Update')
  }
  return {
    title: `${TITLE_SUFFIX}`,
    description:
      'The Thread Seers is a YA fantasy series about luminous threads, hidden schools, and the choice between control and communion. Book One is free to read.',
    path: '/',
  }
}

function upsertMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.rel = 'canonical'
    document.head.appendChild(el)
  }
  el.href = href
}

/** Applies route metadata on client-side navigation. */
export function applySeo(pathname: string) {
  if (typeof document === 'undefined') return
  const meta = resolveMeta(pathname)
  const url = absoluteUrl(meta.path)
  const image = absoluteUrl(meta.image ?? '/img/the_thread_seer_book1.jpg')
  const fullTitle = meta.title.includes(TITLE_SUFFIX)
    ? meta.title
    : `${meta.title} — ${TITLE_SUFFIX}`

  document.title = fullTitle
  document.documentElement.lang = SITE.language
  upsertMeta('meta[name="description"]', 'name', 'description', meta.description)
  if (meta.keywords) upsertMeta('meta[name="keywords"]', 'name', 'keywords', meta.keywords)
  upsertMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle)
  upsertMeta('meta[property="og:description"]', 'property', 'og:description', meta.description)
  upsertMeta('meta[property="og:url"]', 'property', 'og:url', url)
  upsertMeta('meta[property="og:image"]', 'property', 'og:image', image)
  upsertMeta('meta[property="og:type"]', 'property', 'og:type', meta.type ?? 'website')
  upsertMeta('meta[property="og:site_name"]', 'property', 'og:site_name', SITE.name)
  upsertMeta('meta[property="og:locale"]', 'property', 'og:locale', SITE.locale)
  upsertMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
  upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle)
  upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', meta.description)
  upsertMeta('meta[name="twitter:image"]', 'name', 'twitter:image', image)
  upsertCanonical(url)
}
