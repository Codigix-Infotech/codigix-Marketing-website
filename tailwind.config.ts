import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'primary-bg': '#ffffff',
        'secondary-bg': '#f8fafc',
        'primary-text': '#1a1053',
        'secondary-text': '#4b5563', 
        'primary-accent': '#382f7c', // Deep Indigo
        'secondary-accent': '#4f46e5',
        'highlight': '#e20b27', // Crimson Red
        'border': '#e5e7eb',
      },
      fontFamily: {
        sans: ["'Roboto'", "sans-serif"],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [typography],
};
export default config;
