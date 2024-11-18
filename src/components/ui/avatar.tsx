// import { tv, VariantProps } from 'tailwind-variants'

// import { Image } from 'react-native'

// const avatarVariants = tv({
//   base: 'border-2 border-gray-200 rounded-full',
//   variants: {
//     size: {
//       sm: 'size-12',
//       md: 'size-18',
//       lg: 'size-24',
//     },
//   },
//   defaultVariants: {
//     size: 'md',
//   },
// })
// type AvatarProps = {
//   src: string
// } & VariantProps<typeof avatarVariants>

// export const Avatar: React.FC<AvatarProps> = ({ src, size }) => {
//   const avatarClasses = avatarVariants({
//     size,
//   })
//   return <Image source={{ uri: src }} alt="avatar" className={avatarClasses} />
// }

import React, { useState } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

import { ActivityIndicator, Image, Text, View } from 'react-native'

const avatarVariants = tv({
  base: 'border-2 border-gray-200 rounded-full justify-center items-center',
  variants: {
    size: {
      sm: 'w-12 h-12 text-xs',
      md: 'w-18 h-18 text-sm',
      lg: 'w-24 h-24 text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

type AvatarProps = {
  src: string
  name?: string
} & VariantProps<typeof avatarVariants>

export const Avatar: React.FC<AvatarProps> = ({ src, name, size }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const avatarClasses = avatarVariants({ size })

  const getInitials = () => {
    if (!name) return ''
    const names = name.split(' ')
    const initials = names
      .slice(0, 2)
      .map((n) => n[0].toUpperCase())
      .join('')
    return initials
  }

  return (
    <View className={avatarClasses}>
      {isLoading && !isError && (
        <ActivityIndicator size="small" color="#999999" />
      )}
      {!isError ? (
        <Image
          source={{ uri: src }}
          onLoad={() => setIsLoading(false)}
          alt="avatar"
          onError={() => {
            setIsLoading(false)
            setIsError(true)
          }}
          style={{ width: '100%', height: '100%', borderRadius: 999 }}
        />
      ) : (
        <Text style={{ color: '#999999' }}>{getInitials()}</Text>
      )}
    </View>
  )
}
