'use client'

import { Div, Image } from '@/components/Core'
import { EmblaCarousel } from '@/components/Ui'
import { useDotButton } from '@/components/Ui/EmblaCarousel/Components/Dots'
import RoomFragment from '@/lib/fragments/rooms/room'
import useEmblaCarousel from 'embla-carousel-react'
import { readFragment } from 'gql.tada'
import { memo } from 'react'
import { DetailGalleryProps } from '../..'
import $ from './style.module.scss'

const SliderImages = ({ data }: DetailGalleryProps) => {
  const d = readFragment(RoomFragment, data)
  const [emblaRef, emblaApi] = useEmblaCarousel({})

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

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
      </div>
      <div className={$.navigation}>
        {scrollSnaps.map((_, i) => (
          <button
            key={i}
            onClick={() => onDotButtonClick(i)}
            className={$.dot}
            data-active={i === selectedIndex}
          >
            <div className={$.dot_inner} />
          </button>
        ))}
      </div>
    </Div>
  )
}

export default memo(SliderImages)
