'use client'

import React, { forwardRef, memo, useImperativeHandle, useRef } from 'react'
import Base from '../Base/Base'
import { BaseProps } from '../types'

export interface DivProps extends BaseProps {
  children?: React.ReactNode
  ref?: React.RefObject<HTMLElement>
}

const Div = forwardRef<HTMLElement, DivProps>(
  ({ className, children, ...props }, ref) => {
    //refs
    const comp = useRef<any>(null)
    useImperativeHandle(ref, () => comp.current as HTMLElement)

    return (
      <Base ref={comp} {...props} className={className}>
        {children}
      </Base>
    )
  }
)
Div.displayName = 'Div'

export default memo(Div)
