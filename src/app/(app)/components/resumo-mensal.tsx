import { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'

import { View } from 'react-native'

import { MonthCalendar } from '@/components/month-calendar'
import { Text } from '@/components/ui'
import { useColorByTheme } from '@/hooks/useColorByTheme'
import { useCommonData } from '@/hooks/useCommonData'

export const ResumoMensal = () => {
  const { mesAtual, alterarMesAtual } = useCommonData()
  const colorByTheme = useColorByTheme()

  const [isOpenCalendar, setIsOpenCalndar] = useState(false)
  return (
    <View className="flex flex-row content-center items-center gap-2">
      <Text>
        Resumo de{' '}
        <Text bold>{mesAtual.locale('pt-br').format('MMMM [de] YYYY')}</Text>
      </Text>
      <Ionicons
        name="chevron-down-circle"
        size={18}
        color={colorByTheme('slate-700', 'pink-200')}
        onPress={() => {
          //   const mesAleatorio = Math.floor(Math.random() * 12)
          //   alterarMesAtual(mesAleatorio)
          setIsOpenCalndar((old) => !old)
        }}
      />
      <MonthCalendar
        currentMonth={mesAtual}
        isOpen={isOpenCalendar}
        onMonthChange={(month) => {
          alterarMesAtual(month)
          setIsOpenCalndar(false)
        }}
      />
    </View>
  )
}
