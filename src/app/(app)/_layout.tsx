import Feather from '@expo/vector-icons/Feather'
import { Drawer } from 'expo-router/drawer'

import { colors } from '@/constants/Colors'
import { useColorByTheme } from '@/hooks/useColorByTheme'

export default function AppLayout() {
  const colorByTheme = useColorByTheme()
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: colorByTheme(
          colors.primary[200],
          colors.primary[990],
        ),
        drawerActiveBackgroundColor: colorByTheme(
          colors.primary[600],
          colors.primary[200],
        ),
        drawerInactiveBackgroundColor: colorByTheme(
          colors.primary[945],
          colors.primary[990],
        ),
        drawerInactiveTintColor: colorByTheme(
          colors.white,
          colors.primary[200],
        ),
        drawerContentStyle: {
          backgroundColor: colorByTheme(
            colors.primary[945],
            colors.primary[990],
          ),
          paddingHorizontal: 0,
          marginHorizontal: 0,
        },
        drawerItemStyle: {
          borderRadius: 6,
        },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: 'Início',
          drawerIcon: ({ color, size }) => (
            <Feather name="home" size={size - 3} color={color} />
          ),
        }}
      />
      <Drawer.Screen name="home" />
    </Drawer>
  )
}
