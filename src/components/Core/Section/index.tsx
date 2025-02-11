'use client'

import { SectionPaddingFragment } from '@/lib/fragments'
import { Lib } from '@/types'
import clsx from 'clsx'
import { readFragment } from 'gql.tada'
import React, { forwardRef, memo, useImperativeHandle, useRef } from 'react'
import Base from '../Base/Base'
import { BaseProps } from '../types'

export interface SectionProps extends BaseProps {
  children?: React.ReactNode
  ref?: React.RefObject<HTMLElement>
  mainWrapper?: boolean
  padding?: Lib.FragmentOf<typeof SectionPaddingFragment> | null
}

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      children,
      className,
      as = 'section',
      mainWrapper = true,
      padding,
      ...props
    },
    ref
  ) => {
    //Refs
    const comp = useRef<any>(null)
    const paddings = readFragment(SectionPaddingFragment, padding)

    //API
    useImperativeHandle(ref, () => comp.current as HTMLElement)

    //Compoenets
    const ChildNode = () => {
      if (mainWrapper) {
        return <div className="main-wrapper">{children}</div>
      } else {
        return <>{children}</>
      }
    }

    //Classes
    const sectionClasses = clsx(
      'section',
      mainWrapper && 'is-main-wrapper',
      className,
      paddings?.customPaddingTop && paddings.paddingTop,
      paddings?.customPaddingBottom && paddings.paddingBottom
    )

    return (
      <Base as={as} ref={comp} className={sectionClasses} {...props}>
        <ChildNode />
      </Base>
    )
  }
)
Section.displayName = 'Section'

export default memo(Section)
