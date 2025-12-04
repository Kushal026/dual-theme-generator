import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // EduPath brand colors
        edu: {
          blue: {
            DEFAULT: "hsl(var(--edu-blue))",
            light: "hsl(var(--edu-blue-light))",
            dark: "hsl(var(--edu-blue-dark))",
          },
          green: {
            DEFAULT: "hsl(var(--edu-green))",
            light: "hsl(var(--edu-green-light))",
            dark: "hsl(var(--edu-green-dark))",
          },
          purple: {
            DEFAULT: "hsl(var(--edu-purple))",
            light: "hsl(var(--edu-purple-light))",
            dark: "hsl(var(--edu-purple-dark))",
          },
          orange: {
            DEFAULT: "hsl(var(--edu-orange))",
            light: "hsl(var(--edu-orange-light))",
            dark: "hsl(var(--edu-orange-dark))",
          },
          red: {
            DEFAULT: "hsl(var(--edu-red))",
            light: "hsl(var(--edu-red-light))",
            dark: "hsl(var(--edu-red-dark))",
          },
          indigo: {
            DEFAULT: "hsl(var(--edu-indigo))",
            light: "hsl(var(--edu-indigo-light))",
            dark: "hsl(var(--edu-indigo-dark))",
          },
          teal: {
            DEFAULT: "hsl(var(--edu-teal))",
            light: "hsl(var(--edu-teal-light))",
          },
          yellow: {
            DEFAULT: "hsl(var(--edu-yellow))",
            light: "hsl(var(--edu-yellow-light))",
          },
          pink: {
            DEFAULT: "hsl(var(--edu-pink))",
            light: "hsl(var(--edu-pink-light))",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          from: { opacity: "0", transform: "translateX(-10px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(var(--edu-blue) / 0.2)" },
          "50%": { boxShadow: "0 0 30px hsl(var(--edu-blue) / 0.4)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
      boxShadow: {
        'elevated': '0 10px 15px -3px hsl(var(--foreground) / 0.1), 0 4px 6px -4px hsl(var(--foreground) / 0.1)',
        'glow': '0 0 20px hsl(var(--edu-blue) / 0.3)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
