# Design System: The Thread Seers

> Single source of truth for all screens on `thethreadseers.com`.
> Distilled from the full Book One manuscript, series bible, and character
> canon — every token below is traceable to the prose, not to a template.

## 1. Visual Theme & Atmosphere

**"Silk light against the dark."** A luminous-dark literary atelier, not a
fantasy game lobby. The interface is the negative space the book's threads
glow against: near-black calm, warm paper-white text, hairline rules instead
of boxes, and one molten-gold accent that behaves like thread-light — it
breathes, it pulses under load, it never shouts.

- **Density 4** — gallery-balanced. One idea per viewport, generous air.
- **Variance 8** — artsy asymmetric. Off-center heroes, staggered rails,
  zig-zag content. Symmetry is reserved for the reader page, where the prose
  itself is the ornament.
- **Motion 6** — fluid and alive. Everything interactive breathes or shimmers
  on a slow loop; entrances cascade; nothing ever snaps or pops.
- **Five mood words:** Luminous — Tactile — Haunted — Clinical — Communal.
- **Cultural texture:** modern teen immediacy (phones, scanners, intake tags)
  braided with Vietnamese heritage craft — silk work, calligraphic flow, red
  knotting, jade. Warm, handmade precision against cold extraction machinery.
  The design must always feel like **communion, never control**: open hand,
  no grab.

## 2. Color Palette & Roles

One palette, warm-gray family throughout. No warm/cool fluctuation.

- **Void Ink** (`#0A0A0C`) — primary canvas. The dark the threads glow
  against. Never pure black.
- **Loom Charcoal** (`#101014`) — secondary surface, reader chrome, footer.
- **Bone Silk** (`#F2EFE6`) — primary text. Warm paper-white, high contrast
  on Void Ink.
- **Ash Gray** (`#8E8C86`) — secondary text, metadata, captions.
- **Whisper Thread** (`rgba(242,239,230,0.14)`) — 1px structural hairlines,
  dividers, borders. Borders are threads, not boxes.
- **Thread Gold** (`#C6A15B`, sat ~45%) — THE single accent. CTAs, focus
  rings, active states, the breathing hero thread. Molten, spun-sunlight
  gold; never neon, never glowing outward.
- **Knot Red** (`#B34434`, sat ~48%) — reserved strictly for story-data
  contexts: conflict threads in relationship maps, the red silk-knot marker,
  warning states. Never UI chrome, never buttons.

**Thread canon colors (illustration & data ONLY — never buttons, nav, or
chrome):** Family Silver `#C0C0C0`, Memory Blue `#7FA6C9`, Conflict Red
`#B34434`, Contamination Black-Silver `#1A1A1E` with silver edge. Use them
inside relationship-map diagrams, chapter art, and thread-data visualization
exactly as the book codes them: gold friendship, silver family, blue memory,
red conflict, black-silver corruption.

## 3. Typography Rules

Four families, each with one job. `Inter` and `Lora` are retired.

- **Display — Fraunces** (light 300–400, optical sizing on, italic for
  emphasis). Track-tight, controlled scale, hierarchy through weight and
  color. Fraunces' woven old-style letterforms echo silk work and
  calligraphic flow. Headlines in sentence case, never all-caps shouting —
  except the wordmark, letterspaced wide and light.
- **Body / Long-form reading — Newsreader** (400–500, relaxed `1.7`
  leading, `65ch` max). Distinctive modern serif built for immersive reading.
  Owns the reader page, prologues, pull quotes.
- **UI voice — Instrument Sans** (400–600). Nav, labels, buttons, captions.
  Quiet, contemporary, teen-present — the book's narrative voice in UI form.
- **Thread-data Mono — IBM Plex Mono** (400–500). Chapter numbers, file
  sizes, coherence readings, timestamps, diagnostics. All numerals in
  high-density contexts are monospace.
- **Scale:** hero `clamp(3rem, 7vw, 4.75rem)`; section `clamp(1.9rem, 4vw,
  2.75rem)`; body minimum `1rem`. Headlines scale with `clamp()`, never jump
  breakpoints.
- **Banned:** Inter, system-sans stacks for display, Times/Georgia/Garamond/
  Palatino/Lora, all-caps body text, gradient-filled headline text.

## 4. Component Stylings

- **Primary CTA — "Hold the thread."** Flat Thread-Gold fill, Bone-Silk text,
  `2px` radius (cut silk, not pills). Tactile `-1px` translate on active. No
  outer glow — luminosity comes from a slow shimmer sweep across the fill.
  Signature behavior: press-and-hold to confirm the free download, with a
  hairline progress thread. The interaction *is* the theme: holding, not
  grabbing. Exactly one primary CTA per viewport.
- **Secondary actions** are ghost text-links with a hairline underline that
  draws left-to-right on hover. No competing outlined buttons beside a
  primary CTA.
- **Thread-line dividers** replace cards everywhere. A `1px` Whisper-Thread
  rule with a short gold segment that drifts slowly (opacity/transform only)
  marks section boundaries. Cards appear only where elevation means
  hierarchy (book cover, modal); high-density lists use border-top dividers
  and negative space.
- **Relationship-map index** (Series page signature): chapters and characters
  as nodes joined by labeled hairline threads, color-coded to canon (gold /
  silver / blue / red). Nodes breathe on hover; selecting a node tightens its
  thread. This replaces any equal-column card grid.
- **Pull quotes** in Fraunces italic with a small red-knot diamond marker
  (CSS shape, never emoji). Canon lines only — e.g. *"What used to feel like
  silk now felt like scar."*
- **Inputs:** label above in Instrument Sans caps, helper text optional,
  error text below in Knot Red. Gold focus ring. No floating labels.
- **Loaders:** skeletal shimmer blocks matching exact layout dimensions with
  the thread-shimmer sweep. No circular spinners.
- **Empty states:** composed in-world lines, e.g. *"No threads here yet —
  be the first to hold one."* Never bare "No data".
- **Grain:** one fixed SVG-noise pseudo-element at `3–4%` opacity over the
  canvas for silk-tooth texture. Never animated, never per-component.

## 5. Layout Principles

- **Grid-first, asymmetric.** Hero is a 7/5 split, left-aligned, headline
  with inline image chips (cover fragment, jade needle, red knot) set at
  type-height between words — visual punctuation, never overlapping text.
  Cover art occupies its own offset rail zone. Centered heroes are banned.
- **Max width `1400px`**, reading column `65ch`. Full-height sections use
  `min-h-[100dvh]`, never `h-screen`.
- **The "3 equal cards" row is banned.** Use 2-column zig-zag, staggered
  rails, or horizontal scroll-snap.
- **No overlapping elements**, no absolute-stacked content, no `calc()`
  percentage hacks. Generous internal padding; section rhythm
  `clamp(4rem, 9vw, 8rem)`.
- **Reader page** is the calm exception: centered `65ch` Newsreader column,
  chapter opener with oversized Fraunces numeral + hairline, generous
  margins for marginalia. Symmetry here is reverence, not default.
- **Mobile (<768px):** everything collapses to a single column, inline hero
  images stack below the headline, no horizontal overflow ever, `44px`
  minimum touch targets.

## 6. Motion & Interaction

- **Springs by default:** `stiffness 100, damping 20`. Weighty, premium,
  never linear.
- **Perpetual micro-loops:** the hero thread breathes (opacity `0.5→1`,
  4s loop); active CTA shimmers; relationship-map nodes pulse gently; the
  download "coherence" readout ticks in mono. If it is interactive, it is
  alive at rest.
- **Staggered orchestration:** lists and chapter indexes cascade in with
  `60–90ms` delays. Nothing mounts all at once.
- **Hardware only:** animate `transform` and `opacity` exclusively. Never
  `top/left/width/height`. Scroll reveals via IntersectionObserver, one
  gentle rise + fade. No scroll-jacking, no parallax wars.
- **Sound of the book, translated:** healthy threads pulse warm and braided;
  tension states tighten (faster, thinner loops); contamination states go
  still, dim, and cold. Motion carries meaning.

## 7. Voice & Copy (Design-Load-Bearing)

The interface speaks in Lyra's register: observant, dry, teen-present,
lyrical only at thread-moments. Section titles may borrow the five signature
motifs: **Ask First · Hold / Being Held · Listen · Seam & Scar · Say Their
Names.**

- **Banned fantasy-marketing words:** chosen one, dark lord, magic school,
  spells, potions, epic quest, destiny, prophecy, good vs. evil,
  supernatural powers, enchanted, realm of shadows.
- **Banned AI copy clichés:** Elevate, Seamless, Unleash, Next-Gen,
  Delve, Tapestry (as metaphor for the *site* — the book owns that word).
- **Banned filler:** "Scroll to explore", "Swipe down", scroll arrows,
  bouncing chevrons, "Learn more" as a second CTA.
- CTAs say what happens: *"Download Book One — free, no gate"* /
  *"Read the prologue"* / *"Meet the quartet"*.

## 8. Anti-Patterns (Banned)

No emojis. No Inter. No generic serifs. No pure black. No neon or outer-glow
shadows. No oversaturated accents (all color under 80% saturation). No AI
purple/blue gradients — the existing violet accent is removed. No gradient
text on headers. No custom cursors. No overlapping elements. No centered
hero. No 3-column equal grids. No fake round stats. No generic names or
placeholder people. No broken image links — local `public/img` and
`picsum.photos` only. No circular spinners. No "scroll to explore". No
second CTA competing with the primary. No wand-fantasy language. No
all-caps paragraphs.

## 9. Page Signatures (What "Unconventional" Means Here)

- **Home:** asymmetric thread-sight hero → breathing hairline → "Seam &
  Scar" premise rail (zig-zag, not cards) → quartet relationship-map strip
  → single Hold-the-thread CTA → footer as quiet colophon.
- **Series:** relationship-map index of books/chapters with canon thread
  colors; unavailable books shown as dimmed, frayed threads (honest,
  in-world).
- **Reader:** the calm room. Newsreader column, Fraunces chapter numeral,
  mono progress ("Chapter 12 · Coherence steady"), marginalia pull-quotes.
- **Downloads:** file ledger in mono with sizes and formats, press-and-hold
  CTA, "no gate, full text" stated plainly. Integrity, not marketing.
- **Author/World/News:** editorial asymmetry, inline image typography,
  hairline dividers, one CTA max.

## 10. Migration Notes (Current Codebase → This System)

- `tailwind.config.js`: retire `Inter`/`Lora`, violet `#A095B5`; promote
  recalibrated gold `#C6A15B`; add Void/Loom/Bone/Ash/Whisper/Knot tokens.
- `index.html`: load Fraunces + Newsreader + Instrument Sans + IBM Plex Mono.
- `HomePage.tsx`: rebuild centered hero → 7/5 asymmetric split with inline
  image chips and single press-and-hold CTA.
- `index.css`: keep shimmer keyframes, retune to gold; add breathe loop,
  hairline drift, grain overlay, relationship-map node styles.
- `404.html` / loading states: rewrite in book voice per §4 and §7.
