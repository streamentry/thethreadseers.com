import { Twitter, Instagram } from 'lucide-react'
import ThreadDivider from './ThreadDivider'

const socialLinks = [
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'Instagram', href: '#', icon: Instagram },
]

export default function Footer() {
  return (
    <footer className="mt-24 px-6 pb-12 lg:px-8">
      <div className="mx-auto max-w-canvas">
        <ThreadDivider className="mb-10" />
        <div className="md:flex md:items-end md:justify-between">
          <div>
            <p className="font-sans text-sm font-light uppercase tracking-[0.32em] text-text-primary">
              The Thread Seers
            </p>
            <p className="mt-3 font-mono text-xs tracking-[0.14em] text-text-secondary">
              SET IN FRAUNCES &amp; NEWSREADER · THREADS HOLD
            </p>
            <p className="mt-2 text-sm text-text-secondary">
              &copy; {new Date().getFullYear()} Le Viet Hong. All rights reserved.
            </p>
          </div>
          <div className="mt-8 flex space-x-2 md:mt-0">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-sm text-text-secondary hover:text-accent-thread transition-colors duration-300"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
