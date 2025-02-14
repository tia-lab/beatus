'use client'

import { Div } from '@/components/Core'
import { CardPackage, CardRoom } from '@/components/Project'
import { EmblaCarousel } from '@/components/Ui'
import { useDotButton } from '@/components/Ui/EmblaCarousel/Components/Dots'
import PackageCardFragment from '@/lib/fragments/packages/card'
import RoomCardFragment from '@/lib/fragments/rooms/cards'
import { useStoreCursor } from '@/store'
import { Lib } from '@/types'
import useEmblaCarousel from 'embla-carousel-react'
import { readFragment } from 'gql.tada'
import { memo } from 'react'
import { CardTypes } from '.'
import { SectionSliderProps, Variants } from '../..'
import SectionSliderFragment from '../../query'
import $ from './style.module.scss'

interface SliderCardsClientProps {
  data: Omit<SectionSliderProps, 'params'>
  elements: CardTypes[]
}

const SliderCardsClient = ({ data, elements }: SliderCardsClientProps) => {
  //@ts-ignore
  const d = readFragment(SectionSliderFragment, data)
  const [emblaRef, emblaApi] = useEmblaCarousel()
  const setCursorType = useStoreCursor.use.setType()

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const variant: Variants = d.variant as Variants

  const Card = (slide: CardTypes, k: number) => {
    switch (variant) {
      case 'packages':
        return (
          <CardPackage
            key={k}
            data={slide as Lib.FragmentOf<typeof PackageCardFragment>}
            className={$.slide}
            transitionType="slide"
            href={`/packages/${slide.slug}`}
          />
        )
      case 'rooms':
        return (
          <CardRoom
            key={k}
            data={slide as Lib.FragmentOf<typeof RoomCardFragment>}
            className={$.slide}
            button1Props={{
              transitionType: 'slide',
              href: `/rooms/${slide.slug}`
            }}
            button2Props={{
              transitionType: 'slide',
              href: `/rooms/${slide.slug}`
            }}
          />
        )
      default:
        return null
    }
  }

  return (
    <Div className={$.slider} anim="section-fade-in">
      <div
        className={$.slider_container}
        onMouseEnter={() => setCursorType('card-package')}
        onMouseLeave={() => setCursorType('default')}
      >
        <EmblaCarousel
          options={{ loop: true, slidesToScroll: 2 }}
          customEmblaApi={emblaApi}
          customEmblaRef={emblaRef}
          emblaClassName={$.embla}
          containerClassName={$.embla_container}
          slides={elements.map((slide, k) => Card(slide, k))}
        />
        <div className={$.fade} />
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

export default memo(SliderCardsClient)
