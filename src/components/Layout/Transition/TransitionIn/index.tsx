'use client'

import { animTransFadeIn, animTransSlideIn } from '@/animations/transitions'
import { useGSAPMedia } from '@/hooks'
import { useStoreTransition } from '@/store'
import { MEDIA } from '@config'
import { useEffect, useRef } from 'react'
import $ from '../style.module.scss'

const TransitionIn = () => {
  const comp = useRef<any>(null)
  const tl = useRef<GSAPTimeline | null>(null)

  const {
    isTransitionIn,
    isTransitionOut,
    setIsTransitionOut,
    setIsTransitionIn,
    transitionType,
    resetTransition,
    isTransitioning
  } = useStoreTransition()

  useEffect(() => {
    if (isTransitioning) {
      setIsTransitionIn(true)
      //remove trasition out
      setIsTransitionOut(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useGSAPMedia({
    media: MEDIA,
    scope: comp,
    type: 'effect',
    deps: [transitionType, isTransitionIn, isTransitionOut],
    callback: (_c) => {
      if (!transitionType || !isTransitionIn || isTransitionOut) return
      switch (transitionType) {
        case 'slide':
          animTransSlideIn({
            tl: tl.current,
            comp: comp,
            name: 'slide-in',
            onComplete: () => {
              resetTransition()
            }
          })
          break
        case 'fade':
          animTransFadeIn({
            tl: tl.current,
            comp: comp,
            name: 'fade-in',
            onComplete: () => {
              resetTransition()
            }
          })
          break
      }
    }
  })

  if (!isTransitionIn) return null

  return (
    <div ref={comp}>
      {transitionType === 'slide' && (
        <div className={$.transition_slide_in} data-transition="slide-in" />
      )}
      {transitionType === 'fade' && (
        <div className={$.transition_fade_in} data-transition="fade-in" />
      )}
    </div>
  )
}

export default TransitionIn
