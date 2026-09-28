import { withBase } from '../lib/siteBase'

export default function AuthorPage() {  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="font-sans text-h1 font-light tracking-wider text-text-primary mb-6 luminous-text">
          About Le Viet Hong
        </h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Author Photo */}
        <div className="lg:col-span-1">
          <div className="aspect-square rounded-sm border border-text-secondary/20 overflow-hidden mb-8">
            <img
              src={withBase('/img/leviethong.png')}
              alt="Le Viet Hong, author of The Thread Seers"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Author Bio */}
        <div className="lg:col-span-2">
          <div className="prose-dark">
            <p>
              Le Viet Hong grew up between cultures, which is probably why he ended up writing a book
              about the things that connect people across distance and difference. The Thread Seers
              started as a question he couldn't stop thinking about: what if the bonds between people
              were something you could actually see?
            </p>

            <p>
              The series took years of research—into Buddhist philosophy, into how different cultures
              around the world have understood connection and interdependence, into the specific histories
              of the traditions represented in the books. The Korean geometric patterns, the Indian
              meditation techniques, the Yoruba thread-sensing practices—none of that is decoration.
              Each tradition has its own logic and its own stakes.
            </p>

            <p>
              The magic system is built on dependent origination, a Buddhist concept: nothing exists
              independently, everything arises from causes and conditions. That idea shapes every part
              of the story, from how thread-sight works to why extraction is destructive to what
              Lyra ultimately has to learn about power.
            </p>

            <p>
              He writes for young readers because he thinks they're ready for harder questions than
              most books ask them. The Thread Seers doesn't simplify its ethics or pull its punches
              about what happens when people treat relationships as resources.
            </p>


          </div>

          {/* Contact/Social */}
          <div className="mt-12 pt-8 border-t border-text-secondary/20">
            <h3 className="font-sans text-h3 font-medium text-text-primary mb-4">
              Connect
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#"
                className="minimal-button text-text-body hover:text-accent-silver transition-all duration-300"
              >
                vh3969 at gmail.com
              </a>
              {/* <a
                href="#"
                className="minimal-button text-text-body hover:text-accent-silver transition-all duration-300"
              >
                Instagram
              </a> */}
              <a
                href="https://www.goodreads.com/author/show/56881390.Hong_Le_Viet"
                className="minimal-button text-text-body hover:text-accent-silver transition-all duration-300"
              >
                Goodreads
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
