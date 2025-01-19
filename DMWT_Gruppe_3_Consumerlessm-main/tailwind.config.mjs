/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        float: "float 2s infinite ease-in-out",
        floatSlow: "float 3s infinite ease-in-out",
        floatSlower: "float 4s infinite ease-in-out",
        discard: "discard 1s ease-out forwards",
        discardIphone: "discard-iphone 1s ease-out forwards",
        discardChocolate: "discard-chocolate 1s ease-out forwards",
        discardBottle: "discard-bottle 1s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
          "100%": { transform: "translateY(0)" },
        },
        discard: {
          "0%": { transform: "translateX(0) scale(1)", opacity: "1" },
          "100%": { transform: "translateX(100vw) scale(0.5)", opacity: "0" },
        },
        discardIphone: {
          "0%": { transform: "translateX(0) translateY(-338%) scale(1)", opacity: "1" },
          "100%": { transform: "translateX(100vw) translateY(28%) scale(0.5)", opacity: "0" },
        },
        discardChocolate: {
          "0%": { transform: "translateX(0) translateY(-330%) scale(1)", opacity: "1" },
          "100%": { transform: "translateX(100vw) translateY(-15%) scale(0.5)", opacity: "0" },
        },
        discardBottle: {
          "0%": { transform: "translateX(100) translateY(-400%) scale(1)", opacity: "1" },
          "100%": { transform: "translateX(100vw) translateY(30%) scale(0.5)", opacity: "0" },
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'trash-hand': ['"Trash Hand"', 'cursive'], // Trash Hand Schriftart
        'anonymous-pro': ['"Anonymous Pro"', 'monospace'], // Anonymous Pro Schriftart
      },
    },
  },
  plugins: [],
};
