'use client'

import React, { forwardRef, memo, useImperativeHandle, useRef } from 'react'
import Base from '../Base/Base'
import { BaseProps } from '../types'

export type TitleTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
export interface TitleProps extends Omit<BaseProps, 'as'> {
  as?: TitleTags
  children?: React.ReactNode
  ref?: React.RefObject<HTMLElement>
}

const Title = forwardRef<HTMLElement, TitleProps>(
  ({ className, as = 'h1', children, ...props }, ref) => {
    //refs
    const comp = useRef<any>(null)
    useImperativeHandle(ref, () => comp.current as HTMLElement)

    return (
      <Base as={as} ref={comp} className={className} {...props}>
        {children}
      </Base>
    )
  }
)
Title.displayName = 'Title'

export default memo(Title)
