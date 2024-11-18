import React from 'react'
import clsx, { ClassValue } from 'clsx'
import dayjs from 'dayjs'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const cloneElement = <T extends React.ReactNode>(
  element: T,
  props?: any,
): T => {
  // @ts-expect-error ok for this
  return React.cloneElement(element, {
    // @ts-expect-error ok for this
    ...element.props,
    ...props,
  })
}

export const delay = async (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time))

export function chunkArray<T>(array: T[], size: number): T[][] {
  if (size <= 0) throw new Error('O tamanho do chunk deve ser maior que zero.')

  const chunks: T[][] = []

  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }

  return chunks
}

export const isSameDate = (
  date: Date | dayjs.Dayjs,
  comparedDate: Date | dayjs.Dayjs,
): boolean => {
  date = dayjs(date).format('YYYY-MM-DD') as any
  comparedDate = dayjs(comparedDate).format('YYYY-MM-DD') as any

  return date === comparedDate
}
