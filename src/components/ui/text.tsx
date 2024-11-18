import { tv, type VariantProps } from 'tailwind-variants'

import { Text as RNText, TextProps as RNTextProps } from 'react-native'

import { cn } from '@/lib/utils'

const text = tv({
  base: 'font-regular text-black dark:text-white',
  variants: {
    size: {
      base: 'text-base',
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
    },
    bold: {
      true: 'font-bold',
    },
  },
})

export type TextProps = RNTextProps & VariantProps<typeof text>

export const Text = ({ size, bold, ...props }: TextProps) => {
  const variantClasses = text({ size, bold })

  return <RNText {...props} className={cn(variantClasses, props.className)} />
}
