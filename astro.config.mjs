// @ts-check
import { defineConfig } from 'astro/config'

// The site is served from two possible roots:
//   - project pages: https://streamentry.github.io/thethreadseers.com/
//   - custom domain: https://thethreadseers.com/   (via public/CNAME)
//
// Astro is built with a neutral base; scripts/postbuild.mjs rewrites every
// emitted asset URL to a depth-relative path afterwards. That keeps a single
// artifact working at either mount point — the same class of bug that took the
// site down twice (PR #1, then the base:'/' regression in PR #3).
export default defineConfig({
  site:
    process.env.SITE_URL || 'https://streamentry.github.io/thethreadseers.com',
  output: 'static',
  // Directory URLs with trailing slashes: GitHub Pages then serves
  // /series/book-one/read/chapter-12a/ from its index.html, and depth-relative
  // asset paths resolve predictably.
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  // Tailwind v3 runs through the existing postcss.config.js; Astro picks it up
  // automatically. No Vite plugin needed.
})
