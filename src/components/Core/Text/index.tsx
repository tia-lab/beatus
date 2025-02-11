'use client'

import React, { forwardRef, memo, useImperativeHandle, useRef } from 'react'
import Base from '../Base/Base'
import { BaseProps } from '../types'

export interface TextProps extends Omit<BaseProps, 'as'> {
  as?: 'p' | 'div' | 'span' | 'blockquote' | 'cite' | 'q'
  children?: React.ReactNode
  ref?: React.RefObject<HTMLElement>
}

const Text = forwardRef<HTMLElement, TextProps>(
  ({ className, as = 'p', children, ...props }, ref) => {
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
Text.displayName = 'Text'

export default memo(Text)
