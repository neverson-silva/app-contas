import { useCallback, useEffect, useState } from 'react'
import Entypo from '@expo/vector-icons/Entypo'
import dayjs from 'dayjs'

import {
  Modal,
  Pressable,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useColorByTheme } from '@/hooks/useColorByTheme'
import { chunkArray, cn, isSameDate } from '@/lib/utils'

import { Text } from './ui'

type MonthCalendarProps = {
  isOpen: boolean
  currentMonth: dayjs.Dayjs
  onMonthChange: (month: dayjs.Dayjs) => void
  onYearChange?: (year: dayjs.Dayjs) => void
}
export const MonthCalendar: React.FC<MonthCalendarProps> = ({
  currentMonth = dayjs(),
  onMonthChange,
  onYearChange,
  isOpen = false,
}) => {
  const [selectedMonth, setSelectedMonth] = useState(
    dayjs(`${currentMonth.year()}-${currentMonth.month() + 1}-01`),
  )

  const [currentYear, setCurrentYear] = useState(selectedMonth.year())

  const handeOnChangeYear = (year) => {
    setCurrentYear(year)
    if (onYearChange) {
      onYearChange(dayjs(`${year}-${currentMonth.month() + 1}-01`))
    }
  }

  const colorByTheme = useColorByTheme()

  const handleOnChangeMonth = (date: dayjs.Dayjs) => {
    onMonthChange(date)
    // setSelectedMonth(date)
    // setCurrentYear(date.year())
  }

  const renderMonths = useCallback(() => {
    const months = []
    for (let index = 0; index < 12; index++) {
      months.push(dayjs(`${currentYear}-${index + 1}-01`))
    }

    return chunkArray(months, 3).map((months, indx) => {
      return (
        <View
          key={`line-${indx}`}
          className="flex-1 p-2 flex-row w-full  justify-between"
        >
          {months.map((month, ind) => {
            const isSelected = isSameDate(month, selectedMonth)
            return (
              <Pressable
                onPress={() => handleOnChangeMonth(month)}
                key={`item-${ind}`}
                className={cn(
                  `
                 group flex items-center content-center justify-center
                 rounded-full w-16 active:bg-primary-300`,
                  isSelected && 'bg-primary-800 dark:bg-primary-300',
                )}
              >
                <Text
                  className={cn(
                    `group-active:text-primar-800`,
                    isSelected && 'text-white',
                  )}
                >
                  {month.locale('pt-br').format('MMM')}
                </Text>
              </Pressable>
            )
          })}
        </View>
      )
    })
  }, [selectedMonth, currentYear])

  useEffect(() => {
    setSelectedMonth(
      dayjs(`${currentMonth.year()}-${currentMonth.month() + 1}-01`),
    )
  }, [currentMonth])
  return (
    <SafeAreaView className="flex flex-1 content-center justify-center items-center">
      <Modal
        animationType="slide"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => {
          onMonthChange(selectedMonth)
        }}
      >
        <View className="flex flex-1 justify-center items-center content-center">
          <View
            className="p-4 bg-white dark:bg-primary-990  rounded-2xl items-center size-80"
            style={{
              shadowColor: colorByTheme('#000', 'primary-100'),
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <View className="flex flex-row justify-between content-center items-center w-full">
              <Pressable
                onPress={() => {
                  handeOnChangeYear(currentYear - 1)
                }}
                className="flex items-center content-center justify-center  rounded-full w-9 active:bg-primary-300"
              >
                <Entypo
                  name="chevron-thin-left"
                  className="text-yellow-400 "
                  size={24}
                  color={colorByTheme('black', 'white')}
                />
              </Pressable>
              <Text bold size="lg">
                {currentYear}
              </Text>

              <Pressable
                onPress={() => {
                  handeOnChangeYear(currentYear + 1)
                }}
                className="flex items-center content-center justify-center  rounded-full w-9 active:bg-primary-300"
              >
                <Entypo
                  name="chevron-thin-right"
                  className="text-yellow-400 flex-1 text-center"
                  size={24}
                  color={colorByTheme('black', 'white')}
                />
              </Pressable>
            </View>
            {renderMonths()}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}
