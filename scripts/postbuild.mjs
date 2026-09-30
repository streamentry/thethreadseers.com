/**
 * Post-build: mount-point independence + SEO/GEO artifacts.
 *
 *   node scripts/postbuild.mjs
 *
 * 1. Rewrites every emitted asset URL to a depth-relative path, so one build
 *    works at a domain root and at a GitHub project-pages subpath. This bug
 *    took the site down twice (PR #1, then the base:'/' regression in PR #3),
 *    so it is enforced by a hard failure rather than left to review.
 * 2. Writes sitemap.xml with hreflang alternates for both locales.
 * 3. Writes robots.txt with explicit allowances for answer engines.
 * 4. Writes llms.txt covering both editions and every chapter.
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')
const CONTENT = join(ROOT, 'content')

const SITE_URL = (
  process.env.SITE_URL || 'https://streamentry.github.io/thethreadseers.com'
).replace(/\/$/, '')
const LOCALES = ['en', 'vi']
const DEFAULT_LOCALE = 'en'

if (!existsSync(DIST)) {
  console.error('postbuild: dist/ not found — run astro build first')
  process.exit(1)
}

/* ------------------------------------------------- 1. relativize asset URLs */

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) walk(full, out)
    else out.push(full)
  }
  return out
}

const htmlFiles = walk(DIST).filter((f) => f.endsWith('.html'))
let rewritten = 0
const problems = []

for (const file of htmlFiles) {
  const rel = relative(DIST, file).replace(/\\/g, '/')
  // Depth of the page below the site root, in path segments. "en/index.html"
  // lives at /en/ and needs one "../" to reach the root; a top-level
  // "index.html" needs none.
  const dir = rel.replace(/index\.html$/, '').split('/').filter(Boolean).length
  const prefix = dir <= 0 ? './' : '../'.repeat(dir)

  let html = readFileSync(file, 'utf8')
  const before = html

  // Astro emits /_astro/... for bundled assets; /books and /img come from
  // public/. Internal page links are written root-absolute by localePath(),
  // i.e. /en/... and /vi/..., which also break under a subpath mount.
  //
  // All of them become depth-relative. Only paths beginning with a quote or
  // paren are touched, so absolute URLs (canonical, hreflang, og:image) are
  // left alone.
  html = html.replace(/(["'(])\/(_astro\/|books\/|img\/|en\/|vi\/)/g, `$1${prefix}$2`)
  // The locale root is emitted with no trailing slash ("/en", "/vi") by
  // localePath(locale, '/'), so it needs its own rule. After the rule above a
  // rewritten link reads "../en/...", where the "/" is preceded by a dot and
  // cannot match a second time.
  html = html.replace(/(["'(])\/(en|vi)(["')])/g, `$1${prefix}$2$3`)

  if (html !== before) {
    writeFileSync(file, html)
    rewritten++
  }

  // Nothing local may stay root-absolute, or it 404s under a subpath mount.
  // This is a build failure rather than a review item: it took the site down
  // twice before (PR #1, and the base:'/' regression in PR #3).
  const leftovers = [...html.matchAll(/(?:src|href)="\/(?!https?:)([^"]+)"/g)]
    .map((m) => m[1])
    .filter((u) => /^(_astro|books|img|en|vi)\//.test(u))
  if (leftovers.length) problems.push(`${rel}: ${[...new Set(leftovers)].join(', ')}`)
}

if (problems.length) {
  console.error('postbuild: root-absolute local URLs remain in:')
  for (const p of problems) console.error('  ' + p)
  console.error('These will 404 when the site is served from a subpath.')
  process.exit(1)
}

/* ------------------------------------------- 1b. internal link integrity */

/**
 * Crawl every local link in the built HTML and confirm it resolves to a file
 * that exists. This is the check that would have caught the root-absolute
 * /en/... links: they resolve fine at a domain root and 404 under a subpath
 * mount, which is the exact shape of bug that has taken this site down three
 * times. Auditing with explicit paths instead of following links misses it.
 */
const brokenLinks = []
let linksChecked = 0

for (const file of htmlFiles) {
  const rel = relative(DIST, file).replace(/\\/g, '/')
  const pageUrl = `/${rel.replace(/index\.html$/, '')}`
  const html = readFileSync(file, 'utf8')

  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const target = m[1]
    // Skip absolute, protocol-relative, in-page, data URIs, and any other
    // scheme (mailto:, tel:) — none of those are site-relative paths.
    if (
      /^(https?:)?\/\//.test(target) ||
      target.startsWith('#') ||
      target.startsWith('data:') ||
      /^[a-z][a-z0-9+.-]*:/i.test(target)
    ) {
      continue
    }
    if (target === '' || target === '/') continue
    linksChecked++

    // Resolve the way a browser would, relative to this page's own URL.
    let resolved
    try {
      resolved = new URL(target, 'https://x' + pageUrl).pathname
    } catch {
      brokenLinks.push(`${rel}: unparseable "${target}"`)
      continue
    }

    let candidate = resolved.replace(/^\//, '')
    if (candidate === '' || candidate.endsWith('/')) candidate += 'index.html'
    if (!existsSync(join(DIST, candidate))) {
      const alt = candidate.replace(/index\.html$/, '')
      if (alt && existsSync(join(DIST, alt, 'index.html'))) {
        brokenLinks.push(`${rel}: "${target}" needs a trailing slash`)
      } else {
        brokenLinks.push(`${rel}: "${target}" -> /${candidate} (missing)`)
      }
    }
  }
}

if (brokenLinks.length) {
  const unique = [...new Set(brokenLinks)]
  console.error(`postbuild: ${unique.length} broken internal link(s):`)
  for (const b of unique.slice(0, 40)) console.error('  ' + b)
  if (unique.length > 40) console.error(`  ...and ${unique.length - 40} more`)
  process.exit(1)
}

/* --------------------------------------------------- 2/3/4. SEO artifacts */

const chapterOrder = readChapterOrder()
const total = chapterOrder.length
const numbered = chapterOrder.filter((c) => c.kind === 'chapter').length

function readChapterOrder() {
  const src = readFileSync(join(ROOT, 'src', 'lib', 'chapters.ts'), 'utf8')
  const rows = []
  const re =
    /\{\s*slug:\s*'([^']+)',\s*enPath:\s*'([^']+)',\s*viPath:\s*'([^']+)',\s*label:\s*'([^']+)',\s*enTitle:\s*"((?:[^"\\]|\\.)*)",\s*viTitle:\s*"((?:[^"\\]|\\.)*)",\s*kind:\s*'(\w+)'/g
  let m
  while ((m = re.exec(src)) !== null) {
    rows.push({
      slug: m[1],
      enPath: m[2],
      viPath: m[3],
      label: m[4],
      enTitle: JSON.parse(`"${m[5]}"`),
      viTitle: JSON.parse(`"${m[6]}"`),
      kind: m[7],
    })
  }
  if (!rows.length) throw new Error('postbuild: could not parse chapter manifest')
  return rows
}


// Every route Astro emitted, grouped by locale. The root language gate is
// tracked separately: it lives at "/", not "/en/".
function routeMap() {
  const map = { en: [], vi: [] }
  for (const file of htmlFiles) {
    const rel = relative(DIST, file).replace(/\\/g, '/')
    if (rel.startsWith('404')) continue
    if (rel === 'index.html') continue
    const m = rel.match(/^(en|vi)\/(.*?)index\.html$/)
    if (!m) continue
    const [, locale, rest] = m
    map[locale].push('/' + rest.replace(/\/$/, ''))
  }
  return map
}

const routes = routeMap()

// trailingSlash: 'always' means directory URLs are what actually serve these
// pages, so <loc> must match the served form or it points at a redirect.
const abs = (p) => (p.endsWith('/') ? SITE_URL + p : SITE_URL + p + '/')
const lpath = (locale, p) => `/${locale}${p === '/' ? '/' : p}`

function alternatesXml(path) {
  const lines = LOCALES.filter((l) => routes[l].includes(path)).map(
    (l) =>
      `    <xhtml:link rel="alternate" hreflang="${l}" href="${esc(abs(lpath(l, path)))}"/>`,
  )
  lines.push(
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${esc(
      abs(lpath(DEFAULT_LOCALE, path)),
    )}"/>`,
  )
  return lines.join('\n')
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')
}

const sitemapEntries = []
for (const locale of LOCALES) {
  for (const path of [...new Set(routes[locale])].sort()) {
    const alternates = LOCALES.filter((l) => routes[l].includes(path))
    // Only emit alternates for paths that genuinely exist in both locales.
    const both = alternates.length === LOCALES.length
    const priority = path === '/' ? '1.0' : path.includes('/read/') ? '0.7' : '0.8'
    const changefreq = path.includes('/read/') ? 'monthly' : 'weekly'
    sitemapEntries.push(
      [
        '  <url>',
        `    <loc>${esc(abs(lpath(locale, path)))}</loc>`,
        `    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>`,
        `    <changefreq>${changefreq}</changefreq>`,
        `    <priority>${priority}</priority>`,
        both ? alternatesXml(path).replace(/^ {4}/gm, '    ') : '',
        '  </url>',
      ]
        .filter(Boolean)
        .join('\n'),
    )
  }
}

// The root language gate, listed explicitly: it is not under /en/ or /vi/.
sitemapEntries.push(
  [
    '  <url>',
    `    <loc>${esc(SITE_URL + '/')}</loc>`,
    `    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>`,
    '    <changefreq>weekly</changefreq>',
    '    <priority>1.0</priority>',
    ...LOCALES.map(
      (l) =>
        `    <xhtml:link rel="alternate" hreflang="${l}" href="${esc(abs(lpath(l, '/')))}"/>`,
    ),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${esc(SITE_URL + '/')}"/>`,
    '  </url>',
  ].join('\n'),
)

writeFileSync(
  join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapEntries.join('\n')}
</urlset>
`,
)

writeFileSync(
  join(DIST, 'robots.txt'),
  `# ${SITE_URL}
User-agent: *
Allow: /

# Answer engines that read the plain-text site summary at /llms.txt
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`,
)

// llms.txt: the whole catalogue in plain text, both languages.
// Files are not directory routes; a trailing slash would 404.
const fileUrl = (p) => SITE_URL + p

const lines = [
  `# The Thread Seers / Những Người Thấy Sợi Chỉ`,
  '',
  `> The Thread Seers is a young adult fantasy series about luminous threads, hidden schools, and the choice between control and communion. Book One is free to read online and download, in English and Vietnamese.`,
  '',
  `> Những Người Thấy Sợi Chỉ là bộ tiểu thuyết giả tưởng dành cho thiếu niên về những sợi chỉ rực lạp, những ngôi trường ẩn, và lựa chọn giữa kiểm soát và hiệp thông. Sách Một đọc và tải miễn phí, bằng tiếng Anh và tiếng Việt.`,
  '',
  'Author: Le Viet Hong / Lê Việt Hồng. Publisher: Lumina Press. Genre: Young Adult fantasy.',
  `Book One has ${total} parts in reading order (${numbered} numbered chapters).`,
  '',
  '## Free full text',
  `- English, read online: ${abs('/en/series/book-one/read/prologue')}`,
  `- Vietnamese, đọc trực tuyến: ${abs('/vi/series/book-one/read/prologue')}`,
  `- EPUB (English): ${fileUrl('/books/the_thread_seers_epub3.epub')}`,
  `- EPUB (Vietnamese): ${fileUrl('/books/the_thread_seers_sach_mot.epub')}`,
  `- PDF (English): ${fileUrl('/books/the_thread_seers.pdf')}`,
  `- PDF (Vietnamese): ${fileUrl('/books/the_thread_seers_sach_mot.pdf')}`,
  `- Markdown (English): ${fileUrl('/books/the_thread_seers.md')}`,
  `- Markdown (Vietnamese): ${fileUrl('/books/the_thread_seers_sach_mot.md')}`,
  '',
  '## Pages',
  `- [Home / Trang chủ](${abs('/en/')}) — EN, and [VI](${abs('/vi/')})`,
  `- [Download / Tải về](${abs('/en/download')}) — EN, and [VI](${abs('/vi/download')})`,
  `- [Series / Bộ sách](${abs('/en/series')}) — EN, and [VI](${abs('/vi/series')})`,
  `- [Book One / Sách Một](${abs('/en/series/book-one')}) — EN, and [VI](${abs('/vi/series/book-one')})`,
  `- [World / Thế giới](${abs('/en/world')}) — EN, and [VI](${abs('/vi/world')})`,
  `- [Author / Tác giả](${abs('/en/author')}) — EN, and [VI](${abs('/vi/author')})`,
  `- [News / Tin tức](${abs('/en/news')}) — EN, and [VI](${abs('/vi/news')})`,
  '',
  `## Chapters (${total} parts, both editions)`,
  '',
]
for (const c of chapterOrder) {
  lines.push(
    `- [${c.enTitle}](${abs(`/en/series/book-one/read/${c.slug}`)}) · [${c.viTitle}](${abs(
      `/vi/series/book-one/read/${c.slug}`,
    )})`,
  )
}
lines.push(
  '',
  '## Optional',
  '',
  `- [Sitemap](${abs('/sitemap.xml')})`,
  `- [All parts, English index](${abs('/en/series')})`,
  `- [Tất cả các phần, bản tiếng Việt](${abs('/vi/series')})`,
)
writeFileSync(join(DIST, 'llms.txt'), lines.join('\n') + '\n')

const urlCount = sitemapEntries.length
console.log(
  `postbuild: ${rewritten}/${htmlFiles.length} html relativized · ${linksChecked} internal links OK · ` +
    `sitemap ${urlCount} urls (en ${routes.en.length}, vi ${routes.vi.length}) · ` +
    `robots.txt · llms.txt (${chapterOrder.length} chapters)`,
)
