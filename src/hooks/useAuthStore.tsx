import AsyncStorage from '@react-native-async-storage/async-storage'
import dayjs from 'dayjs'
import { create } from 'zustand'

import { EStorageTokens } from '@/constants/storage-tokens'
import { Usuario } from '@/models/auth'

export enum BiometricDecision {
  NOT_ANSWERED,
  NEGATIVE,
  POSITIVE,
}

export type UseAuthStoreType = {
  user?: Usuario
  setUser: (user: Usuario) => Promise<void>
  biometricDecision: BiometricDecision
  setBiometricDecision: (biometricDecision: BiometricDecision) => Promise<void>
  isBiometricEnabled: () => Promise<boolean>
  isBiometricNotAnswered: () => Promise<boolean>
  login: (username: string, password: string) => Promise<Usuario | null>
  logout: () => Promise<void>
}

export const useAuthStore = create<UseAuthStoreType>((set, get) => ({
  user: undefined,
  setUser: async (user: Usuario) => {
    set({ user })
    await AsyncStorage.setItem(EStorageTokens.AUTH_USER, JSON.stringify(user))
  },
  biometricDecision: BiometricDecision.NOT_ANSWERED,
  setBiometricDecision: async (biometricDecision: BiometricDecision) => {
    set({ biometricDecision })
    await AsyncStorage.setItem(
      EStorageTokens.AUTH_USER_BIOMETRICS_DECISION,
      biometricDecision.toString(),
    )
  },
  isBiometricEnabled: async () => {
    const zusDecision = get()?.biometricDecision

    if (zusDecision) {
      return Number(zusDecision) === BiometricDecision.POSITIVE
    }
    const storageDecision = await AsyncStorage.getItem(
      EStorageTokens.AUTH_USER_BIOMETRICS_DECISION,
    )

    if (storageDecision) {
      set({ biometricDecision: Number(storageDecision) })
      return Number(storageDecision) === BiometricDecision.POSITIVE
    }
    return false
  },
  isBiometricNotAnswered: async () => {
    const zusDecision = get()?.biometricDecision

    if (zusDecision) {
      return Number(zusDecision) === BiometricDecision.NOT_ANSWERED
    }
    const storageDecision = await AsyncStorage.getItem(
      EStorageTokens.AUTH_USER_BIOMETRICS_DECISION,
    )

    if (storageDecision) {
      set({ biometricDecision: Number(storageDecision) })
      return Number(storageDecision) === BiometricDecision.NOT_ANSWERED
    }
    return true
  },
  login: async (username: string, password: string) => {
    const usuario = {
      id: 8,
      email: username,
      pessoa: {
        nome: 'Gohan',
        sobrenome: 'Kamehameha',
        id: 1,
        perfil: 'https://github.com/neverson-silva.png',
      },
    }

    console.log('pas', password)
    set({ user: usuario as any })

    await AsyncStorage.setItem(
      EStorageTokens.AUTH_USER,
      JSON.stringify(usuario),
    )
    await AsyncStorage.setItem(
      EStorageTokens.AUTH_EXPIRATION_DATE,
      dayjs().add(2, 'D').toISOString(),
    )
    await AsyncStorage.setItem(EStorageTokens.AUTH_USERNAME, username)

    await AsyncStorage.setItem(EStorageTokens.AUTH_TOKEN, 'TOKEN')

    return usuario
  },
  logout: async () => {
    await AsyncStorage.multiRemove([
      EStorageTokens.AUTH_USER,
      EStorageTokens.AUTH_TOKEN,
      EStorageTokens.AUTH_EXPIRATION_DATE,
    ])
    set({ user: undefined })
  },
}))
