import { Link } from 'react-router-dom'
import { withBase } from '../lib/siteBase'

const books = [
  {
    id: 1,
    slug: 'book-one',
    title: 'The Thread Seers: Book One',
    subtitle: 'Book One of The Thread Seers',
    blurb: 'Teen artist Lyra Chen sketches “relationship maps” in the margins of her notebooks until the lines begin glowing in the air: luminous threads binding people, places, and secrets. Recruited to Threadweaver Academy, Lyra learns her gift has a name, and that the institution is failing as students collapse with their connections hollowed out by an ashen black-silver contamination. With her father dying and her mother’s disappearance tied to the Academy’s hidden extraction research, Lyra must choose what kind of power she will become: control, or communion.',
    available: true,
    freeToRead: true,
    coverImage: withBase('/img/the_thread_seer_book1.jpg'),
  },
  {
    id: 2,
    slug: 'book-two',
    title: 'The Weaver\'s Shadow',
    subtitle: 'Book Two of The Thread Seers',
    blurb: 'Lyra can no longer see the threads—but she can feel them. As she learns to trust a new kind of perception, old fractures inside the Academy crack open. Someone is selling thread techniques that were never meant to leave the school, and the cultural traditions Lyra has come to rely on are under threat from people who see them only as tools.',
    available: false,
    freeToRead: false,
  },
  {
    id: 3,
    slug: 'book-three',
    title: 'The Convergence Protocol',
    subtitle: 'Book Three of The Thread Seers',
    blurb: 'Thread phenomena are going public. Strange lights over cities, mass emotional events with no explanation—the hidden world is becoming harder to hide. Lyra and the Quartet are caught between factions who want to reveal everything and those willing to do terrible things to keep the secret.',
    available: false,
    freeToRead: false,
  },
  {
    id: 4,
    slug: 'book-four',
    title: 'The Silver Path',
    subtitle: 'Book Four of The Thread Seers',
    blurb: 'Coming Soon',
    available: false,
    freeToRead: false,
  },
  {
    id: 5,
    slug: 'book-five',
    title: 'The Communion Wars',
    subtitle: 'Book Five of The Thread Seers',
    blurb: 'Coming Soon',
    available: false,
    freeToRead: false,
  },
  {
    id: 6,
    slug: 'book-six',
    title: 'The Dimensional Bridge',
    subtitle: 'Book Six of The Thread Seers',
    blurb: 'Coming Soon',
    available: false,
    freeToRead: false,
  },
  {
    id: 7,
    slug: 'book-seven',
    title: 'The Awakening Network',
    subtitle: 'Book Seven of The Thread Seers',
    blurb: 'Coming Soon',
    available: false,
    freeToRead: false,
  },
]

export default function SeriesPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="font-sans text-h1 font-light tracking-wider text-text-primary mb-6 luminous-text">
          The Thread Seers
        </h1>
        <div className="prose-dark">
          <p className="text-xl leading-relaxed max-w-3xl mx-auto">
            Lyra Chen is sixteen when she discovers the glowing lines she's always sketched in her notebooks
            are real—threads of connection binding every living thing. Across seven books, she'll grow from
            a girl hiding a strange gift into someone who must decide what that gift is for. The series
            draws on Buddhist philosophy, Asian diaspora experience, and cultural traditions from around
            the world to tell a story about power, family, and what we owe each other.
          </p>
        </div>
      </div>

      {/* Books List */}
      <div className="elegant-spacing">
        {books.map((book, index) => (
          <div key={book.id} className="border-b border-text-secondary/20 pb-12 last:border-b-0">
            <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">
              {/* Book Info */}
              <div className="flex-1">
                <div className="mb-4">
                  <p className="text-caption text-text-secondary font-sans tracking-wide mb-2">
                    {book.subtitle}
                  </p>
                  <h2 className="font-sans text-h2 font-normal text-text-primary mb-4 luminous-text">
                    <Link
                      to={`/series/${book.slug}`}
                      className="hover:text-accent-silver transition-colors duration-300"
                    >
                      {book.title}
                    </Link>
                  </h2>
                </div>

                <div className="prose-dark mb-6">
                  <p>{book.blurb}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {book.freeToRead && (
                    <Link
                      to="/download"
                      className="minimal-button text-accent-silver border border-accent-silver/30 rounded-sm px-6 py-3 hover:border-accent-silver hover:bg-accent-silver/5 transition-all duration-300 text-center"
                    >
                      Download Free
                    </Link>
                  )}

                  {book.available ? (
                    <Link
                      to={`/series/${book.slug}`}
                      className="minimal-button text-text-body hover:text-accent-silver transition-all duration-300 text-center"
                    >
                      Details & Downloads
                    </Link>
                  ) : (
                    <span className="minimal-button text-text-secondary cursor-not-allowed text-center">
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>

              {/* Book Cover */}
              <div className="mt-8 lg:mt-0 lg:w-48 lg:flex-shrink-0">
                <div className="aspect-[2/3] rounded-sm border border-text-secondary/20 overflow-hidden">
                  {book.coverImage ? (
                    <img
                      src={book.coverImage}
                      alt={`${book.title} - ${book.subtitle}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-text-secondary/20 to-text-secondary/5 flex items-center justify-center">
                      <span className="text-text-secondary text-sm font-sans tracking-wide">
                        Book {index + 1}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* What the Series Is About */}
      <div className="mt-20">
        <h2 className="font-sans text-h2 font-normal text-text-primary mb-8 text-center luminous-text">
          What the Series Is About
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="prose-dark">
            <h3 className="font-sans text-h3 font-medium text-text-primary mb-4">
              Dependent Origination
            </h3>
            <p>
              The magic system is rooted in the Buddhist idea that nothing exists on its own—everything
              arises from conditions and relationships. That's not window dressing. It shapes how the
              characters understand their powers, why extraction hurts, and what communion actually costs.
            </p>
          </div>

          <div className="prose-dark">
            <h3 className="font-sans text-h3 font-medium text-text-primary mb-4">
              Cultural Traditions
            </h3>
            <p>
              The story starts in 1943 Saigon and lands in a Massachusetts boarding school where Korean,
              Indian, Chinese, Egyptian, African, and Indigenous thread traditions are taught side by side.
              Each tradition has its own methods, its own history, and its own arguments about what threads
              are for.
            </p>
          </div>

          <div className="prose-dark">
            <h3 className="font-sans text-h3 font-medium text-text-primary mb-4">
              Healing vs. Control
            </h3>
            <p>
              Professor Harlow extracts thread energy with machines. Lin Chen practiced communion—listening
              to the Weave, working with it. That tension runs through everything: how do you use power
              without hollowing out the thing you're drawing it from?
            </p>
          </div>

          <div className="prose-dark">
            <h3 className="font-sans text-h3 font-medium text-text-primary mb-4">
              Family and Inheritance
            </h3>
            <p>
              Lyra's great-great-grandmother Mei-Hua. Her grandmother Nai Nai. Her missing mother Lin.
              The knowledge passed down through these women didn't survive by accident—it survived
              displacement, war, and institutional silence. Lyra inherits all of it, including the
              parts nobody explained.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
