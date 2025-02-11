'use client'

import { Image } from '@/components/Core'
import clsx from 'clsx'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'

import React, { memo } from 'react'
import $ from '../../style.module.scss'
import { NextButton, PrevButton, usePrevNextButtons } from './Components/Button'
import { DotButton, useDotButton } from './Components/Dots'

export type EmblaCarouselProps = {
  data: {
    media: { image: any }[] // Adjust type based on your data
  }
  containerClassName?: string
  emblaClassName?: string
  options?: EmblaOptionsType
  useButtons?: boolean
  useDots?: boolean
  tweenFactor?: number
}

const EmblaCarousel: React.FC<EmblaCarouselProps> = ({
  data,
  options = { align: 'center' },
  useButtons = true,
  useDots = false,
  containerClassName,
  emblaClassName
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return (
    <div
      className={clsx(
        $.embla_viewport,
        emblaClassName,
        useButtons && $.is_buttons
      )}
      ref={emblaRef}
    >
      <div className={clsx($.embla_container, containerClassName)}>
        {data.media.map(
          (media, index) =>
            media.image && (
              <Image
                fitWrap
                key={index}
                data={media.image}
                wrap={{
                  className: clsx(
                    $.slide,
                    'embla__slide',
                    selectedIndex === index && $.slide_active // Add class for active slide
                  )
                }}
              />
            )
        )}
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
                  className={`embla__dot ${
                    index === selectedIndex ? 'embla__dot--selected' : ''
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default memo(EmblaCarousel)
