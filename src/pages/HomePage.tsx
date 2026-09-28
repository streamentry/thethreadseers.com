import { Link, useNavigate } from 'react-router-dom'
import { withBase } from '../lib/siteBase'
import HoldButton from '../components/HoldButton'
import PullQuote from '../components/PullQuote'
import Reveal from '../components/Reveal'
import RelationshipMap, { type ThreadNode } from '../components/RelationshipMap'
import ThreadDivider from '../components/ThreadDivider'

const coverImg = withBase('/img/the_thread_seer_book1.jpg')

/** Inline type-height chips: zoomed cover details (thread knot, spire). */
function InlineChip({ x, y, className = '' }: { x: number; y: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`mx-[0.14em] hidden h-[0.68em] w-[1.5em] select-none rounded-full border border-text-primary/25 bg-background-secondary align-middle sm:inline-block ${className}`}
      style={{
        backgroundImage: `url(${coverImg})`,
        backgroundSize: '380%',
        backgroundPosition: `${x}% ${y}%`,
      }}
    />
  )
}

function DetailPill({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <span
      role="img"
      aria-label={label}
      className="h-20 w-32 select-none rounded-full border border-text-primary/25 bg-background-secondary"
      style={{
        backgroundImage: `url(${coverImg})`,
        backgroundSize: '300%',
        backgroundPosition: `${x}% ${y}%`,
      }}
    />
  )
}

const quartet: ThreadNode[] = [
  {
    name: 'Lyra Chen',
    essence:
      'Sixteen, Chinese-American, pockets full of pencils. She sketches relationship maps in notebook margins — until the lines begin glowing in the air. Rare multi-spectrum sight, dry humor, and a habit of carrying everything alone. Learning, deliberately, to say: not anymore.',
    thread: { hex: '#C0C0C0', label: 'silver · self' },
    meta: 'the artist',
    to: '/series/book-one',
  },
  {
    name: 'Milo Rodriguez',
    essence:
      'Thirteen, curandero lineage, empath-resonator. After a sonic injury leaves him with tinnitus, he starts hearing the Weave as music — Thread-Song. Comic relief with perfect pitch for other people\u2019s pain.',
    thread: { hex: '#C6A15B', label: 'gold · friendship' },
    meta: 'the healer',
  },
  {
    name: 'Zara Washington',
    essence:
      'Twelve, Egyptian and African-American, empath-strengthener. Confident, competitive, strategic — a rivalry with Lyra that hardens into the quartet\u2019s deepest alliance. No solos, split tasking, always.',
    thread: { hex: '#C6A15B', label: 'gold · friendship' },
    meta: 'the leader',
  },
  {
    name: 'Eli Park',
    essence:
      'Ten, Korean and Indian, Buddhist-raised child-prodigy Thread-Reader. Sensory differences that read subtle patterns everyone else walks past. Socially awkward, fiercely loyal, encyclopedic.',
    thread: { hex: '#C6A15B', label: 'gold · friendship' },
    meta: 'the mind',
  },
]

const premise = [
  {
    numeral: '01',
    title: 'Listen',
    body: 'Recruited to Threadweaver Academy, Lyra learns her gift has a name — and that the institution keeping it is failing. Students are collapsing with their connections hollowed out, and nobody in charge will say why.',
  },
  {
    numeral: '02',
    title: 'Seam & scar',
    body: 'An ashen black-silver contamination is spreading through the Weave: threads dimming, fraying, going hollow. What used to feel like silk now feels like scar — fibrous, resistant, still holding.',
  },
  {
    numeral: '03',
    title: 'Hold',
    body: 'Her father is dying. Her mother\u2019s disappearance leads back to the Academy\u2019s hidden extraction research. So Lyra must choose what kind of power she will become: control, or communion.',
  },
]

function HeroThreads() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
    >
      <path
        d="M-40 140 C 260 90, 420 260, 760 190 S 1120 300, 1260 220"
        fill="none"
        stroke="#C6A15B"
        strokeWidth="1.2"
        className="animate-thread-breathe"
      />
      <path
        d="M-40 420 C 300 470, 520 330, 820 430 S 1100 380, 1260 440"
        fill="none"
        stroke="rgba(242,239,230,0.16)"
        strokeWidth="1"
        className="animate-thread-breathe"
        style={{ animationDelay: '1.2s' }}
      />
      <path
        d="M-40 600 C 240 560, 560 660, 880 590 S 1140 620, 1260 580"
        fill="none"
        stroke="rgba(198,161,91,0.45)"
        strokeWidth="1"
        className="animate-thread-breathe"
        style={{ animationDelay: '2.4s' }}
      />
    </svg>
  )
}

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="relative">
      {/* ——— Thread-sight hero: 7/5 asymmetric split ——— */}
      <section className="relative overflow-hidden">
        <HeroThreads />
        <div className="mx-auto grid max-w-canvas gap-12 px-6 pb-20 pt-16 sm:pt-24 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pb-28 lg:pt-32">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">Book one · complete · free, no gate</p>
            </Reveal>
            <Reveal delay={90}>
              <h1 className="mt-6 font-display text-hero font-light text-text-primary">
                She drew the lines <InlineChip x={51} y={62} /> between people — then
                they began <InlineChip x={80} y={46} /> to glow.
              </h1>
            </Reveal>
            <Reveal delay={160} className="mt-6 sm:hidden">
              <div className="flex gap-3">
                <DetailPill x={51} y={62} label="Thread knot detail" />
                <DetailPill x={80} y={46} label="Academy spire detail" />
              </div>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-8 max-w-prose font-serif text-body leading-relaxed text-text-body">
                Teen artist Lyra Chen sketches &ldquo;relationship maps&rdquo; in the margins of her
                notebooks until the lines begin glowing in the air: luminous threads binding
                people, places, and secrets.
              </p>
            </Reveal>
            <Reveal delay={250}>
              <div className="mt-10 flex flex-col items-start gap-5">
                <HoldButton onHold={() => navigate('/download')}>
                  Download Book One — free
                </HoldButton>
                <Link to="/series/book-one/read/prologue" className="ghost-link text-text-secondary">
                  Read the prologue first
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={200} className="lg:mt-14 lg:pl-8">
              <figure>
                <div className="overflow-hidden rounded-sm border border-text-primary/15">
                  <img
                    src={coverImg}
                    alt="The Thread Seers: Book One — cover"
                    className="aspect-[2/3] w-full object-cover"
                  />
                </div>
                <figcaption className="mt-3 font-mono text-xs tracking-[0.18em] text-text-secondary uppercase">
                  Thread Seers · Book One · Cover
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ——— Seam & Scar premise rail ——— */}
      <section className="mx-auto max-w-canvas px-6 py-16 lg:px-8 lg:py-24">
        <Reveal>
          <ThreadDivider />
        </Reveal>
        <div className="mt-14 space-y-14 lg:mt-20 lg:space-y-20">
          {premise.map((row, i) => (
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
      </section>

      {/* ——— Canon pull quote ——— */}
      <section className="mx-auto max-w-canvas px-6 py-8 lg:px-8 lg:py-12">
        <div className="lg:ml-[16%] lg:max-w-3xl">
          <PullQuote cite="Lyra Chen · Book One">
            What used to feel like silk now felt like scar.
          </PullQuote>
        </div>
      </section>

      {/* ——— The quartet: relationship map ——— */}
      <section className="mx-auto max-w-canvas px-6 py-16 lg:px-8 lg:py-24">
        <Reveal>
          <ThreadDivider />
        </Reveal>
        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow">Say their names</p>
              <h2 className="mt-4 font-display text-h2 font-normal text-text-primary">
                No solos, split tasking.
              </h2>
              <p className="mt-5 font-serif text-body leading-relaxed text-text-body">
                A gold collective thread binds all four. They move as a unit — one lures,
                the others break archives, map emotion, count lock-clicks. Ask first.
                Never seize.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <RelationshipMap nodes={quartet} />
          </div>
        </div>
      </section>

      {/* ——— Final hold ——— */}
      <section className="mx-auto max-w-canvas px-6 pb-24 pt-4 lg:px-8">
        <Reveal>
          <ThreadDivider />
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-14 max-w-2xl lg:mt-20">
            <h2 className="font-display text-h2 font-normal text-text-primary">
              Will you hold, if I hold?
            </h2>
            <p className="mt-4 font-serif text-body leading-relaxed text-text-body">
              The complete book. Every format. No gate, no sample — the full text,
              the way threads should be shared.
            </p>
            <div className="mt-8">
              <HoldButton onHold={() => navigate('/download')}>
                Hold the thread — download free
              </HoldButton>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
