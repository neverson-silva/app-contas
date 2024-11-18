import {
  SafeAreaView as RNSafeAreaView,
  SafeAreaViewProps,
} from 'react-native-safe-area-context'

import { cn } from '@/lib/utils'

export const SafeAreaView = (props: SafeAreaViewProps) => {
  return (
    <RNSafeAreaView
      {...props}
      className={cn(
        'px-4 bg-white dark:bg-primary-995 flex-1',
        props.className,
      )}
    />
  )
}
