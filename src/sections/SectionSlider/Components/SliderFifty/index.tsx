'use client'

import { Div } from '@/components/Core'
import { readFragment } from 'gql.tada'
import { memo } from 'react'
import { SectionSliderProps } from '../..'
import SectionSliderFragment from '../../query'
import $ from './style.module.scss'

const SliderFifty = ({ data }: Omit<SectionSliderProps, 'params'>) => {
  const _d = readFragment(SectionSliderFragment, data)
  /*  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: true })

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi) */

  return (
    <>
      <Div className={$.slider} anim="section-fade-in">
        <div className={$.placeholder}> Todo</div>
      </Div>
    </>
  )
}

export default memo(SliderFifty)
