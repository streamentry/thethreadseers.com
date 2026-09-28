import type { ReactNode } from 'react'
import Reveal from './Reveal'

interface PullQuoteProps {
  children: ReactNode
  cite?: string
  className?: string
}

/** Canon pull quote: Fraunces italic with a red-knot diamond marker. */
export default function PullQuote({ children, cite, className = '' }: PullQuoteProps) {
  return (
    <Reveal className={className}>
      <blockquote className="pullquote max-w-prose">
        {children}
        {cite && (
          <cite className="mt-5 block font-mono text-xs not-italic tracking-[0.18em] text-text-secondary uppercase">
            {cite}
          </cite>
        )}
      </blockquote>
    </Reveal>
  )
}
