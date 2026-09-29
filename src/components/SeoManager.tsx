import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { applySeo } from '../lib/seo'
import { getBasename } from '../lib/siteBase'

/**
 * Keeps title/meta/canonical in sync on client-side navigation.
 *
 * useLocation() reports the full path including the router basename, so on
 * GitHub project Pages a chapter reads as
 * "/thethreadseers.com/series/book-one/read/chapter-12a" and would match no
 * route table entry. Strip the basename before resolving metadata, otherwise
 * every subpath silently falls back to the homepage title and canonical.
 */
export default function SeoManager() {
  const { pathname } = useLocation()
  const basename = getBasename()
  const routePath = useMemo(
    () => (basename !== '/' && pathname.startsWith(basename) ? pathname.slice(basename.length) || '/' : pathname),
    [pathname, basename],
  )

  useEffect(() => {
    applySeo(routePath)
  }, [routePath])

  return null
}
