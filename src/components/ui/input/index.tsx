import { useMemo, useState } from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'
import { Ionicons } from '@expo/vector-icons'
import { useColorScheme } from 'nativewind'

import { TextInput, TextInputProps, View } from 'react-native'

import { Text } from '@/components/ui'
import { colors } from '@/constants/Colors'
import { cloneElement, cn } from '@/lib/utils'

import { containerVariants, InputVariantProps, inputVariants } from './variants'
export interface InputProps<T extends FieldValues>
  extends TextInputProps,
    InputVariantProps {
  containerClassName?: string
  icon?: React.ReactNode
  rightIcon?: React.ReactNode
  control: Control<T>
  name?: keyof T
  password?: boolean
  label?: string
  labelClassName?: string
  iconColor?: string
  invalidClassName?: string
}

export function Input<T extends FieldValues>({
  containerClassName,
  size,
  password,
  invalid,
  icon,
  control,
  rightIcon,
  name,
  label,
  labelClassName,
  invalidClassName,
  iconColor,
  ...props
}: Readonly<InputProps<T>>) {
  const [focused, setFocused] = useState(false)
  const [secureEntry, setSecureEntry] = useState(password)

  const iconSize = useMemo(() => {
    switch (size) {
      case 'sm':
        return 16
      case 'lg':
        return 24
      default:
        return 20
    }
  }, [size])

  const handleOnFocus = (event: any) => {
    if (props.onFocus) {
      props.onFocus(event)
    }
    setFocused(true)
  }

  const handleOnBlur = (event: any) => {
    if (props.onBlur) {
      props.onBlur(event)
    }
    setFocused(false)
  }

  const inputClasses = inputVariants({
    focused,
  })

  const isInvalid = useMemo(() => {
    // @ts-expect-error ok for this
    return invalid ?? !!control._formState.errors[name]
  }, [invalid, control._formState])

  const containerClasses = containerVariants({
    focused,
    invalid: isInvalid,
    disabled: props.editable === false || props.disabled,
  })

  const { colorScheme } = useColorScheme()

  const placeholderTextColor = useMemo(() => {
    if (iconColor) {
      return iconColor
    }
    if (colorScheme === 'dark') {
      return colors.primary[50]
    }
    return colors.primary[700]
  }, [colorScheme, iconColor])

  const secureIcon = useMemo(() => {
    if (!password) {
      return null
    }
    return (
      <Ionicons
        size={iconSize}
        name={!secureEntry ? 'eye-off-outline' : 'eye-outline'}
        color={placeholderTextColor}
        onPress={() => setSecureEntry((old) => !old)}
      />
    )
  }, [password, secureEntry, iconSize, placeholderTextColor])

  return (
    <Controller
      control={control as Control<FieldValues>}
      name={name ?? ('' as any)}
      render={({ field: { onChange, onBlur, value }, fieldState }) => (
        <>
          <View
            className={cn(
              containerClasses,
              containerClassName,
              (isInvalid || fieldState.error) && invalidClassName,
            )}
          >
            {label && (props.editable !== false || props.disabled) && (
              <Text
                className={cn(
                  'absolute -top-3 left-3 bg-white dark:bg-primary-995 px-2 ',
                  (isInvalid || fieldState.error) &&
                    'dark:text-danger-500 text-danger-400',
                  labelClassName,
                )}
              >
                {label}
              </Text>
            )}
            {icon &&
              cloneElement(icon, {
                className: 'mr-1',
                color: placeholderTextColor,
                size: iconSize,
              })}
            <TextInput
              {...props}
              className={cn(inputClasses, props.className)}
              value={value}
              onBlur={(event) => {
                handleOnBlur(event)
                onBlur()
              }}
              onFocus={handleOnFocus}
              onChangeText={onChange}
              secureTextEntry={secureEntry}
            />
            {password && secureIcon}
            {rightIcon &&
              !password &&
              cloneElement(rightIcon, {
                color: placeholderTextColor,
                size: iconSize,
              })}
          </View>
          {fieldState.error && (
            <View className="-mt-4 mb-2">
              <Text className="text-danger-400 dark:text-danger-500">
                {fieldState.error?.message ?? 'Errir'}
              </Text>
            </View>
          )}
        </>
      )}
    />
  )
}
