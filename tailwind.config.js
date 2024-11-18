import { colors } from './src/constants/Colors'

/** @type {import('tailwindcss').Config} */
export const content = [
  './src/app/**/*.{js,jsx,ts,tsx}',
  './src/components/**/*.{js,jsx,ts,tsx}',
]
export const presets = [require('nativewind/preset')]
export const theme = {
  extend: {
    fontFamily: {
      light: 'Inter_300Light',
      regular: 'Inter_400Regular',
      semibold: 'Inter_600SemiBold',
      bold: 'Inter_700Bold',
      'extra-bold': 'Inter_800ExtraBold',
    },
    colors,
  },
}
export const plugins = []
