import { View, ViewProps } from 'react-native'

import { cn } from '@/lib/utils'

export const Container = (props: ViewProps) => {
  return <View {...props} className={cn(props.className, 'p-4')} />
}
