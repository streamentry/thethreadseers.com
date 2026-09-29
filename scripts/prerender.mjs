/**
 * Static prerender for SEO + GEO.
 *
 * GitHub Pages serves a single index.html, so every route is client-rendered.
 * Crawlers and answer engines (including ones that do not execute JavaScript)
 * need real HTML per route. This script, run after `vite build`, writes:
 *
 *   dist/<route>/index.html   per-route <title>, meta, canonical, JSON-LD,
 *                             and a no-JS content summary inside #root
 *   dist/sitemap.xml          all routes
 *   dist/robots.txt
 *   dist/llms.txt             plain-text site summary for answer engines
 *   dist/404.html             untouched (SPA redirect shim)
 *
 * The route table is duplicated from src/lib/seo.ts because this file runs as
 * plain Node without a TypeScript loader. Keep both in sync.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DIST = join(ROOT, 'dist')
const CONTENT = join(ROOT, 'content', '03_BOOK_ONE')

const SITE = {
  name: 'The Thread Seers',
  author: 'Le Viet Hong',
  url: 'https://thethreadseers.com',
  locale: 'en_US',
  cover: 'https://thethreadseers.com/img/the_thread_seer_book1.jpg',
  coverPath: '/img/the_thread_seer_book1.jpg',
  pdf: '/books/the_thread_seers.pdf',
  epub: '/books/the_thread_seers_epub3.epub',
  markdown: '/books/the_thread_seers.md',
  updated: '2026-02-12',
  published: '2024-01-15',
}

const KEYWORDS =
  'YA fantasy, young adult fantasy book, free ebook, Lumina Press, Lyra Chen, ' +
  'Threadweaver Academy, thread magic, relationship maps, Vietnamese American author'

const BOOKS = [
  {
    slug: 'book-one',
    name: 'The Thread Seers: Book One',
    position: 1,
    isbn: null,
    description:
      'Teen artist Lyra Chen sketches relationship maps in her notebook margins until the lines begin glowing in the air. Recruited to Threadweaver Academy, she learns her gift has a name — and that the institution is failing as students collapse with their connections hollowed out by an ashen black-silver contamination. With her father dying and her mother missing, Lyra must choose what kind of power she will become: control, or communion.',
    available: true,
  },
  {
    slug: 'book-two',
    name: "The Weaver's Shadow",
    position: 2,
    description:
      'Lyra can no longer see the threads — but she can feel them. Old fractures inside the Academy crack open, and the cultural traditions she relies on come under threat from people who see them only as tools.',
    available: false,
  },
  {
    slug: 'book-three',
    name: 'The Convergence Protocol',
    position: 3,
    description:
      'Thread phenomena are going public — strange lights over cities, mass emotional events with no explanation. Lyra and the quartet are caught between factions who want to reveal everything and those willing to do terrible things to keep the secret.',
    available: false,
  },
  {
    slug: 'book-four',
    name: 'The Silver Path',
    position: 4,
    description: 'Not yet spun.',
    available: false,
  },
  {
    slug: 'book-five',
    name: 'The Communion Wars',
    position: 5,
    description: 'Not yet spun.',
    available: false,
  },
  {
    slug: 'book-six',
    name: 'The Dimensional Bridge',
    position: 6,
    description: 'Not yet spun.',
    available: false,
  },
  {
    slug: 'book-seven',
    name: 'The Awakening Network',
    position: 7,
    description: 'Not yet spun.',
    available: false,
  },
]

const FALLBACK = {
  title: 'The Thread Seers',
  description:
    'The Thread Seers is a YA fantasy series about luminous threads, hidden schools, and the choice between control and communion. Book One is free to read and download.',
  path: '/',
  type: 'website',
  keywords: KEYWORDS,
}

const STATIC_ROUTES = {
  '/': {
    title: 'The Thread Seers — a YA fantasy series about connection, free to read',
    description:
      'Lyra Chen sketches relationship maps in her notebook margins until the lines begin glowing in the air. Book One of The Thread Seers is free to read online and download in EPUB, PDF, and Markdown.',
    type: 'website',
    keywords: KEYWORDS,
    body: {
      eyebrow: 'Book one · complete · free, no gate',
      heading: 'She drew the lines between people — then they began to glow.',
      paragraphs: [
        'Teen artist Lyra Chen sketches “relationship maps” in the margins of her notebooks until the lines begin glowing in the air: luminous threads binding people, places, and secrets.',
        'Recruited to Threadweaver Academy, Lyra learns her gift has a name — and that the institution keeping it is failing. Students are collapsing with their connections hollowed out, and nobody in charge will say why.',
        'An ashen black-silver contamination is spreading through the Weave: threads dimming, fraying, going hollow. What used to feel like silk now feels like scar.',
        'Her father is dying. Her mother’s disappearance leads back to the Academy’s hidden extraction research. So Lyra must choose what kind of power she will become: control, or communion.',
      ],
      links: [
        { href: '/download', label: 'Download Book One — free' },
        { href: '/series/book-one/read/prologue', label: 'Read the prologue' },
        { href: '/series', label: 'The series in order' },
      ],
    },
  },
  '/download': {
    title: 'Download Book One free — EPUB, PDF, Markdown',
    description:
      'The complete The Thread Seers Book One, free in EPUB3, PDF, and Markdown. No gate, no sample, full text. Also on Kindle and Google Play Books.',
    type: 'website',
    keywords: KEYWORDS + ', epub, pdf download, free ebook',
    body: {
      eyebrow: 'Book one · the full text',
      heading: 'No gate. No sample. Hold it all.',
      paragraphs: [
        'The complete book in your format of choice. Threads are meant to be shared the way they’re held — openly, and without charge.',
        'Available as EPUB3 (recommended for most e-readers), PDF, and Markdown. Every file contains the complete text, not a sample. All 46 chapters are also readable free online.',
        'The book also lives on Kindle and Google Play Books. If you ever see a price there, the free editions here are the same full text.',
      ],
      links: [
        { href: '/series/book-one/read/prologue', label: 'Start at the prologue' },
        { href: '/world', label: 'The world of the Weave' },
      ],
    },
  },
  '/series': {
    title: 'The series — seven books, one weave',
    description:
      'The Thread Seers in order, from Book One through The Awakening Network. Blurbs, canon thread colors, and the series themes: dependent origination, communion versus control, and living cultural traditions.',
    type: 'website',
    keywords: KEYWORDS + ', book series, series order',
    body: {
      eyebrow: 'The series · seven books',
      heading: 'Follow the threads. Say their names.',
      paragraphs: [
        'Lyra Chen is sixteen when the glowing lines she has always sketched turn out to be real — threads of connection binding every living thing. Across seven books she grows from a girl hiding a strange gift into someone who must decide what that gift is for.',
        'The magic is rooted in dependent origination, a Buddhist idea: nothing exists on its own. The story starts in 1943 Saigon and lands in a Massachusetts boarding school where Korean, Indian, Chinese, Egyptian, African, and Indigenous thread traditions are taught side by side — each with its own methods, history, and arguments about what threads are for.',
        'Harlow extracts thread energy with machines. Lin Chen practiced communion. How do you use power without hollowing out the thing you’re drawing it from?',
      ],
      links: [{ href: '/series/book-one', label: 'Book One details' }],
    },
  },
  '/series/book-one': {
    title: 'The Thread Seers: Book One — read or download free',
    description:
      'The Thread Seers Book One: sixteen-year-old artist Lyra Chen can see the luminous threads binding people, places, and secrets. Read it online or download the full text free.',
    type: 'book',
    keywords: KEYWORDS,
    body: {
      eyebrow: 'Book one · complete · free',
      heading: 'The Thread Seers: Book One',
      paragraphs: [
        'Teen artist Lyra Chen sketches “relationship maps” in the margins of her notebooks until the lines begin glowing in the air: luminous threads binding people, places, and secrets.',
        'Recruited to Threadweaver Academy, Lyra learns her gift has a name, and that the institution is failing as students collapse with their connections hollowed out by an ashen black-silver contamination.',
        'With her father dying and her mother’s disappearance tied to the Academy’s hidden extraction research, Lyra must choose what kind of power she will become: control, or communion.',
      ],
      links: [
        { href: '/series/book-one/read/prologue', label: 'Start reading online' },
        { href: '/download', label: 'Download free' },
      ],
    },
  },
  '/world': {
    title: 'The world of the Weave — thread glossary and traditions',
    description:
      'How thread-sight works: the Weave, the Animus Argenti, thread colors, six kinds of Thread Seer, cultural thread traditions taught at Threadweaver Academy, and a full glossary.',
    type: 'website',
    keywords: KEYWORDS + ', thread glossary, Animus Argenti, world guide',
    body: {
      eyebrow: 'The world · the weave',
      heading: 'An extra layer, laid over ours.',
      paragraphs: [
        'Luminous threads run between people, places, and ideas — visible only to a rare few. The Thread Dimension is a living network with its own rules and, increasingly, its own will.',
        'Thread colors: family bonds are silver and rope-like; friendship is gold and braided; memory is blue and translucent; nature is green and vine-like; conflict is red and barbed; deception is gray and twisted. The Animus Argenti, the conscious core of the dimension, appears as pure silver.',
        'Six kinds of Thread Seer: Visualizers, Resonators, Empaths, Navigators, Manipulators, and Sensory Weavers. Not all perceive the Weave the same way — some see it, some hear it, some feel it through their skin.',
        'Threadweaver Academy was founded in 1798 in the Berkshire Mountains, hidden inside Westbrook Academy. It teaches Korean geometric patterns, Indian philosophical methods, Chinese communion practices, Egyptian thread hieroglyphics, African pattern-speaking, Yoruba thread sensing, and Indigenous dreamline tracing.',
      ],
      links: [{ href: '/series/book-one/read/prologue', label: 'Read the prologue' }],
    },
  },
  '/author': {
    title: 'Le Viet Hong — author of The Thread Seers',
    description:
      'Le Viet Hong writes YA fantasy grounded in Buddhist philosophy, dependent origination, and thread traditions from Chinese, Korean, Indian, Egyptian, African, and Indigenous cultures.',
    type: 'profile',
    keywords: 'Le Viet Hong, YA author, Vietnamese American author, fantasy author, Lumina Press',
    body: {
      eyebrow: 'The author',
      heading: 'Between cultures, following the threads.',
      paragraphs: [
        'Le Viet Hong grew up between cultures, which is probably why he ended up writing a book about the things that connect people across distance and difference. The Thread Seers started as a question he couldn’t stop thinking about: what if the bonds between people were something you could actually see?',
        'The series took years of research — into Buddhist philosophy, into how different cultures around the world have understood connection and interdependence, into the specific histories of the traditions represented in the books.',
        'The magic system is built on dependent origination: nothing exists independently, everything arises from causes and conditions. He writes for young readers because he thinks they’re ready for harder questions than most books ask them.',
      ],
      links: [{ href: '/series', label: 'The series' }],
    },
  },
  '/news': {
    title: 'Echoes and announcements — The Thread Seers',
    description:
      'News and updates from the author of The Thread Seers: releases, series announcements, and behind-the-book notes.',
    type: 'website',
    keywords: KEYWORDS + ', author updates',
    body: {
      eyebrow: 'Echoes · from the desk',
      heading: 'Word travels along threads, too.',
      paragraphs: [
        'Updates as the book and the series develop: releases, announcements, and notes on what is coming next.',
      ],
      links: [
        { href: '/news/book-one-release', label: 'Book One Is Out — And It\'s Free' },
        { href: '/news/series-announcement', label: 'Introducing The Thread Seers' },
      ],
    },
  },
  '/news/book-one-release': {
    title: "Book One Is Out — And It's Free",
    description:
      'The first book in The Thread Seers series is done and available as a free download. Full text, no paywalls. Read online or take EPUB, PDF, and Markdown.',
    type: 'article',
    publishedTime: '2024-01-15',
    keywords: KEYWORDS,
    body: {
      eyebrow: 'January 15, 2024',
      heading: "Book One Is Out — And It's Free",
      paragraphs: [
        'The first book in The Thread Seers series is done and available now. You can download the full book for free from this site, or pick it up on Kindle and Google Play Books.',
        'Lyra Chen is sixteen. She sketches “relationship maps” in her notebook margins — lines between people, thick or thin depending on how connected they seem. Then the lines start glowing. She gets recruited to Threadweaver Academy, a hidden school inside a Massachusetts boarding school.',
        'But students are collapsing. Their connections are being drained by something. Lyra’s father is dying. Her mother disappeared years ago, and the trail leads straight back to the Academy and its research into thread extraction.',
        'The complete book is available as a free download in PDF, EPUB, and Markdown. No samples, no paywalls — just the full text.',
        'Book Two, The Weaver’s Shadow, is in progress. The series is planned as seven books following Lyra from age 16 to 18.',
      ],
      links: [{ href: '/download', label: 'Download Book One free' }],
    },
  },
  '/news/series-announcement': {
    title: 'Introducing The Thread Seers',
    description:
      'A fantasy series about a girl who can see the threads connecting people, the hidden school that trains her, and the question of what those connections are actually for.',
    type: 'article',
    publishedTime: '2024-01-01',
    keywords: KEYWORDS,
    body: {
      eyebrow: 'January 1, 2024',
      heading: 'Introducing The Thread Seers',
      paragraphs: [
        'I kept thinking about the idea that connections between people might be something physical — something with weight and color and texture. Not a metaphor, but an actual dimension layered on top of ours. And if some people could see it, what would they do with that? What institutions would form around it? Who would try to exploit it?',
        'The magic system is based on dependent origination, a concept from Buddhist philosophy — the idea that nothing exists independently. That felt like the right foundation for a story about what connections are and what happens when you treat them as a resource to extract.',
        'The series is planned as seven books, following Lyra from 16 to 18, and draws on thread traditions from Korean, Indian, Chinese, Egyptian, African, and Indigenous cultures. Each tradition has its own approach to the Weave, and those differences matter to the plot.',
      ],
      links: [{ href: '/series', label: 'The series in order' }],
    },
  },
}

/**
 * Front- and back-matter overrides. Chapter titles/descriptions come from the
 * manuscript itself via readChapters(), so only these need hand-written copy.
 */
const SPECIAL_ROUTES = {
  '/series/book-one/read/preface': {
    kind: 'Acknowledgments',
    title: 'Acknowledgments — The Thread Seers, Book One',
    description:
      'The acknowledgments to The Thread Seers, Book One, by Le Viet Hong. Read free online, or download the complete book in EPUB, PDF, and Markdown.',
  },
  '/series/book-one/read/prologue': {
    kind: 'Prologue',
    title: 'Prologue: Saigon, 1943 — The Thread Seers, Book One',
    description:
      'The Thread Seers opens in Saigon in 1943, where lanterns are still lit and the currents drag, thick with hunger and sorrow. Read the prologue of Book One free online.',
  },
  '/series/book-one/read/epilogue': {
    kind: 'Epilogue',
    title: 'Epilogue: The Thing That Is Not Finished — The Thread Seers',
    description:
      'The epilogue to The Thread Seers, Book One: the Weave-Quake counter, the board with a number on it, and what the quartet builds after the Convergence. Read it free online.',
  },
}

/* ------------------------------------------------------------------ utils */

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const abs = (p) => (p.startsWith('http') ? p : SITE.url + (p.startsWith('/') ? p : '/' + p))

/** Minimal, dependency-free markdown -> plain text paragraphs. */
function mdToParagraphs(md) {
  return md
    .split(/\n\s*\n/)
    .map((block) => block.replace(/[#>*_`]/g, '').replace(/\s+/g, ' ').trim())
    .filter((block) => block.length > 0)
}

/**
 * Reads every chapter in reading order, straight from the generated
 * src/lib/chapters.ts manifest so the build can never drift from the reader.
 * Each entry: slug, route, kind, label, title, position, paragraphs.
 */
function readChapters() {
  const manifest = readFileSync(join(ROOT, 'src', 'lib', 'chapters.ts'), 'utf8')
  const rowRe =
    /\{\s*slug:\s*'([^']+)',\s*fileName:\s*'([^']+)',\s*path:\s*'([^']+)',\s*label:\s*'([^']+)',\s*title:\s*"((?:[^"\\]|\\.)*)",\s*kind:\s*'(\w+)'/g

  const chapters = []
  let match
  let position = 0
  while ((match = rowRe.exec(manifest)) !== null) {
    const [, slug, , path, label, rawTitle, kind] = match
    const file = join(CONTENT, path)
    if (!existsSync(file)) {
      console.warn(`prerender: missing manuscript file for ${slug} (${path})`)
      continue
    }
    const md = readFileSync(file, 'utf8')
    const title = JSON.parse(`"${rawTitle}"`)
    if (kind === 'chapter') position += 1
    chapters.push({
      slug,
      route: `${READ_BASE}/${slug}`,
      kind,
      label,
      title,
      position: kind === 'chapter' ? position : 0,
      paragraphs: mdToParagraphs(md),
    })
  }
  if (!chapters.length) {
    throw new Error('prerender: no chapters parsed from src/lib/chapters.ts')
  }
  return chapters
}

/* ------------------------------------------------------------------ JSON-LD */

function graph(route) {
  const url = abs(route.path)
  const pageId = `${url}#webpage`
  const siteId = `${SITE.url}/#website`
  const personId = `${SITE.url}/#author`
  const bookId = `${SITE.url}/#book-one`
  const nodes = [
    {
      '@type': 'WebSite',
      '@id': siteId,
      url: SITE.url,
      name: SITE.name,
      inLanguage: 'en-US',
      description: FALLBACK.description,
      publisher: { '@id': personId },
    },
    {
      '@type': 'Organization',
      '@id': `${SITE.url}/#publisher`,
      name: 'Lumina Press',
      url: SITE.url,
      logo: { '@type': 'ImageObject', url: SITE.cover },
    },
    {
      '@type': 'Person',
      '@id': personId,
      name: SITE.author,
      url: `${SITE.url}/author`,
      jobTitle: 'Author',
      description:
        'Author of The Thread Seers, a YA fantasy series grounded in Buddhist philosophy and thread traditions from Chinese, Korean, Indian, Egyptian, African, and Indigenous cultures.',
      knowsAbout: [
        'Young adult fiction',
        'Dependent origination',
        'Vietnamese American literature',
        'Buddhist philosophy',
      ],
    },
  ]

  if (route.path === '/' || route.path === '/series') {
    nodes.push({
      '@type': 'BookSeries',
      '@id': `${SITE.url}/#series`,
      name: SITE.name,
      url: `${SITE.url}/series`,
      author: { '@id': personId },
      description:
        'A young adult fantasy series in seven books following Lyra Chen from age 16 to 18, about luminous threads, hidden schools, and the choice between control and communion.',
      numberOfItems: BOOKS.length,
      genre: ['Young Adult', 'Fantasy'],
      book: BOOKS.map((b) => ({
        '@type': 'Book',
        name: b.name,
        position: b.position,
        url: abs(`/series/${b.slug}`),
        ...(b.available ? { '@id': bookId } : {}),
        ...(b.available ? { inLanguage: 'en-US' } : {}),
        ...(b.available ? { datePublished: SITE.published } : {}),
        ...(b.available ? { bookFormat: 'https://schema.org/EBook' } : {}),
        ...(b.available
          ? {
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
                url: SITE.pdf,
              },
            }
          : {}),
        abstract: b.description,
      })),
    })
  }

  if (route.book) {
    nodes.push({
      '@type': 'Book',
      '@id': route.book.isBookOne ? bookId : undefined,
      name: route.book.name,
      author: { '@id': personId },
      publisher: { '@id': `${SITE.url}/#publisher` },
      inLanguage: 'en-US',
      bookFormat: 'https://schema.org/EBook',
      image: SITE.cover,
      url,
      datePublished: SITE.published,
      dateModified: SITE.updated,
      description: route.book.description,
      abstract: route.book.description,
      isAccessibleForFree: true,
      genre: ['Young Adult', 'Fantasy'],
      keywords: KEYWORDS,
      workExample: [
        { '@type': 'Book', bookFormat: 'https://schema.org/EBook', url: abs(SITE.epub), potentialAction: { '@type': 'ReadAction', target: url } },
        { '@type': 'Book', bookFormat: 'https://schema.org/PDF', url: abs(SITE.pdf) },
        { '@type': 'Book', bookFormat: 'https://schema.org/Text', url: abs(SITE.markdown) },
      ],
    })
  }

  nodes.push({
    '@type': route.type === 'article' ? 'Article' : 'WebPage',
    '@id': pageId,
    url,
    name: route.title,
    headline: route.title,
    description: route.description,
    inLanguage: 'en-US',
    isPartOf: { '@id': siteId },
    about: { '@id': bookId },
    author: { '@id': personId },
    ...(route.publishedTime ? { datePublished: route.publishedTime } : {}),
    ...(route.crumb ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
  })

  if (route.type === 'article' && route.chapter) {
    nodes.push({
      '@type': 'Chapter',
      '@id': `${url}#chapter`,
      name: route.chapter.title,
      headline: route.chapter.title,
      isPartOf: { '@id': bookId },
      position: route.chapter.position || 1,
      url,
      inLanguage: 'en-US',
      isAccessibleForFree: true,
      // Tells search engines and answer engines the whole chapter is readable
      // at this URL, not gated behind a form or purchase.
      potentialAction: { '@type': 'ReadAction', target: url },
    })
  }

  if (route.type === 'article' && route.chapter) {
    nodes.push({
      '@type': 'Book',
      '@id': bookId,
      name: 'The Thread Seers: Book One',
      author: { '@id': personId },
      publisher: { '@id': `${SITE.url}/#publisher` },
      inLanguage: 'en-US',
      image: SITE.cover,
      url: abs('/series/book-one'),
      datePublished: SITE.published,
      isAccessibleForFree: true,
      description: BOOKS[0].description,
      hasPart: { '@id': `${url}#chapter` },
    })
  }

  if (route.faq) {
    nodes.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: route.faq.map(([q, a]) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    })
  }

  if (route.crumb) {
    nodes.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: route.crumb.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: abs(item.href),
      })),
    })
  }

  return { '@context': 'https://schema.org', '@graph': nodes.filter((n) => !Object.values(n).some((v) => v === undefined)) }
}

/* ------------------------------------------------------------------ routes */

const READ_BASE = '/series/book-one/read'

function chapterRoutes() {
  const routes = []
  const chapters = readChapters()

  chapters.forEach((chapter, i) => {
    const spec = SPECIAL_ROUTES[chapter.route]
    const isPrologue = chapter.slug === 'prologue'
    const paragraphs = chapter.paragraphs

    // Front/back matter gets hand-written copy; chapters derive their title
    // from the manuscript heading and their description from the opening prose.
    const title = spec
      ? spec.title
      : `${chapter.title} — The Thread Seers, Book One (read free)`

    const description = spec
      ? spec.description
      : deriveDescription(chapter, paragraphs)

    routes.push({
      path: chapter.route,
      title,
      description,
      type: 'article',
      publishedTime: SITE.published,
      keywords: KEYWORDS + ', read online, free chapter, full text online',
      chapter: {
        kind: chapter.kind,
        position: chapter.position,
        title: chapter.title,
        slug: chapter.slug,
      },
      // Chapters ship a longer opening so a crawler (or a reader without JS)
      // gets real prose, not just a heading.
      paragraphs: paragraphs.slice(0, isPrologue ? 10 : 6),
      crumb: isPrologue ? undefined : [{ name: 'Book One', href: '/series/book-one' }],
      chapterNav: {
        prev: chapters[i - 1]
          ? { href: chapters[i - 1].route, label: chapters[i - 1].title }
          : null,
        next: chapters[i + 1]
          ? { href: chapters[i + 1].route, label: chapters[i + 1].title }
          : null,
      },
      isBookOne: true,
    })
  })
  return routes
}

/** Build a meta description from the chapter's own opening sentences. */
function deriveDescription(chapter, paragraphs) {
  const opening = paragraphs.find((p) => p.length > 80) ?? paragraphs[0] ?? ''
  const trimmed = opening.length > 175 ? opening.slice(0, 175).replace(/\s+\S*$/, '') + '…' : opening
  const lead = chapter.title
    .replace(/^(Chapter \d+[AB]?)\s*[:—-]\s*/i, '')
    .replace(/^Interlude:\s*/i, '')
  return `${lead} — Chapter ${chapter.label} of The Thread Seers, Book One by Le Viet Hong. ${trimmed} Read free online, no sign-up.`
}

const FAQ = [
  [
    'Is The Thread Seers Book One free?',
    'Yes. The complete Book One is free to read online at thethreadseers.com/series/book-one/read/prologue and free to download in EPUB3, PDF, and Markdown at thethreadseers.com/download. Every one of the 46 chapters is readable free online. There is no sample-only version and no paywall.',
  ],
  [
    'Who wrote The Thread Seers?',
    'Le Viet Hong, a Vietnamese American author published by Lumina Press. The series is planned as seven books following Lyra Chen from age 16 to 18.',
  ],
  [
    'What genre is The Thread Seers?',
    'Young adult fantasy with literary and philosophical depth. The magic system is grounded in dependent origination, a Buddhist concept that nothing exists independently, and the series draws on thread traditions from Chinese, Korean, Indian, Egyptian, African, and Indigenous cultures.',
  ],
  [
    'Who is Lyra Chen?',
    'A sixteen-year-old Chinese-American artist and the protagonist of Book One. She sketches “relationship maps” in her notebook margins until the lines begin glowing in the air, revealing luminous threads that bind people, places, and secrets. She is recruited to Threadweaver Academy, a hidden school inside Westbrook Academy in the Berkshire Mountains.',
  ],
  [
    'How many books are in The Thread Seers series?',
    'Seven. Book One, The Thread Seers, is complete and free. Book Two, The Weaver’s Shadow, is in progress. Books three through seven are The Convergence Protocol, The Silver Path, The Communion Wars, The Dimensional Bridge, and The Awakening Network.',
  ],
  [
    'Is The Thread Seers appropriate for young readers?',
    'It is written for young adult readers. The book does not simplify its ethics and does not pull its punches about what happens when people treat relationships as resources, but it contains no explicit content.',
  ],
  [
    'Where can I buy The Thread Seers?',
    'The full text is free at thethreadseers.com/download. The book is also listed on Amazon Kindle and Google Play Books.',
  ],
]

function buildRoutes() {
  const routes = []

  for (const [path, spec] of Object.entries(STATIC_ROUTES)) {
    routes.push({
      path,
      title: spec.title,
      description: spec.description,
      type: spec.type ?? 'website',
      publishedTime: spec.publishedTime,
      keywords: spec.keywords,
      body: spec.body,
      faq: path === '/' || path === '/download' ? FAQ : undefined,
      book: path === '/series/book-one' ? { ...BOOKS[0], isBookOne: true } : undefined,
      crumb: path !== '/' ? [{ name: 'Home', href: '/' }] : undefined,
    })
  }

  routes.push(...chapterRoutes())

  return routes
}

/* ------------------------------------------------------------------ render */

/**
 * Vite emits root-absolute asset URLs (`/assets/x.js`), which only resolve when
 * the site is mounted at the domain root. On GitHub project Pages it is mounted
 * at a subpath, so those 404. Rewriting each route's asset URLs to a
 * depth-relative path makes the build independent of the mount point.
 */
function relativizeAssetUrls(html, routePath) {
  const depth = routePath === '/' ? 0 : routePath.replace(/^\//, '').split('/').length
  const prefix = depth === 0 ? './' : '../'.repeat(depth)
  return html.replace(/(["'])\/((?:assets|img|books)\/)/g, `$1${prefix}$2`)
}

function headFor(route) {
  const url = abs(route.path)
  const image = SITE.cover
  const title = route.title
  const jsonld = JSON.stringify(graph(route))

  return `<title>${esc(title)}</title>
    <link rel="canonical" href="${esc(url)}" />
    <meta name="description" content="${esc(route.description)}" />
    <meta name="keywords" content="${esc(route.keywords ?? KEYWORDS)}" />
    <meta name="author" content="${esc(SITE.author)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta property="og:type" content="${esc(route.type ?? 'website')}" />
    <meta property="og:site_name" content="${esc(SITE.name)}" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(route.description)}" />
    <meta property="og:url" content="${esc(url)}" />
    <meta property="og:image" content="${esc(image)}" />
    <meta property="og:image:alt" content="The Thread Seers: Book One cover" />
    <meta property="og:locale" content="${SITE.locale}" />
    <meta property="og:author" content="${esc(SITE.author)}" />
    <meta property="article:publisher" content="Lumina Press" />
    ${route.publishedTime ? `<meta property="article:published_time" content="${route.publishedTime}" />` : ''}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(route.description)}" />
    <meta name="twitter:image" content="${esc(image)}" />
    <meta name="twitter:creator" content="@leviethong" />
    <meta name="geo.region" content="US" />
    <script type="application/ld+json">${jsonld}</script>`
}

function prerenderedBody(route) {
  const parts = []

  if (route.crumb) {
    const crumbs = [{ name: 'Home', href: '/' }, ...route.crumb, { name: route.title }]
    parts.push(
      `<nav aria-label="Breadcrumb"><ol>${crumbs
        .map((c, i) =>
          i === crumbs.length - 1
            ? `<li aria-current="page">${esc(c.name)}</li>`
            : `<li><a href="${esc(c.href)}">${esc(c.name)}</a></li>`,
        )
        .join('')}</ol></nav>`,
    )
  }

  if (route.body) {
    if (route.body.eyebrow) parts.push(`<p class="eyebrow">${esc(route.body.eyebrow)}</p>`)
    parts.push(`<h1>${esc(route.body.heading)}</h1>`)
    for (const p of route.body.paragraphs) parts.push(`<p>${esc(p)}</p>`)
    if (route.body.links?.length) {
      parts.push(
        `<ul>${route.body.links
          .map((l) => `<li><a href="${esc(l.href)}">${esc(l.label)}</a></li>`)
          .join('')}</ul>`,
      )
    }
  } else if (route.chapter) {
    parts.push(`<h1>${esc(route.chapter.title)}</h1>`)
    for (const p of route.paragraphs) parts.push(`<p>${esc(p)}</p>`)
    // Full-text readers follow these to the next and previous chapter; without
    // JS a crawler cannot discover the rest of the book.
    if (route.chapterNav) {
      const links = []
      if (route.chapterNav.prev) {
        links.push(
          `<a href="${esc(route.chapterNav.prev.href)}" rel="prev">${esc(route.chapterNav.prev.label)}</a>`,
        )
      }
      links.push('<a href="/series/book-one">Book One — all chapters</a>')
      if (route.chapterNav.next) {
        links.push(
          `<a href="${esc(route.chapterNav.next.href)}" rel="next">${esc(route.chapterNav.next.label)}</a>`,
        )
      }
      parts.push(`<nav aria-label="Chapter navigation"><ul>${links.map((l) => `<li>${l}</li>`).join('')}</ul></nav>`)
    }
    parts.push(
      `<p><a href="${esc('/download')}">Download the complete book free — EPUB, PDF, and Markdown</a></p>`,
    )
  }

  if (route.faq) {
    parts.push('<h2>Questions people ask</h2>')
    parts.push(
      route.faq
        .map(
          ([q, a]) =>
            `<h3>${esc(q)}</h3><p>${esc(a)}</p>` +
            (q.startsWith('Is The Thread Seers Book One free')
              ? ''
              : ''),
        )
        .join(''),
    )
  }

  return parts.join('\n')
}

function writeRoute(template, route) {
  const body = prerenderedBody(route)
  let html = template

  // Replace the static head block with route-specific metadata.
  html = html.replace(
    /<title>[\s\S]*?<\/title>/i,
    headFor(route),
  )

  // Put crawlable content inside #root ahead of the app's mount point.
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root"><main class="prerender">${body}</main></div>`,
  )

  html = relativizeAssetUrls(html, route.path)

  const outDir = route.path === '/' ? DIST : join(DIST, route.path.replace(/^\//, ''))
  mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, 'index.html'), html)
  return abs(route.path)
}

function writeSitemap(urls) {
  const today = new Date().toISOString().slice(0, 10)
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${esc(u.url)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.article ? 'monthly' : 'weekly'}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`
  writeFileSync(join(DIST, 'sitemap.xml'), xml)
}

function writeRobots() {
  writeFileSync(
    join(DIST, 'robots.txt'),
    `# ${SITE.name}
User-agent: *
Allow: /

# Answer engines and crawlers that read the plain-text site summary
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: PerplexityBot
Allow: /

Sitemap: ${SITE.url}/sitemap.xml
`,
  )
}

function writeLlmsTxt(routes) {
  const lines = [
    `# ${SITE.name}`,
    '',
    `> ${FALLBACK.description}`,
    '',
    `Author: ${SITE.author} (Lumina Press). Genre: Young Adult fantasy. Book One is free to read and download.`,
    '',
    '## Free full text',
    `- Read online: ${SITE.url}/series/book-one/read/prologue`,
    `- Download EPUB3: ${abs(SITE.epub)}`,
    `- Download PDF: ${abs(SITE.pdf)}`,
    `- Download Markdown: ${abs(SITE.markdown)}`,
    '',
    '## Pages',
  ]
  for (const r of routes) {
    if (r.chapter) continue
    lines.push(`- [${r.title}](${abs(r.path)}): ${r.description}`)
  }
  lines.push('', '## Chapters (full text, free)', '')
  for (const r of routes) {
    if (!r.chapter) continue
    lines.push(`- [${r.title}](${abs(r.path)})`)
  }
  lines.push(
    '',
    '## Frequently asked',
    '',
    ...FAQ.flatMap(([q, a]) => [`### ${q}`, '', a, '']),
    '## Optional',
    '',
    `- [Sitemap](${SITE.url}/sitemap.xml)`,
  )
  writeFileSync(join(DIST, 'llms.txt'), lines.join('\n'))
}

/* ------------------------------------------------------------------ main */

function main() {
  if (!existsSync(DIST)) {
    console.error('dist/ not found — run `pnpm build` first.')
    process.exit(1)
  }

  const template = readFileSync(join(DIST, 'index.html'), 'utf8')
  const routes = buildRoutes()

  const urls = routes.map((route) => ({
    url: writeRoute(template, route),
    article: route.type === 'article',
    priority: route.path === '/' ? '1.0' : route.chapter ? '0.6' : '0.8',
  }))

  writeSitemap(urls)
  writeRobots()
  writeLlmsTxt(routes)

  console.log(
    `prerender: ${routes.length} routes (${readChapters().length} chapters), sitemap.xml, robots.txt, llms.txt`,
  )
}

main()
