import Reveal from '../components/Reveal'
import RelationshipMap, { type ThreadNode } from '../components/RelationshipMap'
import ThreadDivider from '../components/ThreadDivider'

const GOLD = '#C6A15B'
const MEMORY = '#7FA6C9'
const KNOT = '#B34434'
const UNSPUN = '#6B695F'

const books: ThreadNode[] = [
  {
    name: 'The Thread Seers: Book One',
    essence:
      'Teen artist Lyra Chen sketches “relationship maps” in the margins of her notebooks until the lines begin glowing in the air. Recruited to Threadweaver Academy, she learns her gift has a name — and that the institution is failing as students collapse with their connections hollowed out by an ashen black-silver contamination. Control, or communion.',
    thread: { hex: GOLD, label: 'gold · communion' },
    meta: 'book one · complete · free',
    to: '/series/book-one',
  },
  {
    name: 'The Weaver\u2019s Shadow',
    essence:
      'Lyra can no longer see the threads — but she can feel them. As she learns to trust a new kind of perception, old fractures inside the Academy crack open, and the traditions she relies on come under threat from people who see them only as tools.',
    thread: { hex: MEMORY, label: 'blue · new perception' },
    meta: 'book two · in progress',
  },
  {
    name: 'The Convergence Protocol',
    essence:
      'Thread phenomena are going public — strange lights over cities, mass emotional events with no explanation. Lyra and the quartet are caught between factions who want to reveal everything and those willing to do terrible things to keep the secret.',
    thread: { hex: KNOT, label: 'red · conflict' },
    meta: 'book three · ahead',
  },
  {
    name: 'The Silver Path',
    essence: 'Not yet spun.',
    thread: { hex: UNSPUN, label: 'unspun' },
    meta: 'book four',
    dimmed: true,
  },
  {
    name: 'The Communion Wars',
    essence: 'Not yet spun.',
    thread: { hex: UNSPUN, label: 'unspun' },
    meta: 'book five',
    dimmed: true,
  },
  {
    name: 'The Dimensional Bridge',
    essence: 'Not yet spun.',
    thread: { hex: UNSPUN, label: 'unspun' },
    meta: 'book six',
    dimmed: true,
  },
  {
    name: 'The Awakening Network',
    essence: 'Not yet spun.',
    thread: { hex: UNSPUN, label: 'unspun' },
    meta: 'book seven',
    dimmed: true,
  },
]

const about = [
  {
    numeral: '01',
    title: 'Dependent origination',
    body: 'The magic is rooted in the Buddhist idea that nothing exists on its own — everything arises from conditions and relationships. That shapes how the characters understand their powers, why extraction hurts, and what communion actually costs.',
  },
  {
    numeral: '02',
    title: 'Living traditions',
    body: 'The story starts in 1943 Saigon and lands in a Massachusetts boarding school where Korean, Indian, Chinese, Egyptian, African, and Indigenous thread traditions are taught side by side — each with its own methods, history, and arguments about what threads are for.',
  },
  {
    numeral: '03',
    title: 'Healing against control',
    body: 'Harlow extracts thread energy with machines. Lin Chen practiced communion — listening to the Weave, working with it. How do you use power without hollowing out the thing you\u2019re drawing it from?',
  },
  {
    numeral: '04',
    title: 'Inheritance',
    body: 'Lyra\u2019s great-great-grandmother Mei-Hua. Her grandmother Nai Nai. Her missing mother Lin. The knowledge passed down through these women survived displacement, war, and institutional silence. Lyra inherits all of it — including the parts nobody explained.',
  },
]

export default function SeriesPage() {
  return (
    <div className="mx-auto max-w-canvas px-6 py-16 lg:px-8 lg:py-24">
      <div className="max-w-3xl">
        <Reveal>
          <p className="eyebrow">The series · seven books</p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-5 font-display text-h1 font-light text-text-primary">
            Follow the threads. Say their names.
          </h1>
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-6 font-serif text-body leading-relaxed text-text-body">
            Lyra Chen is sixteen when the glowing lines she has always sketched turn out to
            be real — threads of connection binding every living thing. Across seven books
            she grows from a girl hiding a strange gift into someone who must decide what
            that gift is for.
          </p>
        </Reveal>
      </div>

      <Reveal>
        <ThreadDivider className="mt-14 lg:mt-20" />
      </Reveal>

      <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <h2 className="font-display text-h2 font-normal text-text-primary">The index</h2>
            <p className="mt-4 font-serif text-body leading-relaxed text-text-body">
              Every book, one thread. Bright where the work is done, dimmed and frayed
              where it isn&rsquo;t yet. Honest, like the Weave.
            </p>
          </Reveal>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <RelationshipMap nodes={books} />
        </div>
      </div>

      <Reveal>
        <ThreadDivider className="mt-16 lg:mt-24" />
      </Reveal>

      <div className="mt-14 space-y-14 lg:mt-20 lg:space-y-20">
        {about.map((row, i) => (
          <Reveal key={row.numeral} delay={80}>
            <div className="grid gap-4 lg:grid-cols-12 lg:gap-8">
              <p
                className={`font-mono text-sm tracking-[0.2em] text-accent-thread lg:col-span-2 ${
                  i % 2 === 1 ? 'lg:order-2 lg:text-right' : ''
                }`}
              >
                {row.numeral}
              </p>
              <div className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-1 lg:col-start-4' : 'lg:col-start-3'}`}>
                <h2 className="font-display text-h2 font-normal text-text-primary">{row.title}</h2>
                <p className="mt-4 max-w-prose font-serif text-body leading-relaxed text-text-body">
                  {row.body}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
