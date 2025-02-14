'use client'

import Arrow from '$/public/icons/arrow/arrow-slider.svg'
import { Div, Image } from '@/components/Core'
import { EmblaCarousel } from '@/components/Ui'
import { usePrevNextButtons } from '@/components/Ui/EmblaCarousel/Components/Button'
import clsx from 'clsx'
import useEmblaCarousel from 'embla-carousel-react'
import { readFragment } from 'gql.tada'
import { memo } from 'react'
import { SectionSliderProps } from '../..'
import SectionSliderFragment from '../../query'
import $ from './style.module.scss'

const SliderGallery = ({ data }: Omit<SectionSliderProps, 'params'>) => {
  const d = readFragment(SectionSliderFragment, data)
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: true })

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return (
    <Div className={$.slider} anim="section-fade-in">
      <div className={$.slider_container}>
        <EmblaCarousel
          options={{ align: 'start', loop: true }}
          customEmblaApi={emblaApi}
          customEmblaRef={emblaRef}
          emblaClassName={$.embla}
          containerClassName={$.embla_container}
          slides={d.gallery.map((slide, k) => (
            <Image
              key={k}
              fitWrap
              ar="16x9"
              data={slide}
              wrap={{ className: $.slide }}
            />
          ))}
        />
        <div className={$.frame_overlay}>
          <div className={$.frame_border} />
          <div className={$.buttons}>
            <button
              onClick={onPrevButtonClick}
              data-disabled={prevBtnDisabled}
              className={$.button}
            >
              <div className={clsx($.icon, $.icon_prev)}>
                <Arrow />
              </div>
            </button>
            <button
              onClick={onNextButtonClick}
              data-disabled={nextBtnDisabled}
              className={$.button}
            >
              <div className={$.icon}>
                <Arrow />
              </div>
            </button>
          </div>
        </div>
      </div>
    </Div>
  )
}

export default memo(SliderGallery)
