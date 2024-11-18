import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import Ionicons from '@expo/vector-icons/Ionicons'
import BottomSheet, {
  BottomSheetView,
  useBottomSheetSpringConfigs,
} from '@gorhom/bottom-sheet'
import { zodResolver } from '@hookform/resolvers/zod'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import { MotiView } from 'moti'
import { z } from 'zod'
import { useShallow } from 'zustand/react/shallow'

import { Keyboard, Platform, View } from 'react-native'

import { Text } from '@/components/ui'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { colors } from '@/constants/Colors'
import { EStorageTokens } from '@/constants/storage-tokens'
import { BiometricDecision, useAuthStore } from '@/hooks/useAuthStore'
import { useBiometrics } from '@/hooks/useBiometrics'
import { delay } from '@/lib/utils'

import { AuthText } from './components/text'
const loginUserFormSchema = z.object({
  username: z.string().email('Informe um email válido'),
  password: z.string().nonempty('Senha não informada.'),
})

type LoginUserFormSchemaType = z.infer<typeof loginUserFormSchema>

export default function SignIn() {
  const biometrics = useBiometrics()
  const bottomSheetRef = useRef<BottomSheet>(null)

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])

  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
  })

  const {
    isBiometricNotAnswered,
    setBiometricDecision,
    login,
    isBiometricEnabled,
  } = useAuthStore(
    useShallow((state) => ({
      isBiometricEnabled: state.isBiometricEnabled,
      isBiometricNotAnswered: state.isBiometricNotAnswered,
      setBiometricDecision: state.setBiometricDecision,
      login: state.login,
    })),
  )
  const { control, handleSubmit, formState, setValue } =
    useForm<LoginUserFormSchemaType>({
      defaultValues: {
        username: '',
        password: '',
      },
      resolver: zodResolver(loginUserFormSchema),
    })

  const inputClasses = {
    labelClassName: 'bg-primary-950 text-white',
    containerClassNam: 'border-primary-400',
    className: 'text-primary-200',
    invalidClassNam: 'border-danger-400',
  }

  const handleBiometricLogin = async (data?: LoginUserFormSchemaType) => {
    await biometrics.authenticate(
      {
        requireConfirmation: true,
        fallbackLabel: 'Usar padrão',
        cancelLabel: 'Cancelar',
        promptMessage:
          Platform.OS === 'android'
            ? 'Toque no sensor para acessar sua conta'
            : undefined,
      },
      data,
    )
  }

  const [formValues, setFormValues] = useState<LoginUserFormSchemaType | null>(
    null,
  )

  const handleUsingBiometric = async () => {
    bottomSheetRef.current?.close()
    await setBiometricDecision(BiometricDecision.POSITIVE)
    await handleBiometricLogin(formValues!)
    router.replace('/(app)')
  }

  const handleDontUseBiometric = async (data: LoginUserFormSchemaType) => {
    Keyboard.dismiss()
    bottomSheetRef.current?.close()
    setFormValues(null)
    await setBiometricDecision(BiometricDecision.NEGATIVE)
    await login(data.username, data.password)
    router.replace('/(app)')
  }

  const onSubmit = async (data: LoginUserFormSchemaType) => {
    Keyboard.dismiss()
    setFormValues(data as any)
    if ((await isBiometricNotAnswered()) && (await biometrics.isAvailable())) {
      bottomSheetRef?.current?.expand()
    } else {
      await delay(1000)
      await login(data.username, data.password)
      router.replace('/(app)')
    }
  }

  const snapPoints = useMemo(() => ['25%', '40%'], [])

  useEffect(() => {
    async function handleStartBiometric() {
      const decision = await isBiometricEnabled()
      const username =
        (await AsyncStorage.getItem(EStorageTokens.AUTH_USERNAME)) ?? ''

      setValue('username', username)

      if (decision && !!username) {
        const password =
          (await AsyncStorage.getItem(EStorageTokens.AUTH_USER_PASSWORD)) ?? ''

        if (!password) {
          return
        }

        await handleBiometricLogin({ password, username })
        router.replace('/(app)')
      }
    }
    handleStartBiometric()
  }, [])

  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        animationConfigs={animationConfigs}
        index={-1} // Começa fechado
        snapPoints={snapPoints}
        detached
        bottomInset={46}
        style={{
          marginHorizontal: 2,
        }}
      >
        <BottomSheetView className="flex justify-center text-center items-center gap-4 mt-3 px-4 relative ">
          <Text size="2xl" bold className="text-center dark:text-black">
            Gostaria de utilizar{' '}
            {Platform.OS === 'ios' ? 'o Face ID' : 'a digital cadastrada'} para
            continuar?
          </Text>
          <Text className="dark:text-black">
            {Platform.OS === 'ios'
              ? 'Utilize o Face ID para um acesso rápido e seguro.'
              : 'Utilize sua impressão digital para um acesso rápido e seguro.'}
          </Text>

          <View className="w-full flex gap-3 mt-20">
            <Button
              stretch
              onPress={async () => {
                handleUsingBiometric()
              }}
            >
              Sim
            </Button>
            <Button
              stretch
              onPress={handleSubmit(handleDontUseBiometric)}
              variant="outline"
            >
              {' '}
              Deixar para depois
            </Button>
          </View>
        </BottomSheetView>
      </BottomSheet>
      <View className="px-2 mt-44 flex-1 w-full">
        <MotiView
          from={{
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            type: 'spring',
          }}
        >
          <View className="flex justify-center flex-row gap-4">
            <Ionicons name="wallet-outline" size={34} color="white" />
            <AuthText size="4xl" bold>
              Orçamento Simples
            </AuthText>
          </View>
          <AuthText className="text-center">
            Seu novo gestor de contas pessoais
          </AuthText>
        </MotiView>

        <View className="flex gap-7 mt-16">
          <Input
            control={control}
            name="username"
            label="Email"
            placeholder="seu@email.com"
            {...inputClasses}
            disabled={formState.isSubmitting}
          />
          <Input
            control={control}
            name="password"
            label="Senha"
            password
            placeholder="********************"
            iconColor={colors.primary['400']}
            {...inputClasses}
            disabled={formState.isSubmitting}
          />
        </View>
        <View className="mt-8">
          <Button
            stretch
            onPress={handleSubmit(onSubmit)}
            loading={formState.isSubmitting}
          >
            Entrar
          </Button>
        </View>
      </View>
    </>
  )
}
