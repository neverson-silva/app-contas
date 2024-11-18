import { PropsWithChildren, useMemo, useState } from 'react'

import { ActivityIndicator, Pressable, PressableProps } from 'react-native'

import { colors } from '@/constants/Colors'
import { cloneElement, cn } from '@/lib/utils'

import { Text } from '../text'

import { ButtonVariants, buttonVariants, textVariants } from './variants'

export type ButtonProps = PropsWithChildren<PressableProps> &
  ButtonVariants & {
    loading?: boolean
    icon?: React.ReactNode
    rightIcon?: React.ReactNode
  }
export const Button: React.FC<ButtonProps> = ({
  children,
  size,
  variant = 'solid',
  stretch,
  loading,
  icon,
  rightIcon,
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false)

  const buttonClassNames = buttonVariants({
    size,
    variant,
    stretch,
    loading,
    disabled: props.disabled,
  })

  const textClasesNames = textVariants({
    size,
    variant,
    loading,
    disabled: props.disabled,
  })

  const iconColor = useMemo(() => {
    switch (variant) {
      case 'solid':
        return 'white'
      case 'outline':
        if (loading) {
          return colors.white
        }
        return isPressed ? colors.white : colors.primary['700']
      default:
        return 'white'
    }
  }, [variant, isPressed, loading])

  const iconSize = useMemo(() => {
    switch (size) {
      case 'sm':
        return 20
      case 'md':
        return 28
      case 'lg':
        return 36
      default:
        return 28 // Default is md size
    }
  }, [size])

  const iconLeft = useMemo(() => {
    if (!icon) {
      return null
    }

    return cloneElement(icon, {
      size: iconSize - 6,
      color: iconColor,
    })
  }, [iconSize, icon, iconColor])

  const iconRight = useMemo(() => {
    if (!rightIcon) {
      return null
    }

    return cloneElement(rightIcon, {
      size: iconSize - 6,
      color: iconColor,
    })
  }, [iconSize, rightIcon, iconColor])

  return (
    <Pressable
      {...props}
      className={cn(buttonClassNames, props.className)}
      disabled={props.disabled || loading}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      {!loading && iconLeft}
      {loading && <ActivityIndicator size={iconSize} color={iconColor} />}
      <Text className={cn(textClasesNames)}>{children}</Text>
      {!loading && iconRight}
    </Pressable>
  )
}
