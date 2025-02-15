'use client'

import { DUR } from '@/animations/vars'
import { ScrollToParams } from '@studio-freight/react-lenis/types'
import clsx from 'clsx'
import React, { ReactNode, createContext, memo, useState } from 'react'
import $ from '../style.module.scss'
export interface AccordionContextProps {
  openIndexes: number[]
  toggleItem: (_index: number) => void
  lenisScroll?: boolean
  lenisScrollOptions?: ScrollToParams
}

export const AccordionContext = createContext<
  AccordionContextProps | undefined
>(undefined)

export interface AccordionProps {
  allowMultiple?: boolean
  className?: string
  children: ReactNode
  lenis?: boolean
  lenisOptions?: ScrollToParams
  defaultOpenIndexes?: number[] // New prop
}

const Accordion: React.FC<AccordionProps> = ({
  allowMultiple = false,
  children,
  lenis = false,
  className,
  lenisOptions = { duration: DUR.goldenRatio * 2 },
  defaultOpenIndexes = [] // Default to an empty array
}) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>(defaultOpenIndexes)
  const [lenisScroll, _setLenisScroll] = useState<boolean>(lenis)
  const [lenisScrollOptions, _setLenisScrollOptions] =
    useState<ScrollToParams>(lenisOptions)

  const toggleItem = (index: number) => {
    setOpenIndexes((prevOpenIndexes) => {
      if (allowMultiple) {
        if (prevOpenIndexes.includes(index)) {
          return prevOpenIndexes.filter((i) => i !== index)
        } else {
          return [...prevOpenIndexes, index]
        }
      } else {
        if (prevOpenIndexes.includes(index)) {
          return []
        } else {
          return [index]
        }
      }
    })
  }

  return (
    <AccordionContext.Provider
      value={{ openIndexes, toggleItem, lenisScroll, lenisScrollOptions }}
    >
      <div className={clsx($.accordion, className)}>{children}</div>
    </AccordionContext.Provider>
  )
}

export default memo(Accordion)
