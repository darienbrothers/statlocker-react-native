/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./navigation/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: '#F7F7F9',
        card: '#FFFFFF',
        ink: {
          DEFAULT: '#1D2333',
          subtle: '#6B7280',
        },
        brand: {
          primary: '#4F46E5',
          accent: '#10B981',
        },
        accent: {
          green: '#10B981',
          blue: '#3B82F6',
          purple: '#8B5CF6',
          orange: '#F97316',
          cyan: '#06B6D4',
          red: '#EF4444',
        },
        line: '#E5E7EB',
        warn: '#F59E0B',
        danger: '#EF4444',
      },
      fontFamily: {
        sans: ['InterTight-Regular'],
        'sans-medium': ['InterTight-Medium'],
        'sans-semibold': ['InterTight-SemiBold'],
        'sans-bold': ['InterTight-Bold'],
        display: ['Outfit-SemiBold'],
        'display-bold': ['Outfit-Bold'],
      },
      fontSize: {
        'h1': ['28px', { lineHeight: '34px' }],
        'h2': ['24px', { lineHeight: '30px' }],
        'h3': ['20px', { lineHeight: '26px' }],
        'body': ['14px', { lineHeight: '20px' }],
        'body-lg': ['16px', { lineHeight: '22px' }],
        'caption': ['12px', { lineHeight: '16px' }],
        'stat': ['24px', { lineHeight: '28px' }],
      },
      borderRadius: {
        'xl': '20px',
        '2xl': '16px',
      },
      boxShadow: {
        'card': '0 4px 16px rgba(0,0,0,0.05)',
        'fab': '0 4px 12px rgba(79, 70, 229, 0.4)',
      },
    },
  },
  plugins: [],
}


