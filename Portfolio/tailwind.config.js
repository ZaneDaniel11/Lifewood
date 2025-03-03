module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "header-yellow": "#ACEA11",
        "body-yellow": "#ACEA11",
        "custom-red": "#ED3B23",
      },
     fontFamily: {
        kanit: ["Kanit", "sans-serif"],
        kreon: ["Kreon", "sans-serif"],
      },

      keyframes: {
        scroll: {
          to: {
            transform: "translateX(calc(-100% - 20px))",
          },
        },
      },
      animation: {
        scroll: "scroll 20s linear infinite",
      },
    },
  },
  plugins: [],
};
