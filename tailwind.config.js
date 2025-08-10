/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        header: ['"Space Grotesk"', "system-ui", "sans-serif"],
        planet: ["Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        orbit: { to: { transform: "rotate(360deg)" } },
        orbitReverse: { to: { transform: "rotate(-360deg)" } },
        twinkle: {
          "0%,100%": { opacity: 0.6 },
          "50%": { opacity: 1 },
        },
        pulseGlow: {
          "0%,100%": { boxShadow: "0 0 20px 2px rgba(99,102,241,0.4)" },
          "50%": { boxShadow: "0 0 36px 6px rgba(99,102,241,0.7)" },
        },
        floatY: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        modalIn: {
          '0%':   { opacity: 0, transform: 'scale(0.96) translateY(4px)' },
          '100%': { opacity: 1, transform: 'scale(1) translateY(0)' }
        },
        modalOut: {
          '0%':   { opacity: 1, transform: 'scale(1) translateY(0)' },
          '100%': { opacity: 0, transform: 'scale(0.96) translateY(4px)' }
        },
        backdropIn:  { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        backdropOut: { '0%': { opacity: 1 }, '100%': { opacity: 0 } },
      },
      animation: {
        orbit: "orbit linear infinite",
        orbitReverse: "orbitReverse linear infinite",
        twinkle: "twinkle 4s ease-in-out infinite",
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
        floatY: "floatY 4s ease-in-out infinite",
        modalIn: 'modalIn 180ms ease-out forwards',
        modalOut: 'modalOut 160ms ease-in forwards',
        backdropIn: 'backdropIn 180ms ease-out forwards',
        backdropOut: 'backdropOut 160ms ease-in forwards',
      },
    },
  },
  plugins: [],
  safelist: [
    "bg-sky-400",
    "bg-pink-400",
    "bg-emerald-400",
    "bg-amber-400",
    "bg-violet-400",
    "bg-orange-400",
    "bg-white",
  ],
};
