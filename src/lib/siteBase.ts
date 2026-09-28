// Base-path helpers for GitHub Pages project-site deployment.
//
// The site is served from two possible roots:
//   - Project URL:  https://streamentry.github.io/thethreadseers.com/
//   - Custom domain: https://thethreadseers.com/  (via public/CNAME)
//
// Vite-bundled JS/CSS use a relative base ('./' in vite.config.ts) so they
// load under either root. These runtime helpers do the same job for the
// React Router basename and for raw public/ asset URLs (/img/..., /books/...),
// which Vite does not rewrite inside source code.

export const REPO_SUBPATH = '/thethreadseers.com'

export function getBasename(): string {
  if (
    typeof window !== 'undefined' &&
    (window.location.pathname === REPO_SUBPATH ||
      window.location.pathname.startsWith(`${REPO_SUBPATH}/`))
  ) {
    return REPO_SUBPATH
  }
  return '/'
}

export function withBase(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`
  const base = getBasename()
  return base === '/' ? p : `${base}${p}`
}
