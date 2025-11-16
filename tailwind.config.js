/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}",
   "./components/**/*.{js,jsx,ts,tsx}",
   "./libs/**/*.{js,jsx,ts,tsx}",
 ],
 presets: [require("nativewind/preset")],
 theme: {
   extend: {
    colors: {
      // Light mode
      primary: "#1A73E8",
      "primary-light": "#4D9FF5",
      "primary-dark": "#0F5AC4",

      accent: "#2ECC71",
      "accent-light": "#58D68D",
      "accent-dark": "#239B56",

      background: "#F7F9FC",
      foreground: "#0F172A",

      card: "#FFFFFF",
      border: "#E2E8F0",
      muted: "#94A3B8",

      // Dark mode
      dark: {
        primary: "#8AB4F8",
        "primary-light": "#AFCBFF",
        "primary-dark": "#5C8DE0",

        accent: "#5CD68A",
        "accent-light": "#7DEFA8",
        "accent-dark": "#35A463",

        background: "#0D1117",
        foreground: "#E5E7EB",

        card: "#161B22",
        border: "#2D333B",
        muted: "#6B7280",
      },
    },
    
   },
 },
 plugins: [],
}

