/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5", // Indigo for buttons and accents
        secondary: "#10B981", // Emerald for success states
        background: "#F9FAFB", // Light gray for background
        card: "#FFFFFF", // White for cards
        textPrimary: "#1F2937", // Dark gray for primary text
        textSecondary: "#6B7280", // Medium gray for secondary text
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};