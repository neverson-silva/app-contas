import { Text, TextProps } from '@/components/ui'
import { cn } from '@/lib/utils'

export const AuthText: React.FC<TextProps> = ({ ...props }) => {
  return (
    <Text
      {...props}
      className={cn('text-white dark:text-white', props.className)}
    />
  )
}
