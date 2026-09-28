import { Link } from 'react-router-dom'
import Reveal from './Reveal'

export interface ThreadNode {
  name: string
  essence: string
  /** Canon thread color + label, e.g. { hex: '#C6A15B', label: 'gold · friendship' } */
  thread: { hex: string; label: string }
  meta?: string
  to?: string
  dimmed?: boolean
}

interface RelationshipMapProps {
  nodes: ThreadNode[]
  className?: string
}

/**
 * Nodes joined by labeled hairline threads along a single rail.
 * Replaces equal-column card grids; stagger-reveals on scroll.
 */
export default function RelationshipMap({ nodes, className = '' }: RelationshipMapProps) {
  return (
    <ol className={`relative ml-2 border-l border-text-primary/10 pl-8 sm:pl-10 ${className}`}>
      {nodes.map((node, i) => {
        const body = (
          <>
            <span
              aria-hidden="true"
              className="absolute top-2 -left-8 flex h-4 w-4 items-center justify-center sm:-left-10"
              style={{ marginLeft: '-8px' }}
            >
              <span
                className="block h-2.5 w-2.5 rounded-full animate-thread-breathe"
                style={{
                  backgroundColor: node.thread.hex,
                  opacity: node.dimmed ? 0.35 : undefined,
                  animationDelay: `${i * 0.6}s`,
                }}
              />
            </span>
            <p className="eyebrow mb-2" style={node.dimmed ? { opacity: 0.6 } : undefined}>
              {node.thread.label}
              {node.meta ? <span className="normal-case tracking-normal"> · {node.meta}</span> : null}
            </p>
            <h3
              className="font-display text-h3 font-normal text-text-primary"
              style={node.dimmed ? { opacity: 0.55 } : undefined}
            >
              {node.name}
            </h3>
            <p
              className="mt-2 max-w-prose font-serif text-body leading-relaxed text-text-body"
              style={node.dimmed ? { opacity: 0.65 } : undefined}
            >
              {node.essence}
            </p>
          </>
        )

        return (
          <Reveal key={node.name} delay={Math.min(i, 8) * 80}>
            <li className={`relative pb-10 last:pb-0 ${node.dimmed ? '' : ''}`}>
              {node.to ? (
                <Link
                  to={node.to}
                  className="group block rounded-sm transition-colors duration-300 hover:bg-text-primary/[0.03]"
                >
                  {body}
                  <span className="ghost-link mt-1 text-sm text-text-secondary group-hover:text-text-primary">
                    Follow this thread →
                  </span>
                </Link>
              ) : (
                body
              )}
            </li>
          </Reveal>
        )
      })}
    </ol>
  )
}
