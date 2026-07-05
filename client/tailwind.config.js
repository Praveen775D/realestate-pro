/** @type {import('tailwindcss').Config} */

export default {

  content: [

    "./index.html",

    "./src/**/*.{js,jsx}",

  ],

  theme: {

    extend: {

      colors: {

        primary: "#2563eb",

        secondary: "#0f172a",

        accent: "#f97316",

      },

      fontFamily: {

        sans: ["Inter", "sans-serif"],

      },

    },

  },

  plugins: [],

}