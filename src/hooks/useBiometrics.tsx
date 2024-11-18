import AsyncStorage from '@react-native-async-storage/async-storage'
import * as LocalAuthentication from 'expo-local-authentication'

import { EStorageTokens } from '@/constants/storage-tokens'

import { useAuthStore } from './useAuthStore'
export const useBiometrics = () => {
  const loginApi = useAuthStore((state) => state.login)

  const isCompatible = async () => {
    return LocalAuthentication.hasHardwareAsync()
  }

  const isEnrolled = async () => {
    return LocalAuthentication.isEnrolledAsync()
  }

  const supportedAuthentications = async () =>
    await LocalAuthentication.supportedAuthenticationTypesAsync()

  const cancelAuthentication = async () =>
    await LocalAuthentication.cancelAuthenticate()

  const authenticate = async (
    options?: LocalAuthentication.LocalAuthenticationOptions,
    user?: { username: string; password: string },
  ) => {
    const result = await LocalAuthentication.authenticateAsync(options)

    const username =
      user?.username ??
      (await AsyncStorage.getItem(EStorageTokens.AUTH_USERNAME))
    const password =
      user?.password ??
      (await AsyncStorage.getItem(EStorageTokens.AUTH_USER_PASSWORD))

    if (result) {
      await loginApi(username ?? '', password ?? '')
    }

    return result.success
  }

  const isAvailable = async () => (await isCompatible()) && (await isEnrolled())

  return {
    isCompatible,
    isEnrolled,
    supportedAuthentications,
    cancelAuthentication,
    authenticate,
    isAvailable,
  }
}
