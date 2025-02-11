'use client'

import { animBaseTypes } from '@/animations'
import { useGSAPMedia } from '@/hooks'
import { Animations } from '@/types'
import { MEDIA } from '@config'
import { forwardRef, useImperativeHandle, useRef } from 'react'

export interface BaseProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
  children?: React.ReactNode
  anim?: Animations.AnimBase
  animVars?: GSAPTweenVars
  animScrollVars?: ScrollTrigger.Vars
  animHookType?: 'effect' | 'isomorphic' | 'layout'
}

const Base = forwardRef<HTMLElement, BaseProps>(
  (
    {
      children,
      as: Component = 'div',
      anim,
      animVars,
      animScrollVars,
      animHookType = 'effect',
      ...props
    },
    ref
  ) => {
    //refs
    const tl = useRef<GSAPTimeline | null>(null)
    const comp = useRef<any>(null)

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

    return (
      <Component ref={comp} {...props}>
        {children}
      </Component>
    )
  }
)

Base.displayName = 'Base'
export default Base
