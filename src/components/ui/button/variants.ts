import { tv, type VariantProps } from 'tailwind-variants'

import { cn } from '@/lib/utils'

export const buttonVariants = tv({
  base: 'flex flex-row gap-3 group rounded-md self-start justify-center items-center content-center',
  variants: {
    size: {
      sm: 'py-4 px-6',
      md: 'py-5 px-8',
      lg: 'py-6 px-10',
    },
    stretch: {
      true: 'w-full',
    },
    loading: {
      true: '',
    },
    disabled: {
      true: '',
    },
    variant: {
      solid: cn(
        'bg-primary-700 active:bg-primary-800 disabled:bg-primary-700/50',
        'dark:bg-primary-500 dark:active:bg-primary-700',
      ),
      outline: cn(
        'bg-transparent active:bg-primary-700 border-2 border-primary-700 ',
        '',
      ),
    },
  },
  compoundVariants: [
    {
      variant: 'outline',
      loading: true,
      class: 'border-0 bg-primary-300',
    },
    {
      variant: 'outline',
      disabled: true,
      class: 'border-2 border-slate-300',
    },
  ],
  defaultVariants: {
    size: 'md',
    color: 'gray',
    loading: false,
    variant: 'solid',
  },
})

export const textVariants = tv({
  base: 'font-semibold',
  variants: {
    size: {
      base: 'text-base',
      sm: 'text-md',
      md: 'text-lg',
      lg: 'text-xl',
    },
    loading: {
      true: '',
    },
    disabled: {
      true: '',
    },
    variant: {
      solid: 'text-white ',
      outline: 'text-primary-700 group-active:text-white dark:text-primary-700',
    },
    weight: {
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'solid',
  },
  compoundVariants: [
    {
      variant: 'outline',
      loading: true,
      class: 'text-white',
    },
    {
      variant: 'outline',
      disabled: true,
      class: 'text-slate-600',
    },
  ],
})

export type ButtonVariants = VariantProps<typeof buttonVariants>
