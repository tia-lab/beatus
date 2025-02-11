'use client'

import { animBaseTypes } from '@/animations'
import { transitionDurations } from '@/components/Layout/Transition'
import { TransitionTypes } from '@/components/Layout/types'
import { useGSAPMedia } from '@/hooks'
import { Link } from '@/i18n/routing'
import { delay } from '@/lib/misc'
import { useStoreCursor, useStoreTransition } from '@/store'
import { Animations } from '@/types'
import { MEDIA } from '@config'
import { ScrollToParams, useLenis } from '@studio-freight/react-lenis'
import { LinkProps } from 'next/link'
import { useRouter } from 'next/navigation'

import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react'

export interface BaseLinkProps
  extends React.HTMLAttributes<HTMLAnchorElement>,
    Omit<LinkProps, 'href' | 'as'> {
  as?: React.ElementType
  children?: React.ReactNode
  anim?: Animations.AnimBase
  animVars?: GSAPTweenVars
  animScrollVars?: ScrollTrigger.Vars
  animHookType?: 'effect' | 'isomorphic' | 'layout'
  isNext?: boolean
  target?: string
  href?: string
  cursorType?: 'default'
  transitionType?: TransitionTypes
  lenisScroll?: {
    target: string | number | HTMLElement
    options?: ScrollToParams
  }
}

const BaseLink = forwardRef<HTMLElement, BaseLinkProps>(
  (
    {
      children,
      as = 'a',
      anim,
      animVars,
      isNext = true,
      animScrollVars,
      animHookType = 'effect',
      cursorType = 'default',
      onMouseEnter,
      onMouseLeave,
      lenisScroll,
      transitionType,
      onClick,
      ...props
    },
    ref
  ) => {
    //refs
    const tl = useRef<GSAPTimeline | null>(null)
    const comp = useRef<any>(null)

    const lenis = useLenis()

    //Stores
    const setHoverDefault = useStoreCursor.use.setHoverDefault()
    const { setIsTransitionOut, isTransitionOut, setTransitionType } =
      useStoreTransition()

    //hooks
    const router = useRouter()

    //Handlers
    const hanldeCursorIn = useCallback(() => {
      cursorType === 'default' && setHoverDefault(true)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const hanldeCursorOut = useCallback(() => {
      cursorType === 'default' && setHoverDefault(false)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleClick = async (
      e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
      if (lenisScroll) {
        e.preventDefault()
        const { target, options } = lenisScroll
        lenis.scrollTo(target, options)
        onClick && onClick(e)
      } else if (!isTransitionOut && props.href && transitionType) {
        e.preventDefault()
        setTransitionType(transitionType)
        setIsTransitionOut(true)
        onClick && onClick(e)
        const duration = transitionDurations[transitionType] || 1
        await delay(duration * 1000)
        router.push(props.href)
      } else {
        onClick && onClick(e)
      }
    }

    const mouseEnter = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      if (onMouseEnter) onMouseEnter(e)
      if (cursorType) hanldeCursorIn()
    }

    const mouseLeave = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      if (onMouseLeave) onMouseLeave(e)
      if (cursorType) hanldeCursorOut()
    }

    //Hooks
    useGSAPMedia({
      media: MEDIA,
      scope: comp.current,
      type: animHookType,
      callback: (_c) => {
        if (!anim) return
        animBaseTypes[anim]({
          tl: tl.current,
          ref: comp,
          ctx: _c,
          animVars: animVars,
          animScrollVars: animScrollVars
        })
      }
    })

    //Api
    useImperativeHandle(ref, () => comp.current as HTMLElement)

    const Component = isNext ? Link : as

    return (
      <Component
        ref={comp}
        {...props}
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        onClick={handleClick}
      >
        {children}
      </Component>
    )
  }
)

BaseLink.displayName = 'BaseLink'

export default BaseLink
