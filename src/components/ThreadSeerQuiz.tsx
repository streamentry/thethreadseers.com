import { useState } from 'react'
import { ChevronRight, RotateCcw } from 'lucide-react'

interface QuizQuestion {
  id: number
  question: string
  options: {
    text: string
    type: 'visualizer' | 'resonator' | 'empath' | 'navigator' | 'manipulator' | 'sensory'
  }[]
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "When you enter a crowded room, what do you notice first?",
    options: [
      { text: "The patterns of movement and how people cluster together", type: 'visualizer' },
      { text: "The overall emotional atmosphere and energy", type: 'empath' },
      { text: "The sounds and rhythms of conversation", type: 'resonator' },
      { text: "How the space connects to other areas", type: 'navigator' },
      { text: "The textures, temperatures, and physical sensations", type: 'sensory' },
      { text: "How you might rearrange things to improve the flow", type: 'manipulator' }
    ]
  },
  {
    id: 2,
    question: "How do you best understand complex relationships?",
    options: [
      { text: "By drawing diagrams or visual maps", type: 'visualizer' },
      { text: "By feeling the emotional dynamics", type: 'empath' },
      { text: "By listening to the 'harmony' or 'discord' between people", type: 'resonator' },
      { text: "By tracing connections across time and distance", type: 'navigator' },
      { text: "Through physical proximity and touch", type: 'sensory' },
      { text: "By actively working to strengthen or repair bonds", type: 'manipulator' }
    ]
  },
  {
    id: 3,
    question: "When solving problems, you tend to:",
    options: [
      { text: "See patterns and connections others miss", type: 'visualizer' },
      { text: "Understand what people really need emotionally", type: 'empath' },
      { text: "Hear the underlying rhythms and find harmony", type: 'resonator' },
      { text: "Find unexpected paths and connections", type: 'navigator' },
      { text: "Trust your gut feelings and physical intuition", type: 'sensory' },
      { text: "Take action to actively change the situation", type: 'manipulator' }
    ]
  },
  {
    id: 4,
    question: "Your ideal learning environment would be:",
    options: [
      { text: "Rich with visual aids, charts, and clear patterns", type: 'visualizer' },
      { text: "Emotionally supportive with understanding teachers", type: 'empath' },
      { text: "Filled with music, discussion, and varied sounds", type: 'resonator' },
      { text: "Offering freedom to explore and make connections", type: 'navigator' },
      { text: "Hands-on with plenty of tactile experiences", type: 'sensory' },
      { text: "Interactive where you can shape and improve things", type: 'manipulator' }
    ]
  },
  {
    id: 5,
    question: "When you sense something is wrong with a friend:",
    options: [
      { text: "You can see it in their body language and expressions", type: 'visualizer' },
      { text: "You feel their pain as if it were your own", type: 'empath' },
      { text: "Their voice sounds different, off-key somehow", type: 'resonator' },
      { text: "You know exactly who or what might help them", type: 'navigator' },
      { text: "You want to offer a hug or comforting touch", type: 'sensory' },
      { text: "You immediately think of ways to fix the situation", type: 'manipulator' }
    ]
  }
]

const threadSeerTypes = {
  visualizer: {
    name: "Visualizer",
    description: "You see the threads with remarkable clarity, able to distinguish between different types and trace complex patterns. Your gift lies in pattern recognition and understanding the visual language of the Weave.",
    traits: ["Exceptional pattern recognition", "Clear thread visualization", "Strong analytical abilities", "Natural understanding of thread classifications"],
    culturalConnection: "Your abilities align with Korean geometric patterns and mathematical approaches to thread weaving."
  },
  resonator: {
    name: "Resonator", 
    description: "You hear the music of the Weave—each thread has its own tone, harmony, or discord. You understand relationships through their sound and can detect changes in thread health through auditory cues.",
    traits: ["Auditory thread perception", "Harmony detection", "Emotional resonance through sound", "Musical understanding of relationships"],
    culturalConnection: "Your abilities resonate with African pattern-speaking traditions and the oral transmission of thread knowledge."
  },
  empath: {
    name: "Empath",
    description: "You feel the emotional content of threads directly, experiencing the joy, pain, love, and conflict that flows through connections. Your gift is understanding the heart of relationships.",
    traits: ["Direct emotional perception", "Deep empathy", "Relationship counseling abilities", "Emotional thread healing"],
    culturalConnection: "Your abilities align with Indian philosophical methods and meditation-based thread practices."
  },
  navigator: {
    name: "Navigator",
    description: "You can trace threads across vast distances and through time, finding connections others miss. You excel at discovering unexpected relationships and pathways through the Weave.",
    traits: ["Long-distance thread tracing", "Connection discovery", "Pathfinding abilities", "Network mapping"],
    culturalConnection: "Your abilities connect with Indigenous dreamline tracing and land-based thread practices."
  },
  manipulator: {
    name: "Manipulator",
    description: "You possess the rarest gift—the ability to strengthen, redirect, or create new threads. You can actively heal damaged connections and forge new bonds between people and places.",
    traits: ["Thread strengthening", "Connection creation", "Relationship healing", "Active thread manipulation"],
    culturalConnection: "Your abilities require integration of all cultural traditions and deep understanding of thread ethics."
  },
  sensory: {
    name: "Sensory Weaver",
    description: "Like Lyra, you experience threads through touch, texture, temperature, and full-body sensation. Your perception often develops after profound experiences and offers deep, intuitive understanding.",
    traits: ["Tactile thread perception", "Full-body awareness", "Intuitive understanding", "Deep communion with the Weave"],
    culturalConnection: "Your abilities represent evolved perception, integrating multiple cultural approaches through embodied experience."
  }
}

export default function ThreadSeerQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [result, setResult] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (type: string) => {
    const newAnswers = [...answers, type]
    setAnswers(newAnswers)

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculate result
      const typeCounts = newAnswers.reduce((acc, answer) => {
        acc[answer] = (acc[answer] || 0) + 1
        return acc
      }, {} as Record<string, number>)

      const dominantType = Object.entries(typeCounts).reduce((a, b) => 
        typeCounts[a[0]] > typeCounts[b[0]] ? a : b
      )[0]

      setResult(dominantType)
      setShowResult(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setResult(null)
    setShowResult(false)
  }

  if (showResult && result) {
    const resultType = threadSeerTypes[result as keyof typeof threadSeerTypes]

    return (
      <div className="rounded-sm border border-text-primary/15 bg-background-secondary/60 p-8 lg:p-10">
        <div className="mb-8">
          <p className="eyebrow">the weave · heard you</p>
          <div className="mt-4 inline-block border border-accent-thread/50 px-6 py-3">
            <h4 className="font-display text-xl font-normal text-accent-thread">
              {resultType.name}
            </h4>
          </div>
        </div>

        <div className="prose-dark mx-0 max-w-none space-y-6">
          <p className="text-lg leading-relaxed">
            {resultType.description}
          </p>

          <div>
            <h5 className="mb-3 font-sans text-lg font-medium text-text-primary">
              Your threads hold:
            </h5>
            <ul className="list-none space-y-2">
              {resultType.traits.map((trait, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent-knot" />
                  {trait}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-text-primary/10 pt-5">
            <h5 className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-text-secondary">
              Cultural connection
            </h5>
            <p className="text-text-body">
              {resultType.culturalConnection}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={resetQuiz}
            className="ghost-link text-text-secondary hover:text-text-primary"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Listen again
          </button>
        </div>
      </div>
    )
  }

  const question = quizQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  return (
    <div className="rounded-sm border border-text-primary/15 bg-background-secondary/60 p-8 lg:p-10">
      <div className="mb-8">
        <div className="mb-5 flex items-baseline justify-between gap-4">
          <p className="eyebrow">question {currentQuestion + 1} of {quizQuestions.length}</p>
          <span className="font-mono text-xs text-text-secondary" aria-hidden="true">
            {String(currentQuestion + 1).padStart(2, '0')}/{String(quizQuestions.length).padStart(2, '0')}
          </span>
        </div>

        <div className="relative mb-6 h-px w-full overflow-hidden bg-text-primary/10" aria-hidden="true">
          <span
            className="absolute inset-y-0 left-0 bg-accent-thread transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mb-2">
        <h4 className="mb-6 font-display text-h3 font-normal text-text-primary">
          {question.question}
        </h4>

        <div className="space-y-1">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.type)}
              className="group flex min-h-[44px] w-full items-center justify-between gap-4 border-b border-text-primary/10 py-4 text-left transition-colors duration-300 hover:bg-text-primary/[0.03]"
            >
              <span className="font-serif text-body text-text-body transition-colors group-hover:text-text-primary">
                {option.text}
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-text-secondary transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent-thread" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
