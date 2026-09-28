import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'

const HOLD_MS = 900

interface HoldButtonProps {
  children: ReactNode
  onHold: () => void
  className?: string
  hint?: string
}

/**
 * Press-and-hold primary CTA. Holding (not grabbing) is the book's ethic,
 * so the signature action takes ~900ms of sustained contact with a hairline
 * progress thread. Respects reduced-motion by acting as a normal button.
 */
export default function HoldButton({ children, onHold, className = '', hint = 'press and hold' }: HoldButtonProps) {
  const [progress, setProgress] = useState(0)
  const [cooling, setCooling] = useState(false)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef(0)
  const doneRef = useRef(false)
  const onHoldRef = useRef(onHold)
  onHoldRef.current = onHold

  const stop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [])

  const cancel = useCallback(() => {
    stop()
    if (!doneRef.current) setProgress(0)
  }, [stop])

  const finish = useCallback(() => {
    stop()
    doneRef.current = true
    setProgress(1)
    setCooling(true)
    onHoldRef.current()
    window.setTimeout(() => {
      doneRef.current = false
      setCooling(false)
      setProgress(0)
    }, 800)
  }, [stop])

  const tick = useCallback(() => {
    const elapsed = performance.now() - startRef.current
    if (elapsed >= HOLD_MS) {
      finish()
      return
    }
    setProgress(elapsed / HOLD_MS)
    rafRef.current = requestAnimationFrame(tick)
  }, [finish])

  const start = useCallback(() => {
    if (doneRef.current || cooling) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish()
      return
    }
    startRef.current = performance.now()
    rafRef.current = requestAnimationFrame(tick)
  }, [cooling, finish, tick])

  useEffect(() => stop, [stop])

  return (
    <button
      type="button"
      onPointerDown={start}
      onPointerUp={cancel}
      onPointerLeave={cancel}
      onPointerCancel={cancel}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !e.repeat) {
          e.preventDefault()
          start()
        }
      }}
      onKeyUp={cancel}
      onBlur={cancel}
      onContextMenu={(e) => e.preventDefault()}
      className={`hold-cta select-none px-8 py-4 text-base ${className}`}
      aria-label={`${typeof children === 'string' ? children : 'Confirm action'} — ${hint}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 bg-text-primary/15"
        style={{ width: `${Math.round(progress * 100)}%` }}
      />
      <span className="relative flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
        {children}
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] opacity-70">
          {progress >= 1 ? 'held' : hint}
        </span>
      </span>
    </button>
  )
}
