// @ts-check
import { defineConfig } from 'astro/config'

// Primary host: https://streamentry.github.io/thethreadseers.com/ (GitHub
// project pages, served under a subpath).
//
// Astro is built with a neutral base; scripts/postbuild.mjs rewrites every
// emitted asset URL to a depth-relative path afterwards, so the subpath never
// has to be baked into asset URLs — the class of bug that took the site down
// twice (PR #1, then the base:'/' regression in PR #3).
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
