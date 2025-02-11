'use client'

import clsx from 'clsx'
import React, { forwardRef, memo, useImperativeHandle, useRef } from 'react'
import Base from '../Base/Base'
import { BaseProps } from '../types'

export interface ContainerProps extends BaseProps {
  children?: React.ReactNode
  ref?: React.RefObject<HTMLElement>
}

const Container = forwardRef<HTMLElement, ContainerProps>(
  ({ children, className, ...props }, ref) => {
    const comp = useRef<any>(null)
    useImperativeHandle(ref, () => comp.current as HTMLElement)

    return (
      <Base ref={comp} className={clsx('container', className)} {...props}>
        {children}
      </Base>
    )
  }
)
Container.displayName = 'Container'

export default memo(Container)
