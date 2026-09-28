/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Thread Seers palette (DESIGN.md §2) — one warm-gray family, one accent
        background: {
          primary: "#0A0A0C",
          secondary: "#101014",
        },
        text: {
          primary: "#F2EFE6",
          body: "#E3DFD2",
          secondary: "#8E8C86",
          muted: "#6B695F",
        },
        accent: {
          thread: "#C6A15B",
          "thread-deep": "#9A7A3E",
          silver: "#C0C0C0",
          memory: "#7FA6C9",
          knot: "#B34434",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'hero': ['clamp(3rem, 7vw, 4.75rem)', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
        'h1': ['clamp(2.4rem, 5vw, 3.2rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'h2': ['clamp(1.9rem, 4vw, 2.75rem)', { lineHeight: '1.2' }],
        'h3': ['clamp(1.4rem, 3vw, 1.9rem)', { lineHeight: '1.35' }],
        'body': ['clamp(1.05rem, 2.5vw, 1.2rem)', { lineHeight: '1.7' }],
        'caption': ['clamp(0.85rem, 2vw, 0.95rem)', { lineHeight: '1.5' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        'reading': '65ch',
        'prose': '60ch',
        'canvas': '1400px',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "2px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "thread-breathe": {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "1" },
        },
        "thread-drift": {
          "0%": { transform: "translateX(-30%)", opacity: "0" },
          "15%": { opacity: "1" },
          "85%": { opacity: "1" },
          "100%": { transform: "translateX(240%)", opacity: "0" },
        },
        "thread-shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "reveal-rise": {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "thread-breathe": "thread-breathe 4s ease-in-out infinite",
        "thread-drift": "thread-drift 7s ease-in-out infinite",
        "thread-shimmer": "thread-shimmer 3.2s ease-in-out infinite",
        "reveal-rise": "reveal-rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
}
