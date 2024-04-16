/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      sans: ["nunito", "ubuntu", "monospace"],
      mono: ["monospace"]
    },
    extend: {
      colors: {
        background: "#1C2128",
        foreground: "#22272E",
        border: "#4b5563",
        primary: "#6CB6FF",
        aodPurple: "#C678DD",
        aodBg: "#282C34",
        aodFg: "#252931"
      }
    },
  },
  plugins: [],
}

