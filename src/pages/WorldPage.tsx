import ThreadSeerQuiz from '../components/ThreadSeerQuiz'
import Reveal from '../components/Reveal'
import ThreadDivider from '../components/ThreadDivider'

const threadColors = [
  { name: 'Family · Silver', hex: '#C0C0C0', note: 'Luminous, rope-like bonds between family members. Dense like drawn wire — flares white at the core when protective.' },
  { name: 'Friendship · Gold', hex: '#C6A15B', note: 'Bright, braided bonds between friends. Warm where the load is shared.' },
  { name: 'Memory · Blue', hex: '#7FA6C9', note: 'Translucent, like light seen through water. Ghost images move inside.' },
  { name: 'Nature · Green', hex: '#7D8F69', note: 'Organic, vine-like connections to the living world. Anchored, patient.' },
  { name: 'Conflict · Red', hex: '#B34434', note: 'Jagged and barbed. Tightens like wire under load.' },
  { name: 'Deception · Gray', hex: '#6B695F', note: 'Murky, twisted. Too clean where it should breathe.' },
  { name: 'Animus Argenti · Pure Silver', hex: '#EDEAE0', note: 'The conscious core of the dimension itself. Internal luminosity — the Weave, awake.' },
  { name: 'Contamination · Black-Silver', hex: '#1A1A1E', note: 'Ashen black with sickly silver edges. Consumes rather than connects. Cold, utilitarian, extractive.', dark: true },
]

const seerTypes = [
  { name: 'Visualizers', note: 'See threads with high clarity; pattern recognition, visual language of the Weave.' },
  { name: 'Resonators', note: 'Hear thread harmonics as musical tones — woodwinds, cello, chimes, clashing cymbals.' },
  { name: 'Empaths', note: 'Feel the emotional content directly: warm wool and velvet, or icy chill and sharp stab.' },
  { name: 'Navigators', note: 'Trace thread paths across distance — tug, pull, currents, rivers.' },
  { name: 'Manipulators', note: 'Rarest of all: strengthen, redirect, or create new threads. Ask first. Never seize.' },
  { name: 'Sensory Weavers', note: 'Evolved perception through non-visual senses — touch, texture, temperature, knowing.' },
]

const traditions = [
  { name: 'Korean geometric patterns', note: 'Precise mathematical weaving — balance, symmetry, bojagi patchwork logic.' },
  { name: 'Indian philosophical methods', note: 'Meditation-based technique; thread work as spiritual practice.' },
  { name: 'Chinese communion practices', note: 'Ancestral silk work — harmony and reciprocal relationship with the Weave. Conversation, not domination.' },
  { name: 'Egyptian thread hieroglyphics', note: 'Ancient symbolic systems for recording and transmitting thread knowledge.' },
  { name: 'African pattern-speaking', note: 'Oral traditions encoding technique in story and song.' },
  { name: 'Yoruba thread sensing', note: 'ẹ̀mí àgbájọ — gathered life. Artifacts like the Òwú Ìmọ̀lára amplify connection.' },
  { name: 'Dreamline tracing', note: 'Following connections across vast distances and through time.' },
  { name: 'Land-based practices', note: 'Understanding threads through specific places — songlines, Country, ground that remembers.' },
  { name: 'Ancestral communication', note: 'Threads maintained with those who have passed. Say their names.' },
]

const glossary: [string, string][] = [
  ['Animus Argenti', 'The “Silver Soul” — the conscious core of the thread dimension. Pure silver threads; a living interface between human consciousness and the Weave.'],
  ['Tactile Communion', 'Evolved perception through touch, texture, temperature, full-body sensation — rather than visual sight. Shēn Céng Gòng Míng.'],
  ['Thread Burn', 'Corrosion from forceful thread manipulation. Silver-white scarring along nerve pathways — burn lines brightening in disciplined routes.'],
  ['The Weave', 'The collective network of all threads. A living ecosystem showing signs of its own consciousness — and attempts at communication.'],
  ['Communion vs. Control', 'The central divide: working with the Weave in reciprocity, versus extracting thread energy for utilitarian ends.'],
  ['Weave-Quake', 'Instability in the thread dimension — often from unethical harvesting — measured as disruption across the network.'],
  ['Thread Nexus', 'Where many threads converge. Sites of power and cultural weight — Kyoto, Uluru, Stonehenge, the Academy.'],
  ['Convergence Protocol', 'A collaborative ceremony: multiple traditions working together to stabilize the Weave in crisis.'],
  ['Magnus Conduit', 'Harlow\u2019s extraction machine. The dangerous extreme of the Control philosophy — threads treated like wiring.'],
  ['Òwú Ìdásílẹ̀', 'Foundation Thread — Yoruba name for the Animus Argenti, the foundational consciousness of the dimension.'],
  ['Participatory Metaphysics', 'Lin Chen\u2019s theory: observer and observed co-create reality in the Weave. You cannot touch without being touched.'],
  ['Silver Path', 'Lin Chen\u2019s approach — communion and reciprocity rather than extraction and control.'],
]

export default function WorldPage() {
  return (
    <div className="mx-auto max-w-canvas px-6 py-16 lg:px-8 lg:py-24">
      <div className="max-w-3xl">
        <Reveal>
          <p className="eyebrow">The world · the weave</p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-5 font-display text-h1 font-light text-text-primary">
            An extra layer, laid over ours.
          </h1>
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-6 font-serif text-body leading-relaxed text-text-body">
            Luminous threads run between people, places, and ideas — visible only to a
            rare few. The Thread Dimension is a living network with its own rules and,
            increasingly, its own will. Nothing in it exists in isolation: pull one
            thread without understanding what it touches, and you will feel the
            consequences.
          </p>
        </Reveal>
      </div>

      {/* Thread classification — canon color index */}
      <section className="mt-16 lg:mt-24">
        <Reveal>
          <ThreadDivider />
        </Reveal>
        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <h2 className="font-display text-h2 font-normal text-text-primary">The thread index</h2>
              <p className="mt-4 font-serif text-body leading-relaxed text-text-body">
                Threads show their nature in color and texture. Thickness is strength,
                brightness is intensity, clarity is health, movement is state — pulsing,
                vibrating, still. Frayed where someone insisted they were fine.
              </p>
            </Reveal>
          </div>
          <ol className="lg:col-span-7 lg:col-start-6">
            {threadColors.map((t, i) => (
              <Reveal key={t.name} delay={Math.min(i, 8) * 60}>
                <li className="flex items-start gap-5 border-t border-text-primary/10 py-5 last:border-b">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-3 w-3 shrink-0 rounded-full animate-thread-breathe"
                    style={{
                      backgroundColor: t.hex,
                      border: t.dark ? '1px solid rgba(242,239,230,0.4)' : 'none',
                      animationDelay: `${i * 0.5}s`,
                    }}
                  />
                  <div>
                    <p className="font-mono text-sm tracking-[0.1em] text-text-primary">{t.name}</p>
                    <p className="mt-1.5 font-serif text-body leading-relaxed text-text-body">{t.note}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Seer classifications */}
      <section className="mt-16 lg:mt-24">
        <Reveal>
          <ThreadDivider />
        </Reveal>
        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <h2 className="font-display text-h2 font-normal text-text-primary">Six ways of perceiving</h2>
              <p className="mt-4 font-serif text-body leading-relaxed text-text-body">
                Not all seers meet the Weave the same way. Some see it, some hear it,
                some feel it through their skin.
              </p>
            </Reveal>
          </div>
          <ol className="lg:col-span-7 lg:col-start-6">
            {seerTypes.map((s, i) => (
              <Reveal key={s.name} delay={Math.min(i, 6) * 60}>
                <li className="grid gap-1 border-t border-text-primary/10 py-5 last:border-b sm:grid-cols-12 sm:gap-4">
                  <p className="font-mono text-sm tracking-[0.1em] text-accent-thread sm:col-span-4">{s.name}</p>
                  <p className="font-serif text-body leading-relaxed text-text-body sm:col-span-8">{s.note}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Quiz */}
      <section className="mt-16 lg:mt-24">
        <Reveal>
          <ThreadDivider />
        </Reveal>
        <div className="mt-12 max-w-3xl lg:mt-16">
          <Reveal>
            <p className="eyebrow">Listen · which thread is yours</p>
            <h2 className="mt-4 font-display text-h2 font-normal text-text-primary">
              Discover how you would perceive the Weave.
            </h2>
          </Reveal>
        </div>
        <Reveal delay={120}>
          <div className="mt-8 max-w-3xl">
            <ThreadSeerQuiz />
          </div>
        </Reveal>
      </section>

      {/* Traditions */}
      <section className="mt-16 lg:mt-24">
        <Reveal>
          <ThreadDivider />
        </Reveal>
        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <h2 className="font-display text-h2 font-normal text-text-primary">Old hands, many schools</h2>
              <p className="mt-4 font-serif text-body leading-relaxed text-text-body">
                People have worked threads for thousands of years, in different places,
                by different methods. At the Academy they are taught side by side —
                sometimes productively, sometimes not. Integrate, don&rsquo;t appropriate.
              </p>
            </Reveal>
          </div>
          <ol className="lg:col-span-7 lg:col-start-6">
            {traditions.map((t, i) => (
              <Reveal key={t.name} delay={Math.min(i, 8) * 60}>
                <li className="grid gap-1 border-t border-text-primary/10 py-5 last:border-b sm:grid-cols-12 sm:gap-4">
                  <p className="font-mono text-sm tracking-[0.1em] text-text-primary sm:col-span-5">{t.name}</p>
                  <p className="font-serif text-body leading-relaxed text-text-body sm:col-span-7">{t.note}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Academy */}
      <section className="mt-16 lg:mt-24">
        <Reveal>
          <ThreadDivider />
        </Reveal>
        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">Threadweaver Academy · est. 1798</p>
              <h2 className="mt-4 font-display text-h2 font-normal text-text-primary">
                A school hiding inside a school.
              </h2>
              <div className="prose-dark mx-0 mt-6 max-w-prose">
                <p>
                  North America&rsquo;s oldest Thread Seer institution, hidden within
                  Westbrook Academy in the Berkshire Mountains — an ordinary boarding
                  school to non-seers, revealed through perception filters and
                  architectural impossibilities to those with Thread Sight.
                </p>
                <p>
                  Its central chamber holds the Great Loom: a vast domed hall where
                  historical threads are preserved in living marble columns — library
                  and living record both, the karmic traces of generations. The
                  Historical Ceiling hangs above like constellations. Or frescoes of
                  light.
                </p>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={120}>
              <p className="eyebrow">Field notes</p>
              <ul className="mt-4 space-y-4 font-serif text-body leading-relaxed text-text-body">
                <li>Loom Tower catches morning sun like hammered brass.</li>
                <li>The Boundary runs misty as a veil — like a watery surface, like heat haze.</li>
                <li>The Tangle commons holds a living tapestry of student gold.</li>
                <li>Emergency red holds. Ozone coats the throat.</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Glossary */}
      <section className="mt-16 lg:mt-24">
        <Reveal>
          <ThreadDivider />
        </Reveal>
        <div className="mt-12 lg:mt-16">
          <Reveal>
            <p className="eyebrow">Glossary · say their names</p>
            <h2 className="mt-4 font-display text-h2 font-normal text-text-primary">
              Words the Weave answers to.
            </h2>
          </Reveal>
          <dl className="mt-10">
            {glossary.map(([term, def], i) => (
              <Reveal key={term} delay={Math.min(i, 10) * 50}>
                <div className="grid gap-1 border-t border-text-primary/10 py-5 last:border-b sm:grid-cols-12 sm:gap-4">
                  <dt className="font-mono text-sm tracking-[0.1em] text-accent-thread sm:col-span-4">{term}</dt>
                  <dd className="font-serif text-body leading-relaxed text-text-body sm:col-span-8">{def}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>
    </div>
  )
}
