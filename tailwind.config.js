/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        prussian_blue: {
          DEFAULT: '#12263a',
          100: '#04080c',
          200: '#070f17',
          300: '#0b1723',
          400: '#0e1f2f',
          500: '#12263a',
          600: '#26527d',
          700: '#3b7dbf',
          800: '#7aa8d6',
          900: '#bdd4eb'
        },
        light_blue: {
          DEFAULT: '#93b7be',
          100: '#19272a',
          200: '#324f54',
          300: '#4c767e',
          400: '#699ba5',
          500: '#93b7be',
          600: '#a8c5cb',
          700: '#bed4d8',
          800: '#d4e2e5',
          900: '#e9f1f2'
        },
        isabelline: {
          DEFAULT: '#f1f0ea',
          100: '#393626',
          200: '#726c4c',
          300: '#a59e78',
          400: '#cbc7b1',
          500: '#f1f0ea',
          600: '#f4f3ee',
          700: '#f6f6f2',
          800: '#f9f9f6',
          900: '#fcfcfb'
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
        xl: "var(--radius-xl)",
      },
      textShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.5)',
        DEFAULT: '0 2px 4px rgba(0, 0, 0, 0.5)',
        lg: '0 0 8px rgba(0, 0, 0, 0.7), 0 2px 4px rgba(0, 0, 0, 0.7)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "infinite-slider": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' }
        },
        aurora: {
          '0%': { backgroundPosition: "50% 50%, 50% 50%" },
          '25%': { backgroundPosition: "75% 25%, 25% 75%" },
          '50%': { backgroundPosition: "25% 75%, 75% 25%" },
          '75%': { backgroundPosition: "75% 25%, 25% 75%" },
          '100%': { backgroundPosition: "50% 50%, 50% 50%" }
        },
        "skew-scroll": {
          "0%": {
            transform: "translateY(0) skewY(0deg)",
          },
          "20%": {
            transform: "translateY(-20%) skewY(-10deg)",
          },
          "40%": {
            transform: "translateY(-40%) skewY(0deg)",
          },
          "60%": {
            transform: "translateY(-60%) skewY(10deg)",
          },
          "80%": {
            transform: "translateY(-80%) skewY(0deg)",
          },
          "100%": {
            transform: "translateY(-100%) skewY(-10deg)",
          },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "infinite-slider": "infinite-slider linear infinite",
        'marquee': 'marquee 15s linear infinite',
        'marquee2': 'marquee2 15s linear infinite',
        'aurora': 'aurora 15s ease-in-out infinite alternate',
        "skew-scroll": "skew-scroll 30s linear infinite",
      },
    },
  },
  plugins: [
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    },
  ],
}
