import Ionicons from '@expo/vector-icons/Ionicons'
import { Redirect } from 'expo-router'
import { useShallow } from 'zustand/react/shallow'

import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { Header } from '@/components/header'
import { SafeAreaView, Text } from '@/components/ui'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/hooks/useAuthStore'
import { useColorByTheme } from '@/hooks/useColorByTheme'
import { useCommonData } from '@/hooks/useCommonData'

import { ResumoMensal } from './components/resumo-mensal'

export default function DashboardScreen() {
  const { mesAtual, alterarMesAtual } = useCommonData()
  const { user } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      logout: state.logout,
    })),
  )
  const colorByTheme = useColorByTheme()

  if (!user) {
    return <Redirect href="/(public)/sign-in" />
  }
  return (
    <SafeAreaView className="px-0">
      <Header />

      <ScrollView className="px-4">
        <ResumoMensal />

        <Text>Noansoid</Text>
      </ScrollView>
    </SafeAreaView>
  )
}
