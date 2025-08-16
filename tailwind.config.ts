import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import animate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        // Night beach palette
        background: "#0B1426", // Dark night sky
        foreground: "#FFFACD", // Moonlight cream (much brighter)
        primary: "#85C1E9", // Moonlit water
        secondary: "#AED6F1", // Light blue reflection
        accent: "#F7DC6F", // Warm moonlight
        wave: "#2C3E50", // Dark ocean
        sand: "#8B7355", // Night sand
        sky: "#1B2951", // Night sky
        mist: "#D5DBDB", // Moonlit mist
      },
      animation: {
        // Ocean-inspired animations
        wave: "wave 3s ease-in-out infinite",
        ripple: "ripple 2s ease-out infinite",
        shimmer: "shimmer 4s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        drift: "drift 8s linear infinite",
        gentle: "gentle 5s ease-in-out infinite",
        breathe: "breathe 4s ease-in-out infinite",
        tide: "tide 10s ease-in-out infinite",
        glisten: "glisten 3s ease-in-out infinite",
      },
      keyframes: {
        wave: {
          "0%, 100%": { 
            transform: "translateY(0px) rotate(0deg)",
            opacity: "0.7"
          },
          "50%": { 
            transform: "translateY(-10px) rotate(2deg)",
            opacity: "1"
          },
        },
        ripple: {
          "0%": { 
            transform: "scale(1) rotate(0deg)",
            opacity: "0.8"
          },
          "50%": { 
            transform: "scale(1.1) rotate(180deg)",
            opacity: "0.4"
          },
          "100%": { 
            transform: "scale(1) rotate(360deg)",
            opacity: "0.8"
          },
        },
        shimmer: {
          "0%, 100%": { 
            backgroundPosition: "-200% 0",
            opacity: "0.3"
          },
          "50%": { 
            backgroundPosition: "200% 0",
            opacity: "0.8"
          },
        },
        float: {
          "0%, 100%": { 
            transform: "translateY(0px) translateX(0px)",
            filter: "blur(0px)"
          },
          "33%": { 
            transform: "translateY(-15px) translateX(5px)",
            filter: "blur(0.5px)"
          },
          "66%": { 
            transform: "translateY(-5px) translateX(-3px)",
            filter: "blur(0.2px)"
          },
        },
        drift: {
          "0%": { 
            transform: "translateX(-100vw) rotate(0deg)",
            opacity: "0"
          },
          "10%": { 
            opacity: "0.6"
          },
          "90%": { 
            opacity: "0.6"
          },
          "100%": { 
            transform: "translateX(100vw) rotate(10deg)",
            opacity: "0"
          },
        },
        gentle: {
          "0%, 100%": { 
            transform: "rotate(-1deg) scale(1)",
            filter: "hue-rotate(0deg)"
          },
          "50%": { 
            transform: "rotate(1deg) scale(1.02)",
            filter: "hue-rotate(10deg)"
          },
        },
        breathe: {
          "0%, 100%": { 
            transform: "scale(1)",
            opacity: "0.4"
          },
          "50%": { 
            transform: "scale(1.05)",
            opacity: "0.7"
          },
        },
        tide: {
          "0%, 100%": { 
            transform: "translateY(0px) scaleY(1)",
            opacity: "0.3"
          },
          "25%": { 
            transform: "translateY(-20px) scaleY(0.8)",
            opacity: "0.6"
          },
          "50%": { 
            transform: "translateY(-10px) scaleY(1.2)",
            opacity: "0.4"
          },
          "75%": { 
            transform: "translateY(-30px) scaleY(0.9)",
            opacity: "0.8"
          },
        },
        glisten: {
          "0%, 100%": { 
            boxShadow: "0 0 5px rgba(78, 205, 196, 0.3)",
            transform: "translateY(0px)"
          },
          "50%": { 
            boxShadow: "0 0 20px rgba(78, 205, 196, 0.8), 0 0 30px rgba(255, 230, 109, 0.4)",
            transform: "translateY(-2px)"
          },
        },
      },
      backgroundImage: {
        'ocean-gradient': 'linear-gradient(135deg, #0A1628 0%, #2E86AB 50%, #4ECDC4 100%)',
        'sunset-gradient': 'linear-gradient(45deg, #FFE66D 0%, #F18F01 50%, #FF6B6B 100%)',
        'wave-pattern': 'radial-gradient(circle at 50% 50%, rgba(78, 205, 196, 0.1) 0%, transparent 50%)',
        'shimmer-effect': 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.2) 50%, transparent 70%)',
      },
      backdropBlur: {
        'ocean': '8px',
      },
      boxShadow: {
        'ocean': '0 8px 32px rgba(78, 205, 196, 0.2)',
        'wave': '0 4px 20px rgba(46, 134, 171, 0.3)',
        'sunset': '0 6px 24px rgba(255, 230, 109, 0.4)',
        'gentle': '0 2px 12px rgba(150, 206, 180, 0.3)',
      },
    },
  },
  plugins: [animate],
};

export default config;