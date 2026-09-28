import { useParams, Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import ThreadDivider from '../components/ThreadDivider'

const newsData = {
  'book-one-release': {
    title: 'Book One Is Out — And It\'s Free',
    date: '2024-01-15',
    content: `The first book in The Thread Seers series is done and available now. You can download the full book for free from this site, or pick it up on Kindle and Google Play Books.

## What the Book Is

Lyra Chen is sixteen. She sketches what she calls "relationship maps" in her notebook margins—lines between people, thick or thin depending on how connected they seem. Then the lines start glowing. Turns out she's a Thread Seer, someone who can perceive the actual connections between living things. She gets recruited to Threadweaver Academy, a hidden school inside a Massachusetts boarding school, where she's supposed to learn how to use her gift.

But students are collapsing. Their connections are being drained by something—an ashen contamination spreading through the thread network. Lyra's father is dying. Her mother disappeared years ago, and the trail leads straight back to the Academy and its research into thread extraction.

## Read the Whole Thing Free

The complete book is available as a free download in PDF, EPUB, and Markdown. No samples, no paywalls—just the full text. You can also read the first few chapters right here on the site if you want to try it in your browser first.

## What's Next

Book Two, *The Weaver's Shadow*, is in progress. The series is planned as seven books following Lyra from age 16 to 18.

— Le Viet Hong`,
  },
  'series-announcement': {
    title: 'Introducing The Thread Seers',
    date: '2024-01-01',
    content: `This is a site for The Thread Seers, a fantasy series I've been working on for a while now. The first book is nearly ready.

## Where It Came From

I kept thinking about the idea that connections between people might be something physical—something with weight and color and texture. Not a metaphor, but an actual dimension layered on top of ours. And if some people could see it, what would they do with that? What institutions would form around it? Who would try to exploit it?

The magic system is based on dependent origination, a concept from Buddhist philosophy—the idea that nothing exists independently. That felt like the right foundation for a story about what connections are and what happens when you treat them as a resource to extract.

## The Story

Lyra Chen is sixteen and has always sketched the lines she sees between people. At Threadweaver Academy, she finds out her ability is real and rare. But the Academy has problems—students are losing their connections to something corrosive, and Lyra's missing mother was involved in the research that might have caused it.

The series is planned as seven books, following Lyra from 16 to 18, and draws on thread traditions from Korean, Indian, Chinese, Egyptian, African, and Indigenous cultures. Each tradition has its own approach to the Weave, and those differences matter to the plot.

## What's Here

I'll use this space for updates as the book and series develop. The first book will be available for free when it launches—full text, no catches.

— Le Viet Hong`,
  },
}

export default function NewsPostPage() {
  const { postSlug } = useParams<{ postSlug: string }>()
  const post = newsData[postSlug as keyof typeof newsData]

  if (!post) {
    return (
      <div className="mx-auto max-w-reading px-6 py-24 text-center lg:px-8">
        <p className="eyebrow">the weave · interrupted</p>
        <h1 className="mt-4 font-display text-h1 font-light text-text-primary">Post Not Found</h1>
        <p className="mx-auto mt-6 max-w-prose font-serif text-body text-text-body">
          This thread comes loose here — no such post.
        </p>
        <Link to="/news" className="ghost-link mt-8">
          Return to echoes
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-reading px-6 py-16 lg:py-24">
      <Reveal>
        <time className="eyebrow block">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      </Reveal>
      <Reveal delay={80}>
        <h1 className="mt-5 font-display text-h1 font-light text-text-primary">{post.title}</h1>
      </Reveal>
      <Reveal delay={140}>
        <ThreadDivider className="mb-10 mt-10" />
      </Reveal>

      <div className="prose-dark mx-0 max-w-none">
        {post.content.split('\n\n').map((paragraph, index) => {
          if (paragraph.startsWith('## ')) {
            return (
              <h2 key={index} className="mb-6 mt-12 font-display text-h2 font-normal text-text-primary">
                {paragraph.replace('## ', '')}
              </h2>
            )
          }
          if (paragraph.startsWith('- ')) {
            const listItems = paragraph.split('\n').filter(item => item.startsWith('- '))
            return (
              <ul key={index} className="mb-6 space-y-2">
                {listItems.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3 text-text-body">
                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent-knot" />
                    {item.replace('- ', '')}
                  </li>
                ))}
              </ul>
            )
          }
          return <p key={index}>{paragraph}</p>
        })}
      </div>

      <div className="mt-16 border-t border-text-primary/10 pt-6">
        <Link to="/news" className="ghost-link text-text-secondary hover:text-text-primary">
          ← Back to echoes
        </Link>
      </div>
    </div>
  )
}
