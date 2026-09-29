import { Link } from 'react-router-dom'
import { Download } from 'lucide-react'
import { withBase } from '../lib/siteBase'
import HoldButton from '../components/HoldButton'
import Reveal from '../components/Reveal'
import ThreadDivider from '../components/ThreadDivider'
import { TOTAL_CHAPTERS } from '../lib/chapters'

const EPUB_URL = withBase('/books/the_thread_seers_epub3.epub')

const downloads = [
  {
    format: 'EPUB3',
    note: 'Recommended · most e-readers and reading apps',
    size: '3.6 MB',
    href: EPUB_URL,
  },
  {
    format: 'PDF',
    note: 'Print, sharing, desktop reading',
    size: '1.9 MB',
    href: withBase('/books/the_thread_seers.pdf'),
  },
  {
    format: 'MD',
    note: 'Plain text · search, notes, and remixing',
    size: '768 KB',
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
    <div className="mx-auto max-w-canvas px-6 py-16 lg:px-8 lg:py-24">
      <div className="max-w-3xl">
        <Reveal>
          <p className="eyebrow">Book one · the full text</p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-5 font-display text-h1 font-light text-text-primary">
            No gate. No sample. Hold it all.
          </h1>
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-6 max-w-prose font-serif text-body leading-relaxed text-text-body">
            The complete book in your format of choice — all {TOTAL_CHAPTERS} parts, no
            sample. Threads are meant to be shared the way they&rsquo;re held: openly,
            and without charge.
          </p>
        </Reveal>
        <Reveal delay={220}>
          <div className="mt-9">
            <HoldButton
              onHold={() => {
                const a = document.createElement('a')
                a.href = EPUB_URL
                a.download = 'the_thread_seers_epub3.epub'
                document.body.appendChild(a)
                a.click()
                a.remove()
              }}
            >
              Hold the thread — EPUB3
            </HoldButton>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <ThreadDivider className="mt-14 lg:mt-20" />
      </Reveal>

      {/* File ledger */}
      <div className="mt-12 lg:mt-16">
        <Reveal>
          <p className="eyebrow">Ledger · every edition accounted for</p>
        </Reveal>
        <ol className="mt-6 border-t border-text-primary/10">
          {downloads.map((item, i) => (
            <Reveal key={item.format} delay={Math.min(i, 6) * 70}>
              <li>
                <a
                  href={item.href}
                  download
                  className="group grid grid-cols-12 items-baseline gap-2 border-b border-text-primary/10 py-5 transition-colors duration-300 hover:bg-text-primary/[0.03]"
                >
                  <span className="col-span-4 font-mono text-sm tracking-[0.12em] text-text-primary sm:col-span-2">
                    {item.format}
                  </span>
                  <span className="col-span-8 font-serif text-body text-text-body sm:col-span-7">
                    {item.note}
                  </span>
                  <span className="col-span-6 font-mono text-xs text-text-secondary sm:col-span-2">
                    {item.size} · full text
                  </span>
                  <span className="col-span-6 flex justify-end text-text-secondary transition-colors group-hover:text-accent-thread sm:col-span-1">
                    <Download className="h-4 w-4" aria-hidden="true" />
                  </span>
                </a>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>

      <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <h2 className="font-display text-h2 font-normal text-text-primary">Read online</h2>
            <p className="mt-4 font-serif text-body leading-relaxed text-text-body">
              Prefer to start here, in the browser? The prologue opens in Saigon, 1943 —
              lanterns still lit, currents dragging.
            </p>
            <Link to="/series/book-one/read/prologue" className="ghost-link mt-5">
              Start at the prologue
            </Link>
          </Reveal>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal delay={100}>
            <h2 className="font-display text-h2 font-normal text-text-primary">Storefronts</h2>
            <p className="mt-4 font-serif text-body leading-relaxed text-text-body">
              The book also lives on Kindle and Google Play Books. If you ever see a
              price there, the free editions above are the same full text.
            </p>
            <div className="mt-5 flex flex-col items-start gap-1">
              {platformLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ghost-link"
                >
                  Open on {link.name}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
