import { Link } from 'react-router-dom'
import { withBase } from '../lib/siteBase'

const downloads = [
  {
    label: 'PDF',
    description: 'Best for print, sharing, and desktop reading.',
    href: withBase('/books/the_thread_seers.pdf'),
  },
  {
    label: 'EPUB3 (Recommended)',
    description: 'Best for most e-readers and reading apps.',
    href: withBase('/books/the_thread_seers_epub3.epub'),
  },
  {
    label: 'EPUB2',
    description: 'Compatibility format for older devices.',
    href: withBase('/books/the_thread_seers_epub2.epub'),
  },
  {
    label: 'EPUB (Legacy)',
    description: 'Alternate build for compatibility.',
    href: withBase('/books/the_thread_seers.epub'),
  },
  {
    label: 'Markdown',
    description: 'Plain-text edition (best for search/notes).',
    href: withBase('/books/the_thread_seers.md'),
  },
]

const platformLinks = [
  { name: 'Kindle', url: 'https://www.amazon.com/dp/B0FBHK972Q/' },
  {
    name: 'Google Play Books',
    url: 'https://play.google.com/store/books/details/LE_VIET_HONG_The_Thread_Seers?id=hpVfEQAAQBAJ&hl=en',
  },
]

export default function DownloadsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
      <div className="text-center mb-16">
        <p className="text-caption text-text-secondary font-sans tracking-wide mb-4">
          The Thread Seers: Book One
        </p>
        <h1 className="font-sans text-h1 font-light tracking-wider text-text-primary mb-6 luminous-text">
          Free Downloads
        </h1>
        <p className="text-lg sm:text-xl font-serif text-text-body leading-relaxed max-w-3xl mx-auto">
          Download the complete book in your preferred format. No gate, no sample. This is the full text.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {downloads.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="block border border-text-secondary/20 rounded-sm px-6 py-5 hover:border-accent-silver/30 hover:bg-accent-silver/5 transition-all duration-300"
          >
            <div className="font-sans text-base font-medium text-text-primary luminous-text">
              Download {item.label}
            </div>
            <div className="mt-2 text-sm text-text-secondary font-sans tracking-wide">
              {item.description}
            </div>
          </a>
        ))}
      </div>

      <div className="mt-16 pt-10 border-t border-text-secondary/20">
        <h2 className="font-sans text-h3 font-medium text-text-primary mb-4">
          Read Online
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/series/book-one/read/prologue"
            className="minimal-button text-center text-accent-silver border border-accent-silver/30 rounded-sm px-6 py-3 hover:border-accent-silver hover:bg-accent-silver/5 transition-all duration-300"
          >
            Start at the Prologue
          </Link>
          <Link
            to="/series/book-one"
            className="minimal-button text-center text-text-body hover:text-accent-silver transition-all duration-300 border border-text-secondary/20 rounded-sm px-6 py-3 hover:border-accent-silver/30"
          >
            Book details
          </Link>
        </div>
      </div>

      <div className="mt-16 pt-10 border-t border-text-secondary/20">
        <h2 className="font-sans text-h3 font-medium text-text-primary mb-4">
          Kindle &amp; Play Books
        </h2>
        <div className="prose-dark mb-6">
          <p>
            Prefer reading inside a storefront app? The book is also listed on Kindle and Google Play Books.
            If you ever see a price, you can still download the free editions above.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          {platformLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="minimal-button text-center text-text-body hover:text-accent-silver transition-all duration-300 border border-text-secondary/20 rounded-sm px-6 py-3 hover:border-accent-silver/30"
            >
              Open on {link.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
