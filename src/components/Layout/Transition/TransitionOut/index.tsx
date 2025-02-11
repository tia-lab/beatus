'use client'

import { animTransFadeOut, animTransSlideOut } from '@/animations/transitions'
import { useGSAPMedia } from '@/hooks'
import { useStoreTransition } from '@/store'
import { MEDIA } from '@config'
import { useRef } from 'react'
import $ from '../style.module.scss'

const TransitionOut = () => {
  const comp = useRef<any>(null)
  const tl = useRef<GSAPTimeline | null>(null)

  const { isTransitionOut, transitionType, setIsTransitioning } =
    useStoreTransition()

  useGSAPMedia({
    media: MEDIA,
    scope: comp,
    type: 'effect',
    deps: [transitionType, isTransitionOut],
    callback: (_c) => {
      if (!transitionType || !isTransitionOut) return
      setIsTransitioning(true)
      switch (transitionType) {
        case 'slide':
          animTransSlideOut({
            tl: tl.current,
            comp: comp,
            name: 'slide-out'
          })
          break
        case 'fade':
          animTransFadeOut({
            tl: tl.current,
            comp: comp,
            name: 'fade-out'
          })
          break
      }
    }
  })

  //if (!isTransitionOut) return null
  return (
    <div ref={comp}>
      {transitionType === 'slide' && (
        <div className={$.transition_slide_out} data-transition="slide-out" />
      )}
      {transitionType === 'fade' && (
        <div className={$.transition_fade_out} data-transition="fade-out" />
      )}
    </div>
  )
}

export default TransitionOut
