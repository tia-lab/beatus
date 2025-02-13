'use client'

import clsx from 'clsx'
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel, { EmblaViewportRefType } from 'embla-carousel-react'
import React, { memo } from 'react'
import { NextButton, PrevButton, usePrevNextButtons } from './Components/Button'
import { DotButton, useDotButton } from './Components/Dots'
import $ from './style.module.scss'

export type EmblaCarouselProps = {
  slides: React.ReactNode
  containerClassName?: string
  emblaClassName?: string
  options?: EmblaOptionsType
  useButtons?: boolean
  useDots?: boolean
  tweenFactor?: number
  customEmblaApi?: EmblaCarouselType | null // Parent can pass API
  customEmblaRef?: EmblaViewportRefType // Parent can pass Ref
}

const EmblaCarousel: React.FC<EmblaCarouselProps> = (props) => {
  const {
    slides,
    options,
    useButtons,
    useDots,
    containerClassName,
    emblaClassName,
    customEmblaApi,
    customEmblaRef
  } = props

  // Use the custom API if provided, otherwise create a new one
  const [defaultEmblaRef, defaultEmblaApi] = useEmblaCarousel(options)
  const emblaRef = customEmblaRef || defaultEmblaRef
  const emblaApi = customEmblaApi || defaultEmblaApi

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return (
    <>
      <div
        className={clsx(
          $.embla_viewport,
          emblaClassName,
          useButtons && $.is_buttons
        )}
        ref={emblaRef}
      >
        <div className={clsx($.embla_container, containerClassName)}>
          {slides}
        </div>
      </div>

      {(useButtons || useDots) && (
        <div className={$.controls}>
          {useButtons && (
            <div className={$.buttons}>
              <PrevButton
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
              />
              <NextButton
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
              />
            </div>
          )}

          {useDots && (
            <div className="embla__dots">
              {scrollSnaps.map((_, index) => (
                <DotButton
                  key={index}
                  onClick={() => onDotButtonClick(index)}
                  className={'embla__dot'.concat(
                    index === selectedIndex ? ' embla__dot--selected' : ''
                  )}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default memo(EmblaCarousel)
