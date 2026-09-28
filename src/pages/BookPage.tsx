import { useParams, Link } from 'react-router-dom'
import { withBase } from '../lib/siteBase'

// Book data from the series bible
const bookData = {
  'book-one': {
    title: 'The Thread Seers: Book One',
    subtitle: 'Book One of The Thread Seers',
    blurb: `Teen artist Lyra Chen sketches “relationship maps” in the margins of her notebooks until the lines begin glowing in the air: luminous threads binding people, places, and secrets.

Recruited to Threadweaver Academy, Lyra learns her gift has a name, and that the institution is failing as students collapse with their connections hollowed out by an ashen black-silver contamination.

With her father dying and her mother’s disappearance tied to the Academy’s hidden extraction research, Lyra must choose what kind of power she will become: control, or communion.`,
    freeToRead: true,
    updated: '2026-02-12',
    downloads: [
      { name: 'PDF', href: withBase('/books/the_thread_seers.pdf') },
      { name: 'EPUB3 (Recommended)', href: withBase('/books/the_thread_seers_epub3.epub') },
      { name: 'EPUB2', href: withBase('/books/the_thread_seers_epub2.epub') },
      { name: 'EPUB (Legacy)', href: withBase('/books/the_thread_seers.epub') },
      { name: 'Markdown', href: withBase('/books/the_thread_seers.md') },
    ],
    platformLinks: [
      { name: 'Kindle', url: 'https://www.amazon.com/dp/B0FBHK972Q/' },
      {
        name: 'Google Play Books',
        url: 'https://play.google.com/store/books/details/LE_VIET_HONG_The_Thread_Seers?id=hpVfEQAAQBAJ&hl=en',
      },
    ],
  },
}

export default function BookPage() {
  const { bookSlug } = useParams<{ bookSlug: string }>()
  const book = bookData[bookSlug as keyof typeof bookData]

  if (!bookSlug || !book) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8 text-center">
        <h1 className="font-sans text-h1 font-light text-text-primary mb-6">Book Not Found</h1>
        <Link to="/series" className="minimal-button text-accent-silver">
          Return to Series
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
      {/* Book Header */}
      <div className="text-center mb-16">
        <p className="text-caption text-text-secondary font-sans tracking-wide mb-4">
          {book.subtitle}
        </p>
        <h1 className="font-sans text-h1 font-light tracking-wider text-text-primary mb-8 luminous-text">
          {book.title}
        </h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Book Cover */}
        <div className="lg:col-span-1">
          <div className="aspect-[2/3] rounded-sm border border-text-secondary/20 overflow-hidden mb-8">
            <img
              src={withBase('/img/the_thread_seer_book1.jpg')}
              alt="The Thread Seers: Book One"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link
              to={`/series/${bookSlug}/read/prologue`}
              className="block w-full minimal-button text-center text-accent-silver border border-accent-silver/30 rounded-sm px-6 py-4 hover:border-accent-silver hover:bg-accent-silver/5 transition-all duration-300"
            >
              Start Reading Online
            </Link>

            <div className="space-y-2">
              <p className="text-caption text-text-secondary font-sans tracking-wide text-center">
                Free Downloads (Updated {book.updated})
              </p>
              {book.downloads.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  download
                  className="block w-full minimal-button text-center text-text-body hover:text-accent-silver transition-all duration-300 border border-text-secondary/20 rounded-sm px-6 py-3 hover:border-accent-silver/30"
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="space-y-2 pt-2">
              <p className="text-caption text-text-secondary font-sans tracking-wide text-center">
                Also on
              </p>
              {book.platformLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full minimal-button text-center text-text-body hover:text-accent-silver transition-all duration-300 border border-text-secondary/20 rounded-sm px-6 py-3 hover:border-accent-silver/30"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Book Details */}
        <div className="lg:col-span-2">
          {/* Blurb */}
          <div className="prose-dark mb-12">
            {book.blurb.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Excerpt */}
          <div className="mt-12">
            <h3 className="font-sans text-h3 font-medium text-text-primary mb-6">
              Excerpt: The Bridge
            </h3>
            <div className="bg-background-secondary/30 rounded-lg p-8 border border-text-secondary/20">
              <div className="prose-dark">
                <p className="italic text-text-secondary mb-4">
                  From Chapter 1: &ldquo;The Bridge&rdquo;
                </p>
                <blockquote className="text-text-body leading-relaxed space-y-4">
                  <p>
                    She answered it with the small inner pressure she never named out loud and nudged the frayed edge
                    toward center. The line responded instantly, too clean, like a latch that clicked shut under her
                    thumb.
                  </p>
                  <p>
                    &ldquo;I&rsquo;m sorry,&rdquo; Katie said. &ldquo;Me too,&rdquo; Zach said. Then he blinked at his
                    own voice, startled. The apology didn&rsquo;t sound like his.
                  </p>
                  <p>
                    Relief hit first. Then wrongness: thin and metallic, a coin in her palm she hadn&rsquo;t paid for.
                    The line had steadied, but it hadn&rsquo;t chosen to.
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-16 pt-8 border-t border-text-secondary/20 flex justify-between">
        <Link
          to="/series"
          className="minimal-button text-text-secondary hover:text-accent-silver transition-all duration-300"
        >
          ← Back to Series
        </Link>

        <Link
          to="/series/book-two"
          className="minimal-button text-text-secondary hover:text-accent-silver transition-all duration-300"
        >
          Next Book →
        </Link>
      </div>
    </div>
  )
}
