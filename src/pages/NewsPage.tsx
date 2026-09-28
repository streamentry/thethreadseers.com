import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import ThreadDivider from '../components/ThreadDivider'

const newsData = [
  {
    slug: 'book-one-release',
    title: 'Book One Is Out — And It\'s Free',
    date: '2024-01-15',
    excerpt: 'The first book in The Thread Seers series is done and available as a free download. Full text, no paywalls.',
  },
  {
    slug: 'series-announcement',
    title: 'Introducing The Thread Seers',
    date: '2024-01-01',
    excerpt: 'A series about a girl who can see the threads connecting people, the hidden school that trains her, and the question of what those connections are actually for.',
  },
]

export default function NewsPage() {
  return (
    <div className="mx-auto max-w-canvas px-6 py-16 lg:px-8 lg:py-24">
      <div className="max-w-3xl">
        <Reveal>
          <p className="eyebrow">Echoes · from the desk</p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-5 font-display text-h1 font-light text-text-primary">
            Word travels along threads, too.
          </h1>
        </Reveal>
      </div>

      <Reveal>
        <ThreadDivider className="mt-14 lg:mt-20" />
      </Reveal>

      <div className="mt-4">
        {newsData.map((post, i) => (
          <Reveal key={post.slug} delay={Math.min(i, 4) * 80}>
            <article className="grid gap-3 border-b border-text-primary/10 py-10 lg:grid-cols-12 lg:gap-8">
              <time className="font-mono text-xs uppercase tracking-[0.18em] text-text-secondary lg:col-span-3 lg:pt-2">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <div className="lg:col-span-8">
                <h2 className="font-display text-h2 font-normal text-text-primary">
                  <Link
                    to={`/news/${post.slug}`}
                    className="transition-colors duration-300 hover:text-accent-thread"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 max-w-prose font-serif text-body leading-relaxed text-text-body">
                  {post.excerpt}
                </p>
                <Link
                  to={`/news/${post.slug}`}
                  className="ghost-link mt-4 text-text-secondary hover:text-text-primary"
                >
                  Read the post
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
