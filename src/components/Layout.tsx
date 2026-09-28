import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import SeoManager from './SeoManager'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="grain min-h-screen bg-background-primary text-text-body">
      <SeoManager />
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
