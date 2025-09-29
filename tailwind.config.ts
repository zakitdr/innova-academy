import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        innova: {
          purple: "#5C2D91",
          gold: "#F3B100"
        }
      },
      borderRadius: {
        'xl2': '1.25rem',
      },
      boxShadow: {
        soft: "0 10px 25px rgba(0,0,0,0.06)"
      }
    },
  },
  plugins: [],
};
export default config;
