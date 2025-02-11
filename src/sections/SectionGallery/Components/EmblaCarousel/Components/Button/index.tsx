'use client'

import ArrowNext from '$/public/icons/arrow/arrowEmblaNext.svg'
import ArrowPrev from '$/public/icons/arrow/arrowEmblaPrev.svg'
import clsx from 'clsx'
import { EmblaCarouselType } from 'embla-carousel'
import React, {
  ComponentPropsWithRef,
  useCallback,
  useEffect,
  useState
} from 'react'
import $ from '../../../../style.module.scss'

export type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean
  nextBtnDisabled: boolean
  onPrevButtonClick: () => void
  onNextButtonClick: () => void
}

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
  }, [emblaApi])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  }
}

type PropType = ComponentPropsWithRef<'button'>

export const PrevButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props

  return (
    <button
      className={clsx($.embla_button, $.prev)}
      type="button"
      {...restProps}
    >
      <ArrowPrev />
      {children}
    </button>
  )
}

export const NextButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props

  return (
    <button
      className={clsx($.embla_button, $.next)}
      type="button"
      {...restProps}
    >
      <ArrowNext />
      {children}
    </button>
  )
}
