import PullQuote from '../components/PullQuote'
import Reveal from '../components/Reveal'
import ThreadDivider from '../components/ThreadDivider'

export default function AuthorPage() {
  return (
    <div className="mx-auto max-w-canvas px-6 py-16 lg:px-8 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <figure className="lg:sticky lg:top-8">
              <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-sm border border-text-primary/15 bg-background-secondary">
                <span aria-hidden="true" className="font-display text-7xl font-light italic text-accent-thread">
                  LVH
                </span>
              </div>
              <figcaption className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-text-secondary">
                Author photograph — to come
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <Reveal>
            <p className="eyebrow">The author</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-5 font-display text-h1 font-light text-text-primary">
              Between cultures, following the threads.
            </h1>
          </Reveal>
          <Reveal delay={150}>
            <div className="prose-dark mx-0 mt-8 max-w-prose">
              <p>
                Le Viet Hong grew up between cultures, which is probably why he ended up
                writing a book about the things that connect people across distance and
                difference. The Thread Seers started as a question he couldn&rsquo;t stop
                thinking about: what if the bonds between people were something you could
                actually see?
              </p>
              <p>
                The series took years of research — into Buddhist philosophy, into how
                different cultures around the world have understood connection and
                interdependence, into the specific histories of the traditions represented
                in the books. The Korean geometric patterns, the Indian meditation
                techniques, the Yoruba thread-sensing practices — none of that is
                decoration. Each tradition has its own logic and its own stakes.
              </p>
              <p>
                The magic system is built on dependent origination, a Buddhist concept:
                nothing exists independently, everything arises from causes and
                conditions. That idea shapes every part of the story, from how
                thread-sight works to why extraction is destructive to what Lyra
                ultimately has to learn about power.
              </p>
              <p>
                He writes for young readers because he thinks they&rsquo;re ready for
                harder questions than most books ask them. The Thread Seers doesn&rsquo;t
                simplify its ethics or pull its punches about what happens when people
                treat relationships as resources.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <ThreadDivider className="mb-10 mt-12" />
            <p className="eyebrow">Say their names · connect</p>
            <div className="mt-3 flex flex-col items-start gap-1">
              <a href="mailto:vh3969 at gmail.com" className="ghost-link">
                vh3969 at gmail.com
              </a>
              <a
                href="https://www.goodreads.com/author/show/56881390.Hong_Le_Viet"
                target="_blank"
                rel="noopener noreferrer"
                className="ghost-link"
              >
                Goodreads
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mt-20 lg:mt-28">
        <Reveal>
          <ThreadDivider />
        </Reveal>
        <div className="mt-12 lg:ml-[16%] lg:mt-16 lg:max-w-3xl">
          <PullQuote cite="Book One">
            The Academy had learned how to look calm while it burned.
          </PullQuote>
        </div>
      </div>
    </div>
  )
}
