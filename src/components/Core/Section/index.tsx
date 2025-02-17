'use client'

import { useGSAPContext } from '@/hooks'
import { SectionPaddingFragment } from '@/lib/fragments'
import { useStoreNavigation } from '@/store'
import { State } from '@/store/store-navigation'
import { Lib } from '@/types'
import { ScrollTrigger, gsap } from '@gsap'
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
  headerColor?: State['headerColor']
  headerColorImmediate?: boolean
}

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      children,
      className,
      as = 'section',
      mainWrapper = true,
      padding,
      headerColor = 'dark',
      headerColorImmediate = false,
      ...props
    },
    ref
  ) => {
    //Refs
    const comp = useRef<any>(null)
    const paddings = readFragment(SectionPaddingFragment, padding)

    //stores
    const setHeaderColor = useStoreNavigation.use.setHeaderColor()

    //API
    useImperativeHandle(ref, () => comp.current as HTMLElement)

    //Set header color
    useGSAPContext({
      scope: comp,
      callback: () => {
        gsap.registerPlugin(ScrollTrigger)
        if (headerColorImmediate) {
          setHeaderColor(headerColor)
        }
        ScrollTrigger.create({
          trigger: comp.current,
          start: 'top top',
          end: 'bottom top',
          onEnter: () => setHeaderColor(headerColor),
          onEnterBack: () => setHeaderColor(headerColor)
        })
      }
    })

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
