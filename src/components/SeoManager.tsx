import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { applySeo } from '../lib/seo'

/** Keeps title/meta/canonical in sync on client-side navigation. */
export default function SeoManager() {
  const { pathname } = useLocation()

  useEffect(() => {
    applySeo(pathname)
  }, [pathname])

  return null
}
