/** @type {import('tailwindcss').Config} */

export default {

  content: [

    "./index.html",

    "./src/**/*.{js,jsx,ts,tsx}"

  ],

  theme: {

    extend: {

      colors: {

        primary: "#2563EB",

        secondary: "#0F172A",

        success: "#22C55E",

        warning: "#F59E0B",

        danger: "#EF4444",

        light: "#F8FAFC",

        dark: "#111827",

        graybg: "#F1F5F9"

      },

      fontFamily: {

        sans: ["Inter", "sans-serif"]

      },

      borderRadius: {

        xl2: "20px"

      },

      boxShadow: {

        card: "0 10px 25px rgba(0,0,0,0.08)",

        sidebar: "0 0 25px rgba(0,0,0,0.08)",

        button: "0 8px 18px rgba(37,99,235,.25)"

      }

    }

  },

  plugins: []

}