module.exports = {
  purge: {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    safelist: [
      'focus:ring-offset-indigo-600',
      'lg:border-indigo-400',
      'hover:bg-indigo-500',
      'bg-indigo-100',
      'bg-indigo-500',
      'bg-indigo-600',
      'bg-indigo-700',
      'border-indigo-300',
      'border-indigo-700',
      'text-indigo-200',
      'text-indigo-300',
      'text-indigo-400',
      'text-indigo-500',
      'text-indigo-600',
      'text-indigo-700',
      'text-indigo-800',
      'focus:ring-offset-green-600',
      'lg:border-green-400',
      'hover:bg-green-500',
      'bg-green-100',
      'bg-green-500',
      'bg-green-600',
      'bg-green-700',
      'border-green-300',
      'border-green-700',
      'text-green-200',
      'text-green-300',
      'text-green-400',
      'text-green-500',
      'text-green-600',
      'text-green-700',
      'text-green-800',
      'focus:ring-offset-yellow-600',
      'lg:border-yellow-400',
      'hover:bg-yellow-500',
      'bg-yellow-100',
      'bg-yellow-500',
      'bg-yellow-600',
      'bg-yellow-700',
      'border-yellow-300',
      'border-yellow-700',
      'text-yellow-200',
      'text-yellow-300',
      'text-yellow-400',
      'text-yellow-500',
      'text-yellow-600',
      'text-yellow-700',
      'text-yellow-800',
      'focus:ring-offset-gray-600',
      'lg:border-gray-400',
      'hover:bg-gray-500',
      'bg-gray-100',
      'bg-gray-500',
      'bg-gray-600',
      'bg-gray-700',
      'border-gray-300',
      'border-gray-700',
      'text-gray-200',
      'text-gray-300',
      'text-gray-400',
      'text-gray-500',
      'text-gray-600',
      'text-gray-700',
      'text-gray-800',
      'focus:ring-offset-red-600',
      'lg:border-red-400',
      'hover:bg-red-500',
      'bg-red-100',
      'bg-red-500',
      'bg-red-600',
      'bg-red-700',
      'border-red-300',
      'border-red-700',
      'text-red-200',
      'text-red-300',
      'text-red-400',
      'text-red-500',
      'text-red-600',
      'text-red-700',
      'text-red-800',
    ],
  },
  darkMode: false,
  theme: {},
  variants: {
    extend: {
      opacity: ['disabled'],
      backgroundColor: ['hover'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
