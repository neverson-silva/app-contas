import { useEffect } from 'react'
import dayjs from 'dayjs'
import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

import { Pessoa } from '@/models/auth'
import { FormaPagamento } from '@/models/forma-pagamento'

type MesesData = {
  meses: dayjs.Dayjs[]
  mesAtual: dayjs.Dayjs
  setMeses: (meses: dayjs.Dayjs[]) => void
  alterarMesAtual: (mes: dayjs.Dayjs | number) => void
}

type UseCommonDataStoreType = {
  pessoas: Pessoa[]
  setPessoas: (pessoas: Pessoa[]) => void
  formasPagamento: FormaPagamento[]
  setFormasPagamento: (formasPagamento: FormaPagamento[]) => void
} & MesesData

const useCommonDataStore = create<UseCommonDataStoreType>((set) => ({
  pessoas: [],
  setPessoas: (pessoas) => set({ pessoas }),
  formasPagamento: [],
  setFormasPagamento: (formasPagamento) => set({ formasPagamento }),
  meses: [],
  setMeses: (meses: dayjs.Dayjs[]) => set({ meses }),
  mesAtual: dayjs(),
  alterarMesAtual: (mes: dayjs.Dayjs | number) => {
    if (typeof mes === 'number') {
      set({ mesAtual: dayjs().month(mes - 1) })
    } else {
      set({ mesAtual: mes })
    }
  },
}))

export const useCommonData = () => {
  const fromStore: UseCommonDataStoreType = useCommonDataStore(
    useShallow((state: UseCommonDataStoreType) => ({
      meses: state.meses,
      pessoas: state.pessoas,
      formasPagamento: state.formasPagamento,
      alterarMesAtual: state.alterarMesAtual,
      mesAtual: state.mesAtual,
      setMeses: state.setMeses,
      setPessoas: state.setPessoas,
      setFormasPagamento: state.setFormasPagamento,
    })),
  )

  useEffect(() => {
    if (!fromStore.mesAtual) {
      fromStore.alterarMesAtual(dayjs())
    }
    if (!fromStore.meses.length) {
      fromStore.setMeses(
        new Array(12).map((month) => dayjs(`${dayjs().year}-${month}-01`)),
      )
    }
  }, [])

  return fromStore
}
