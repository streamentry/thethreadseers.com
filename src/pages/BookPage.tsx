import { useParams, Link } from 'react-router-dom'
import { withBase } from '../lib/siteBase'
import PullQuote from '../components/PullQuote'
import Reveal from '../components/Reveal'
import ThreadDivider from '../components/ThreadDivider'

// Book data from the series bible
const bookData = {
  'book-one': {
    title: 'The Thread Seers: Book One',
    subtitle: 'Book One · complete · free',
    blurb: `Teen artist Lyra Chen sketches “relationship maps” in the margins of her notebooks until the lines begin glowing in the air: luminous threads binding people, places, and secrets.

Recruited to Threadweaver Academy, Lyra learns her gift has a name, and that the institution is failing as students collapse with their connections hollowed out by an ashen black-silver contamination.

With her father dying and her mother’s disappearance tied to the Academy’s hidden extraction research, Lyra must choose what kind of power she will become: control, or communion.`,
    freeToRead: true,
    updated: '2026-02-12',
    downloads: [
      { name: 'EPUB3', note: 'Recommended', href: withBase('/books/the_thread_seers_epub3.epub') },
      { name: 'PDF', note: 'Print & desktop', href: withBase('/books/the_thread_seers.pdf') },
      { name: 'Markdown', note: 'Plain text', href: withBase('/books/the_thread_seers.md') },
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
      <div className="mx-auto max-w-reading px-6 py-24 text-center lg:px-8">
        <p className="eyebrow">the weave · interrupted</p>
        <h1 className="mt-4 font-display text-h1 font-light text-text-primary">Book Not Found</h1>
        <p className="mx-auto mt-6 max-w-prose font-serif text-body text-text-body">
          This thread comes loose here — no such book on the shelf.
        </p>
        <Link to="/series" className="ghost-link mt-8">
          Return to the series
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-canvas px-6 py-16 lg:px-8 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-12">
        {/* Cover rail */}
        <div className="lg:col-span-4">
          <Reveal>
            <figure className="lg:sticky lg:top-8">
              <div className="overflow-hidden rounded-sm border border-text-primary/15">
                <img
                  src={withBase('/img/the_thread_seer_book1.jpg')}
                  alt="The Thread Seers: Book One — cover"
                  className="aspect-[2/3] w-full object-cover"
                />
              </div>
              <figcaption className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-text-secondary">
                Updated {book.updated} · full text free
              </figcaption>
              <Link
                to={`/series/${bookSlug}/read/prologue`}
                className="hold-cta mt-6 w-full px-6 py-4 text-base"
              >
                Start reading online
              </Link>
            </figure>
          </Reveal>
        </div>

        {/* Details */}
        <div className="lg:col-span-7 lg:col-start-6">
          <Reveal>
            <p className="eyebrow">{book.subtitle}</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-5 font-display text-h1 font-light text-text-primary">{book.title}</h1>
          </Reveal>
          <Reveal delay={140}>
            <div className="prose-dark mx-0 mt-8 max-w-prose">
              {book.blurb.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <ThreadDivider className="mb-10 mt-12" />
            <p className="eyebrow">Ledger · take a copy</p>
            <ol className="mt-4 border-t border-text-primary/10">
              {book.downloads.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    download
                    className="group flex items-baseline justify-between gap-4 border-b border-text-primary/10 py-4 transition-colors duration-300 hover:bg-text-primary/[0.03]"
                  >
                    <span className="font-mono text-sm tracking-[0.12em] text-text-primary">
                      {item.name}
                    </span>
                    <span className="flex-1 font-serif text-body text-text-secondary">{item.note}</span>
                    <span className="font-sans text-sm text-text-secondary transition-colors group-hover:text-accent-thread">
                      Take →
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={80}>
            <p className="eyebrow mt-12">Also held by</p>
            <div className="mt-3 flex flex-col items-start gap-1">
              {book.platformLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ghost-link"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Excerpt */}
      <div className="mt-20 lg:mt-28">
        <Reveal>
          <ThreadDivider />
        </Reveal>
        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow">Excerpt · Chapter 1, “The Bridge”</p>
              <p className="mt-4 font-serif text-body leading-relaxed text-text-body">
                The first time Lyra steadies a thread on purpose — and learns the
                difference between held and taken.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <PullQuote>
              Relief hit first. Then wrongness: thin and metallic, a coin in her palm she
              hadn&rsquo;t paid for. The line had steadied, but it hadn&rsquo;t chosen to.
            </PullQuote>
          </div>
        </div>
      </div>

      <div className="mt-16 flex items-center justify-between border-t border-text-primary/10 pt-6 lg:mt-24">
        <Link to="/series" className="ghost-link text-text-secondary hover:text-text-primary">
          ← Back to the series
        </Link>
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-text-secondary">
          book two · not yet spun
        </span>
      </div>
    </div>
  )
}
