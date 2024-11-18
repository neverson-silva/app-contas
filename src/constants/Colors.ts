import twColors from 'tailwindcss/colors'

const tintColorLight = '#2f95dc'
const tintColorDark = '#fff'

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
}

// @ts-expect-error this
delete twColors.warmGray
// @ts-expect-error this
delete twColors.lightBlue
// @ts-expect-error this
delete twColors.coolGray
// @ts-expect-error this
delete twColors.blueGray
// @ts-expect-error this
delete twColors.trueGray

export const colors = {
  ...twColors,
  primary: {
    50: '#F0EDF4',
    100: '#E8E4F0',
    200: '#D1CAE1',
    300: '#BAB0D2',
    400: '#A395C4',
    500: '#8E7AB5',
    600: '#7E69A5',
    700: '#7E69A5',
    800: '#5E4885',
    900: '#4E3775',
    945: '#2D2243',
    950: '#2B1E40',
    990: '#1A0E2C',
    995: '#0A0612',
  },
  danger: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
} as const
