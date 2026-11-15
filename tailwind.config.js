// Tokens de movimiento: fuente única compartida con src/lib/motion.js
const { DURATION_MS, EASE_CSS, LOOP_MS, DISTANCE } = require("./src/lib/motion-tokens.js");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
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
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
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
        sans: ['Inter', 'sans-serif'],
        geist: ['Geist', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        // --- Sistema de movimiento Euskalia (solo transform/opacity) ---
        sheen: {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(100%)" },
        },
        orb: {
          "0%, 100%": { transform: "scale(0.95)", opacity: "0.85" },
          "50%": { transform: "scale(1.05)", opacity: "1" },
        },
        // Entrada de página. Terminan en `transform: none` (no translate(0)):
        // así no crean contexto para los position:fixed de dentro (modales).
        "enter-lift": {
          from: { transform: `translateY(${DISTANCE.element}px)` },
          to: { transform: "none" },
        },
        "enter-rise": {
          from: { opacity: "0", transform: `translateY(${DISTANCE.element}px)` },
          to: { opacity: "1", transform: "none" },
        },
        "enter-drop": {
          from: { opacity: "0", transform: `translateY(-${DISTANCE.element / 2}px)` },
          to: { opacity: "1", transform: "none" },
        },
        "enter-slide": {
          from: { opacity: "0", transform: `translateX(-${DISTANCE.element}px)` },
          to: { opacity: "1", transform: "none" },
        },
        "enter-block": {
          from: { opacity: "0", transform: `translateY(${DISTANCE.large}px) scale(0.96)` },
          to: { opacity: "1", transform: "none" },
        },
        "enter-block-left": {
          from: { opacity: "0", transform: `translateX(-${DISTANCE.large}px) scale(0.96)` },
          to: { opacity: "1", transform: "none" },
        },
        "enter-block-right": {
          from: { opacity: "0", transform: `translateX(${DISTANCE.large}px) scale(0.96)` },
          to: { opacity: "1", transform: "none" },
        },
        "enter-fade": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // Bucles: index.css los anula con prefers-reduced-motion
        sheen: `sheen ${LOOP_MS.sheen}ms ${EASE_CSS.state} infinite`,
        orb: `orb ${LOOP_MS.orb}ms ${EASE_CSS.state} infinite`,
        // Entrada de página (CSS → hilo del compositor; ver motion.js ENTRANCE).
        // fill-mode `backwards` (NO `both`): al terminar, la animación deja de estar
        // "en efecto" y el elemento no se queda como contexto de apilamiento
        // (atraparía los desplegables z-50 y los modales position:fixed).
        "enter-lift-slow": `enter-lift ${DURATION_MS.slow}ms ${EASE_CSS.enter} backwards`,
        "enter-lift": `enter-lift ${DURATION_MS.base}ms ${EASE_CSS.enter} backwards`,
        "enter-rise": `enter-rise ${DURATION_MS.base}ms ${EASE_CSS.enter} backwards`,
        "enter-drop": `enter-drop ${DURATION_MS.base}ms ${EASE_CSS.enter} backwards`,
        "enter-slide": `enter-slide ${DURATION_MS.base}ms ${EASE_CSS.enter} backwards`,
        "enter-fade": `enter-fade ${DURATION_MS.base}ms ${EASE_CSS.state} backwards`,
        "enter-block": `enter-block ${DURATION_MS.hero}ms ${EASE_CSS.enter} backwards`,
        "enter-block-left": `enter-block-left ${DURATION_MS.hero}ms ${EASE_CSS.enter} backwards`,
        "enter-block-right": `enter-block-right ${DURATION_MS.hero}ms ${EASE_CSS.enter} backwards`,
        "enter-fade-slow": `enter-fade ${DURATION_MS.hero}ms ${EASE_CSS.state} backwards`,
      },
      // Clases: duration-instant | -fast | -base | -slow | -hero
      transitionDuration: {
        instant: `${DURATION_MS.instant}ms`,
        fast: `${DURATION_MS.fast}ms`,
        base: `${DURATION_MS.base}ms`,
        slow: `${DURATION_MS.slow}ms`,
        hero: `${DURATION_MS.hero}ms`,
      },
      // Clases: ease-enter | ease-state
      transitionTimingFunction: {
        enter: EASE_CSS.enter,
        state: EASE_CSS.state,
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}