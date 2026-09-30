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
    en: 'The Thread Seers is a young adult fantasy series about luminous threads, hidden schools, and the choice between control and communion. Book One is free to read online in English and Vietnamese, and free to download.',
    vi: 'Những Người Thấy Sợi Chỉ là một bộ tiểu thuyết giả tưởng dành cho thiếu niên về những sợi chỉ rực lạp, những ngôi trường ẩn, và lựa chọn giữa kiểm soát và hiệp thông. Sách Một đọc miễn phí trực tuyến bằng tiếng Anh và tiếng Việt, tải về miễn phí.',
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
  vi: 'tiểu thuyết giả tưởng, sách thiếu nhiên, tải sách miễn phí, Lyra Chen, Học viện Dệt Sợi, sợi chỉ, sách tiếng Việt, Le Viet Hong, Lumina Press',
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
      'Is The Thread Seers Book One free?',
      'Yes. Book One is free to read online — all 46 parts, in English and Vietnamese — and free to download as EPUB, PDF, and Markdown. There is no sample-only version and no paywall.',
    ],
    [
      'Can I read The Thread Seers in Vietnamese?',
      'Yes. A complete Vietnamese edition is available to read online at /vi/series/book-one/read/prologue and to download as EPUB and PDF. The Vietnamese and English texts are the same book: 46 parts in both.',
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
      'How many chapters are in Book One?',
      `Book One has ${TOTAL_PARTS} parts in reading order: acknowledgments, a prologue set in Saigon in 1943, 43 numbered chapters (some split into parts, like 12A and 12B), and an epilogue.`,
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
      'The full text is free to download from this site. The book is also listed on Amazon Kindle and Google Play Books.',
    ],
  ],
  vi: [
    [
      'Sách Một của Những Người Thấy Sợi Chỉ có miễn phí không?',
      'Có. Sách Một đọc miễn phí trực tuyến — đủ 46 phần, bằng tiếng Anh và tiếng Việt — và tải về miễn phí dưới dạng EPUB, PDF, và Markdown. Không có phiên bản chỉ gửi đoạn dẻ thử, không có tường thanh toán.',
    ],
    [
      'Tôi có thể đọc Những Người Thấy Sợi Chỉ bằng tiếng Việt không?',
      'Có. Bản tiếng Việt đầy đủ đọc miễn phí trực tuyến tại /vi/series/book-one/read/prologue và tải về dưới dạng EPUB và PDF. Văn bản tiếng Việt và tiếng Anh là cùng một cuốn sách: 46 phần ở cả hai ngôn ngữ.',
    ],
    [
      'Ai là tác giả của Những Người Thấy Sợi Chỉ?',
      'Lê Việt Hồng, tác giả người Mỹ gốc Việt, xuất bản tại Lumina Press. Cả bộ sách dự kiến gồm bảy cuốn, theo sát Lyra Chen từ năm 16 đến 18 tuổi.',
    ],
    [
      'Những Người Thấy Sợi Chỉ thuộc thể loại gì?',
      'Giả tưởng dành cho thiếu niên, với chiều sâu văn chương và triết học. Hệ thống phép thuật dựng trên duyên khởi, một khái niệm Phật giáo cho rằng không gì tồn tại độc lập, và cả bộ lấy cảm hứng từ các truyền thống sợi chỉ của văn hoá Trung Hoa, Hàn Quốc, Ấn Độ, Ai Cập, Châu Phi, và bản địa.',
    ],
    [
      'Lyra Chen là ai?',
      'Cô nghệ sĩ mười sáu tuổi gốc Hoa kiều và là nhân vật chính của Sách Một. Cô vẽ “bản đồ quan hệ” ở mép sổ vở cho đến khi những đường nét ấy bắt đầu lên ánh trong không khí, hé lộ những sợi chỉ rực lạp nối người, nơi chốn, và bí mật. Cô được Học viện Dệt Sợi chiêu mộ, một trường học ẩn bên trong Westbrook Academy ở dãy Berkshire.',
    ],
    [
      'Sách Một có bao nhiêu chương?',
      `Sách Một gồm ${TOTAL_PARTS} phần theo thứ tự đọc: lời tri ân, hồi mở đầu đặt ở Sài Gòn năm 1943, 43 chương đánh số (một số được chia thành các phần, như 12A và 12B), và hồi kết.`,
    ],
    [
      'Bộ Những Người Thấy Sợi Chỉ có bao nhiêu cuốn?',
      'Bảy cuốn. Sách Một đã hoàn thành và miễn phí. Sách Hai, Bóng Người Dệt, đang được viết. Sách ba đến bảy là Giao Thức Hội Tụ, Con Đường Bạc, Cuộc Chiến Hiệp Thông, Cầu Nối Chiều Không Gian, và Mạng Lưới Thức Tỉnh.',
    ],
    [
      'Những Người Thấy Sợi Chỉ có phù hợp với người đọc trẻ không?',
      'Cuốn sách được viết cho người đọc thiếu niên. Nó không đơn giản hoá đạo đức, cũng không né tránh điều gì xảy ra khi con người đối xử với các mối quan hệ như một nguồn tài nguyên, nhưng không chứa nội dung khiêu dâm.',
    ],
    [
      'Tôi có thể mua Những Người Thấy Sợi Chỉ ở đâu?',
      'Toàn văn được tải miễn phí từ trang này. Cuốn sách cũng có trên Amazon Kindle và Google Play Books.',
    ],
  ],
}
