interface ThreadDividerProps {
  className?: string
}

/** A 1px whisper-thread rule with a short gold segment drifting along it. */
export default function ThreadDivider({ className = '' }: ThreadDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`relative h-px w-full overflow-hidden bg-text-primary/10 ${className}`}
    >
      <span className="absolute inset-y-0 left-0 w-1/4 bg-accent-thread/80 animate-thread-drift" />
    </div>
  )
}
