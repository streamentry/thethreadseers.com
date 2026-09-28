import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navigation = [
  { name: 'Download', href: '/download' },
  { name: 'Series', href: '/series' },
  { name: 'World', href: '/world' },
  { name: 'Author', href: '/author' },
  { name: 'News', href: '/news' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const linkClass = (href: string) =>
    `relative font-sans text-sm font-medium tracking-[0.14em] uppercase transition-colors duration-300 ${
      location.pathname === href ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
    }`

  return (
    <header className="relative border-b border-text-primary/10">
      <nav className="mx-auto flex max-w-canvas items-center justify-between px-6 py-5 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="font-sans text-base font-light uppercase tracking-[0.32em] text-text-primary">
              The Thread Seers
            </span>
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-sm p-2.5 text-text-secondary hover:text-text-primary transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden items-center lg:flex lg:gap-x-10">
          {navigation.map((item) => (
            <Link key={item.name} to={item.href} className={linkClass(item.href)}>
              {item.name}
              <span
                aria-hidden="true"
                className={`absolute -bottom-1.5 left-0 h-px w-full origin-left bg-accent-thread transition-transform duration-300 ${
                  location.pathname === item.href ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </Link>
          ))}
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background-primary px-6 py-6 sm:max-w-sm sm:border-l sm:border-text-primary/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                <span className="font-sans text-sm font-light uppercase tracking-[0.32em] text-text-primary">
                  The Thread Seers
                </span>
              </Link>
              <button
                type="button"
                className="-m-2.5 min-h-[44px] min-w-[44px] rounded-sm p-2.5 text-text-secondary hover:text-text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-text-primary/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`-mx-3 block min-h-[44px] rounded-sm px-3 py-3 font-sans text-base font-medium uppercase tracking-[0.14em] transition-colors duration-300 ${
                        location.pathname === item.href
                          ? 'text-accent-thread'
                          : 'text-text-body hover:text-text-primary'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
