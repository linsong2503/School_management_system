// /* eslint-disable @typescript-eslint/no-explicit-any */
// import type { Config } from "tailwindcss";
// import { createThemes } from "tw-colors";
// import colors from "tailwindcss/colors";

// const baseColors = [
//   "gray",
//   "red",
//   "yellow",
//   "green",
//   "blue",
//   "indigo",
//   "purple",
//   "pink",
// ];

// const shadeMapping = {
//   "50": "900",
//   "100": "800",
//   "200": "700",
//   "300": "600",
//   "400": "500",
//   "500": "400",
//   "600": "300",
//   "700": "200",
//   "800": "100",
//   "900": "50",
// };

// const generateThemeObject = (colors: any, mapping: any, invert = false) => {
//   const theme: any = {};
//   baseColors.forEach((color) => {
//     theme[color] = {};
//     Object.entries(mapping).forEach(([key, value]: any) => {
//       const shadeKey = invert ? value : key;
//       theme[color][key] = colors[color][shadeKey];
//     });
//   });
//   return theme;
// };

// const lightTheme = generateThemeObject(colors, shadeMapping, true);
// const darkTheme = generateThemeObject(colors, shadeMapping, true);

// const themes = {
//   light: {
//     ...lightTheme,
//     white: "#ffffff",
//   },
//   dark: {
//     ...darkTheme,
//     white: colors.gray["950"],
//     black: colors.gray["50"],
//   },
// };

// const config: Config = {
//   darkMode: "class",
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       backgroundImage: {
//         "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
//         "gradient-conic":
//           "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
//       },
//       opacity: {
//         "15": "0.15",
//         "35": "0.35",
//         "50": "0.5",
//         "65": "0.65",
//       },
//     },
//   },
//   plugins: [createThemes(themes)],
// };

// export default config;

module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        gray: {
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          500: "#6b7280",
          700: "#374151",
          800: "#1f2937",
        },
        blue: {
          200: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
        },
        "dark-bg": "#101214",
        "dark-secondary": "#1d1f21",
        "dark-tertiary": "#3b3d40",
        "blue-primary": "#0275ff",
        "stroke-dark": "#2d3135",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      opacity: {
         '10': '0.1',
         '20': '0.2',
         '95': '0.95',
        }
    },
  },
  plugins: [],
};
