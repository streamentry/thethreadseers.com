import type { Locale } from './chapters'
import { DEFAULT_LOCALE, LOCALES, TOTAL_PARTS } from './chapters'
import { localeMeta } from './i18n'
import { bookOne, books } from './content'

/**
 * Build-time SEO helpers. Astro renders every route statically, so all of this
 * is plain data — there is no client-side metadata layer to keep in sync (that
 * was the source of the "every subpath shows the homepage title" bug in the
 * pre-Astro build).
 */

export const SITE = {
  name: 'The Thread Seers',
  nameVi: 'Những Người Thấy Sợi Chỉ',
  author: 'Le Viet Hong',
  authorVi: 'Lê Việt Hồng',
  /**
   * Canonical host. thethreadseers.com has no DNS record, so the GitHub
   * project-pages URL is the only live origin and therefore the one canonical
   * URLs, hreflang, sitemap and JSON-LD point at. Switch this single value if
   * the custom domain is pointed at GitHub Pages later.
   */
  url: 'https://streamentry.github.io/thethreadseers.com',
  publisher: 'Lumina Press',
  cover: '/img/the_thread_seer_book1.jpg',
  coverAbs: 'https://streamentry.github.io/thethreadseers.com/img/the_thread_seer_book1.jpg',
  description: {
    en: 'The Thread Seers is a metaphysical young adult fantasy saga exploring luminous threads of connection, ancient global traditions, and the sacred choice between control and communion. Book One is free to read online and download unabridged in English and Vietnamese.',
    vi: 'Những Người Thấy Sợi Chỉ là bộ tiểu thuyết giả tưởng huyền ảo về những sợi tơ kết nối vạn vật, các dòng chảy truyền thống cổ xưa và sự giằng xé giữa kiểm soát và tương giao. Sách Một trọn vẹn đọc trực tuyến và tải về miễn phí bằng cả tiếng Anh lẫn tiếng Việt.',
  },
} as const

export interface Alternate {
  hreflang: string
  href: string
}

/** Absolute URL for a locale-prefixed route path. */
export function absUrl(localePath: string): string {
  // Astro is configured with trailingSlash: 'always', so directory URLs are
  // what actually serve these pages. Canonicals and hreflang must match the
  // served form or they point at a URL that 301s.
  const withSlash = localePath.endsWith('/') ? localePath : localePath + '/'
  return SITE.url + withSlash
}

/** Localized path: pass a path without a locale prefix, e.g. '/download'. */
export function localePath(locale: Locale, path = '/'): string {
  const clean = path === '/' ? '' : path.startsWith('/') ? path : '/' + path
  return `/${locale}${clean}`
}

/** hreflang set for a route that exists in both locales, plus x-default. */
export function alternates(path = '/'): Alternate[] {
  const list: Alternate[] = LOCALES.map((l) => ({
    hreflang: localeMeta[l].htmlLang,
    href: absUrl(localePath(l, path)),
  }))
  list.push({ hreflang: 'x-default', href: absUrl(localePath(DEFAULT_LOCALE, path)) })
  return list
}

export interface MetaInput {
  locale: Locale
  title: string
  description: string
  /** Path without locale prefix, used for canonical + hreflang. */
  path: string
  image?: string
  type?: 'website' | 'article' | 'book' | 'profile'
  publishedTime?: string
  keywords?: string
}

const COMMON_KEYWORDS = {
  en: 'YA fantasy, young adult fantasy book, free ebook, Lyra Chen, Threadweaver Academy, thread magic, relationship maps, Vietnamese American author, Lumina Press, bản dịch tiếng Việt',
  vi: 'tiểu thuyết giả tưởng, sách thiếu niên, tải sách miễn phí, Lyra Chen, Học viện Threadweaver, sợi chỉ, sách tiếng Việt, Le Viet Hong, Lumina Press',
} as const

export const keywordsFor = (locale: Locale, extra?: string) =>
  extra ? `${COMMON_KEYWORDS[locale]}, ${extra}` : COMMON_KEYWORDS[locale]

/** A short label for chapter/UI status strings used in metadata. */
export const totalPartsLabel = (locale: Locale) =>
  locale === 'vi' ? `${TOTAL_PARTS} phần` : `${TOTAL_PARTS} parts`

/* ------------------------------------------------------------------ JSON-LD */

export interface GraphNode {
  [k: string]: unknown
  '@type': string
  '@id'?: string
}

const ids = {
  website: `${SITE.url}/#website`,
  publisher: `${SITE.url}/#publisher`,
  author: `${SITE.url}/#author`,
  series: `${SITE.url}/#series`,
  bookOne: `${SITE.url}/#book-one`,
}

function personNode(locale: Locale): GraphNode {
  return {
    '@type': 'Person',
    '@id': ids.author,
    name: locale === 'vi' ? SITE.authorVi : SITE.author,
    alternateName: locale === 'vi' ? SITE.author : SITE.authorVi,
    url: absUrl(localePath(locale, '/author')),
    jobTitle: locale === 'vi' ? 'Tác giả' : 'Author',
    inLanguage: locale === 'vi' ? 'vi' : 'en',
    knowsAbout: [
      'Young adult fiction',
      'Dependent origination',
      'Buddhist philosophy',
      'Vietnamese American literature',
      'Vietnamese translation',
    ],
  }
}

export interface JsonLdInput {
  locale: Locale
  path: string
  title: string
  description: string
  image?: string
  type?: 'website' | 'article' | 'book' | 'profile'
  publishedTime?: string
  /** Chapter pages. */
  chapter?: { title: string; position: number; kind: string }
  crumb?: { name: string; path: string }[]
  faq?: [string, string][]
  /** Include the full BookSeries + all seven books (series pages only). */
  withSeries?: boolean
  /** Include the Book node with work examples (book + download pages). */
  withBook?: boolean
}

export function jsonLd(input: JsonLdInput): string {
  const locale = input.locale
  const url = absUrl(localePath(locale, input.path))
  const image = SITE.url + (input.image ?? SITE.cover)
  const pageId = `${url}#webpage`
  const nodes: GraphNode[] = [
    {
      '@type': 'WebSite',
      '@id': ids.website,
      url: SITE.url,
      name: locale === 'vi' ? SITE.nameVi : SITE.name,
      inLanguage: locale === 'vi' ? 'vi-VN' : 'en-US',
      description: SITE.description[locale],
      publisher: { '@id': ids.author },
    },
    {
      '@type': 'Organization',
      '@id': ids.publisher,
      name: SITE.publisher,
      url: SITE.url,
      logo: { '@type': 'ImageObject', url: SITE.coverAbs },
    },
    personNode(locale),
  ]

  if (input.withSeries) {
    nodes.push({
      '@type': 'BookSeries',
      '@id': ids.series,
      name: locale === 'vi' ? SITE.nameVi : SITE.name,
      url: absUrl(localePath(locale, '/series')),
      inLanguage: locale === 'vi' ? 'vi-VN' : 'en-US',
      author: { '@id': ids.author },
      numberOfItems: books.length,
      genre: ['Young Adult', 'Fantasy'],
      description: SITE.description[locale],
      book: books.map((b) => {
        const name = locale === 'vi' ? b.vi.title : b.en.title
        const base: GraphNode = {
          '@type': 'Book',
          name,
          position: b.position,
          url: absUrl(localePath(locale, `/series/${b.slug}`)),
          inLanguage: locale === 'vi' ? 'vi-VN' : 'en-US',
          abstract: locale === 'vi' ? b.vi.blurb : b.en.blurb,
        }
        if (b.available) {
          Object.assign(base, {
            '@id': ids.bookOne,
            bookFormat: 'https://schema.org/EBook',
            image: SITE.coverAbs,
            isAccessibleForFree: true,
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
              url: absUrl(localePath(locale, '/download')),
            },
          })
        }
        return base
      }),
    })
  }

  if (input.withBook) {
    nodes.push({
      '@type': 'Book',
      '@id': ids.bookOne,
      name: locale === 'vi' ? bookOne.vi.title : bookOne.en.title,
      alternateName: locale === 'vi' ? bookOne.en.title : bookOne.vi.title,
      url: absUrl(localePath(locale, '/series/book-one')),
      author: { '@id': ids.author },
      publisher: { '@id': ids.publisher },
      inLanguage: locale === 'vi' ? 'vi-VN' : 'en-US',
      bookFormat: 'https://schema.org/EBook',
      image: SITE.coverAbs,
      isAccessibleForFree: true,
      genre: ['Young Adult', 'Fantasy'],
      description: locale === 'vi' ? bookOne.vi.blurb : bookOne.en.blurb,
      workExample: [
        {
          '@type': 'Book',
          bookFormat: 'https://schema.org/EBook',
          url: absUrl(localePath(locale, '/books/the_thread_seers_epub3.epub')),
          potentialAction: { '@type': 'ReadAction', target: url },
        },
        {
          '@type': 'Book',
          bookFormat: 'https://schema.org/PDF',
          url: absUrl(localePath(locale, '/books/the_thread_seers.pdf')),
        },
        {
          '@type': 'Book',
          bookFormat: 'https://schema.org/Text',
          url: absUrl(localePath(locale, '/books/the_thread_seers.md')),
        },
      ],
    } as GraphNode)
  }

  nodes.push({
    '@type': input.type === 'article' ? 'Article' : 'WebPage',
    '@id': pageId,
    url,
    name: input.title,
    headline: input.title,
    description: input.description,
    inLanguage: locale === 'vi' ? 'vi-VN' : 'en-US',
    isPartOf: { '@id': ids.website },
    about: { '@id': ids.bookOne },
    author: { '@id': ids.author },
    image,
    ...(input.publishedTime ? { datePublished: input.publishedTime } : {}),
    ...(input.crumb ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
  })

  if (input.chapter) {
    nodes.push({
      '@type': 'Chapter',
      '@id': `${url}#chapter`,
      name: input.chapter.title,
      headline: input.chapter.title,
      isPartOf: { '@id': ids.bookOne },
      position: input.chapter.position || 1,
      url,
      inLanguage: locale === 'vi' ? 'vi-VN' : 'en-US',
      isAccessibleForFree: true,
      potentialAction: { '@type': 'ReadAction', target: url },
    })
  }

  if (input.faq) {
    nodes.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      inLanguage: locale === 'vi' ? 'vi-VN' : 'en-US',
      mainEntity: input.faq.map(([q, a]) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    })
  }

  if (input.crumb) {
    nodes.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: input.crumb.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item: absUrl(localePath(locale, c.path)),
      })),
    })
  }

  const clean = nodes.filter((n) => !Object.values(n).some((v) => v === undefined))
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': clean })
}

/* ------------------------------------------------------------------ FAQ */

export const faq: Record<Locale, [string, string][]> = {
  en: [
    [
      'Is The Thread Seers Book One completely free to read?',
      'Yes. Book One is freely available in its entirety — all 46 parts, unabridged in parallel English and Vietnamese editions — and free to download in EPUB, PDF, and clean Markdown formats. There are no paywalls, subscriptions, or partial samples.',
    ],
    [
      'Can I read The Thread Seers in Vietnamese?',
      'Yes. An authorized, full-length Vietnamese edition is available to read online at /vi/series/book-one/read/prologue and to download as EPUB and PDF. Both editions are complete and cover all 46 parts of the novel.',
    ],
    [
      'Who is the author of The Thread Seers?',
      'Le Viet Hong (Lê Việt Hồng), a Vietnamese American author published by Lumina Press. The saga is envisioned as a seven-book chronicle following protagonist Lyra Chen from age 16 to 18.',
    ],
    [
      'What genre and philosophy define The Thread Seers?',
      'It is an evocative work of young adult fantasy imbued with literary depth. Its magic system is rooted in the Buddhist philosophy of dependent origination (Pratītyasamutpāda) — the interdependence of all living things — drawing upon living thread traditions from Chinese, Korean, Indian, Egyptian, Yoruba, and Indigenous cultures.',
    ],
    [
      'Who is Lyra Chen?',
      'A sixteen-year-old Chinese-American artist and the protagonist of Book One. She spent years secretly sketching “relationship maps” in her notebook margins until those graphite lines ignited into living, luminous threads binding souls, places, and hidden truths. She is recruited to Threadweaver Academy, a secluded sanctuary nestled within the Berkshire Mountains.',
    ],
    [
      'How many parts comprise Book One?',
      `Book One contains ${TOTAL_PARTS} parts in chronological reading sequence: acknowledgments, an evocative historical prologue set in 1943 Saigon, 43 numbered narrative chapters (including dual-perspective installments such as 12A and 12B), and an epilogue.`,
    ],
    [
      'What are the titles in The Thread Seers seven-book chronicle?',
      'The planned seven-volume series comprises: Book One: The Thread Seers (complete and free); Book Two: The Weaver’s Shadow (in progress); Book Three: The Convergence Protocol; Book Four: The Silver Path; Book Five: The Communion Wars; Book Six: The Dimensional Bridge; and Book Seven: The Awakening Network.',
    ],
    [
      'Is The Thread Seers suitable for young adult readers?',
      'Yes. Written specifically for young adults and thoughtful readers of all generations, the story explores grief, moral complexity, and the ethics of human relationship with honesty and nuance, without explicit or gratuitous content.',
    ],
    [
      'Where can I download or purchase The Thread Seers?',
      'The full unabridged novel is hosted and freely downloadable directly from this site. It is also cataloged for convenience on Amazon Kindle and Google Play Books.',
    ],
  ],
  vi: [
    [
      'Sách Một của Những Người Thấy Sợi Chỉ có hoàn toàn miễn phí không?',
      'Có. Toàn bộ Sách Một được trao gửi hoàn toàn miễn phí — trọn vẹn 46 phần bằng cả tiếng Anh và tiếng Việt — có thể đọc trực tuyến hoặc tải về dưới dạng EPUB, PDF và Markdown. Tuyệt đối không có bản đọc thử cắt xén và không có tường phí thương mại.',
    ],
    [
      'Tôi có thể đọc Những Người Thấy Sợi Chỉ bằng tiếng Việt ở đâu?',
      'Bạn có thể thưởng thức trọn vẹn bản tiếng Việt trực tuyến tại /vi/series/book-one/read/prologue hoặc tải về các tệp EPUB và PDF hoàn chỉnh. Bản dịch tiếng Việt và bản gốc tiếng Anh là hai văn bản song song, trọn vẹn cả 46 phần.',
    ],
    [
      'Ai là tác giả của Những Người Thấy Sợi Chỉ?',
      'Lê Việt Hồng (Le Viet Hong), một tác giả người Mỹ gốc Việt, xuất bản bởi Lumina Press. Bộ trường thiên được sáng tác với quy mô bảy tập, theo sát hành trình trưởng thành của Lyra Chen từ năm 16 đến 18 tuổi.',
    ],
    [
      'Những Người Thấy Sợi Chỉ thuộc thể loại gì và mang tư tưởng nào?',
      'Tiểu thuyết giả tưởng thiếu niên mang chiều sâu triết học và văn chương. Hệ thống phép thuật bắt nguồn từ giáo lý Duyên Khởi của Phật giáo — nhận thức về tính tương tức của vạn vật — kết hợp cùng các truyền thống dệt sợi cổ xưa của văn hóa Trung Hoa, Hàn Quốc, Ấn Độ, Ai Cập, Yoruba và thổ dân bản địa.',
    ],
    [
      'Nhân vật chính Lyra Chen là ai?',
      'Một nữ sinh mười sáu tuổi gốc Hoa với niềm đam mê hội họa. Cô âm thầm phác họa “bản đồ quan hệ” bên lề tập vở cho đến khi những đường nét bừng sáng thành những sợi tơ rực rỡ nối kết từng con người, địa danh và bí mật. Cô được chiêu mộ vào Học viện Threadweaver — một thánh địa ẩn giấu bên trong trường nội trú Westbrook tại rặng núi Berkshire.',
    ],
    [
      'Sách Một gồm bao nhiêu phần?',
      `Sách Một bao gồm ${TOTAL_PARTS} phần theo đúng thứ tự thưởng thức: lời tri ân, hồi mở đầu lịch sử đặt tại Sài Gòn năm 1943, 43 chương truyện đánh số (một số chương chia phần như 12A và 12B), và hồi kết.`,
    ],
    [
      'Bộ truyện Những Người Thấy Sợi Chỉ gồm những tập nào?',
      'Bộ trường thiên gồm bảy tập: Sách Một: Những Người Thấy Sợi Chỉ (đã hoàn thành và miễn phí); Sách Hai: Bóng Người Dệt; Sách Ba: Giao Thức Hội Tụ; Sách Bốn: Con Đường Bạc; Sách Năm: Chiến Tranh Tương Giao; Sách Sáu: Cầu Nối Liên Thứ Nguyên; và Sách Bảy: Mạng Lưới Thức Tỉnh.',
    ],
    [
      'Cuốn sách có phù hợp với lứa tuổi thanh thiếu niên không?',
      'Tác phẩm được sáng tác hướng tới độc giả thiếu niên cũng như những ai yêu thích văn học giàu tính nhân văn. Cuốn sách tiếp cận những nan đề đạo đức và mặt trái của các thiết chế quyền lực một cách chân thực, sâu sắc, hoàn toàn không chứa nội dung khiêu dâm hay dung tục.',
    ],
    [
      'Tôi có thể tải hoặc tìm đọc sách ở đâu?',
      'Toàn văn tác phẩm được phát hành miễn phí trực tiếp trên trang web chính thức này. Cuốn sách cũng có mặt trên Amazon Kindle và Google Play Books.',
    ],
  ],
}
