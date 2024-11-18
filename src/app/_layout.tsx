import { useEffect } from 'react'
import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
  useFonts,
} from '@expo-google-fonts/inter'
import AsyncStorage from '@react-native-async-storage/async-storage'
import dayjs from 'dayjs'
import { router, Slot, useSegments } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'

import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { EStorageTokens } from '@/constants/storage-tokens'
import { useAuthStore } from '@/hooks/useAuthStore'

import 'dayjs/locale/pt-br'
import 'react-native-reanimated'

import '@/assets/global.css'

// Prevent the splash screen from auto-hiding before asset loading is complete.

dayjs.locale('pt-br')
export default function DefaultLayout() {
  const user = useAuthStore((state) => state.user)
  const setUser = useAuthStore((state) => state.setUser)

  SplashScreen.preventAutoHideAsync()

  const [loaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  const segments: string[] = useSegments()

  useEffect(() => {
    const publico = '(public)'

    if (user && segments.includes(publico)) {
      router.replace('/(app)')
    }
  }, [user])

  useEffect(() => {
    async function handleAuthState() {
      const user = await AsyncStorage.getItem(EStorageTokens.AUTH_USER)

      setUser(user ? JSON.parse(user) : undefined)

      if (user) {
        router.replace('/(app)')
      }
    }
    handleAuthState()
  }, [])

  if (!loaded) {
    return null
  }

  return (
    <GestureHandlerRootView>
      <Slot />
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  )
}
