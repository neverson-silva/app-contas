import { useColorScheme } from 'nativewind'
import { Paths } from 'type-fest'

import { colors } from '@/constants/Colors'

export type ReplaceDotWithDash<T> = T extends `${infer Prefix}.${infer Suffix}`
  ? `${Prefix}-${ReplaceDotWithDash<Suffix>}`
  : T

export type ColorKey =
  | ReplaceDotWithDash<Paths<typeof colors>>
  | (string & Record<never, never>)

export const useColorByTheme = () => {
  const { colorScheme } = useColorScheme()

  const colorByTheme = (lightColor: ColorKey, darkColor: ColorKey) => {
    const selectedColor = colorScheme === 'dark' ? darkColor : lightColor
    const [colorName, shade] = selectedColor.split('-')

    // Retorna a cor do objeto `colors` de acordo com o nome e tom (ex.: `colors.blue.500`)
    return (colors as any)[colorName as any]?.[shade] || selectedColor
  }

  return colorByTheme
}
