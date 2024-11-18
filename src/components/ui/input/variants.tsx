import { tv, VariantProps } from 'tailwind-variants'

import { cn } from '@/lib/utils'

export const containerVariants = tv({
  base: 'flex flex-row border border-primary-800 dark:border-primary-300 rounded-md content-center items-center',
  variants: {
    focused: {
      true: '',
    },
    disabled: {
      true: 'border border-slate-400 bg-slate-100 dark:bg-slate-200',
    },
    invalid: {
      true: '',
    },
    size: {
      sm: 'px-2 py-3',
      md: 'px-3 py-4',
      lg: 'px-4 py-5',
    },
  },
  compoundVariants: [
    {
      focused: true,
      invalid: false,
      class: 'border-2 border-primary-900 dark:border-primary-500',
    },
    {
      invalid: true,
      class: 'border-2 border-danger-400 dark:border-danger-500',
    },
  ],
  defaultVariants: {
    size: 'md',
    focused: false,
    invalid: false,
  },
})
export const inputVariants = tv({
  base: cn(
    'font-regular flex-1 dark:placeholder:text-primary-200/60 dark:text-primary-50',
    'placeholder:text-primary-400/70 text-primary-950',
  ),
  variants: {
    focused: {
      true: '',
    },
    invalid: {
      true: '',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
})

type ContainerVariantProps = VariantProps<typeof containerVariants>

export type InputVariantProps = Omit<
  VariantProps<typeof inputVariants>,
  'focused'
> &
  Pick<ContainerVariantProps, 'size' | 'disabled'>
