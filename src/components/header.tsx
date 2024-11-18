import AntDesign from '@expo/vector-icons/AntDesign'
import { DrawerToggleButton } from '@react-navigation/drawer'

import { View } from 'react-native'

import { colors } from '@/constants/Colors'
import { useAuthStore } from '@/hooks/useAuthStore'
import { useColorByTheme } from '@/hooks/useColorByTheme'

import { Avatar } from './ui/avatar'
import { Text } from './ui'
export const Header = () => {
  const colorByTheme = useColorByTheme()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  return (
    <View className="flex flex-row content-center items-center px-4 py-2">
      <Avatar size="sm" src={user!.pessoa!.perfil!} />
      <View className="ml-3 flex gap-0">
        <Text>Olá, </Text>
        <Text bold size="xl" className="-mt-1">
          {user?.pessoa?.nome}
        </Text>
      </View>
      <View className="flex-1 flex-row justify-end items-center bg-white dark:bg-primary-995 ">
        <AntDesign
          name="logout"
          size={21}
          color={colorByTheme(colors.gray[600], colors.white)}
          onPress={() => logout()}
        />
        <DrawerToggleButton
          tintColor={colorByTheme(colors.gray[700], colors.white)}
        />
      </View>
    </View>
  )
}
