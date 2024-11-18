import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'


import { SafeAreaView } from '@/components/ui'

export default function PublicLayout() {
  return (
      <SafeAreaView className="flex content-center items-center flex-1 bg-primary-950">
        <StatusBar style="light" />
        <Slot />
      </SafeAreaView>
  )
}
