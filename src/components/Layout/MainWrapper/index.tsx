'use client'

import { animateNav } from '@/animations/components'
import queryLayout from '@/app/[locale]/query'
import { Header, Nav } from '@/components/Project'
import { NavModalRefProps } from '@/components/Project/Nav'
import { useGSAPContext } from '@/hooks'
import { useStoreNavigation } from '@/store'
import { Lib } from '@/types'
import { useLenis } from '@studio-freight/react-lenis'
import { memo, useLayoutEffect, useRef, useState } from 'react'
import Lenis from '../Lenis'
import Preload from '../Preload'
export interface MainWrapperProps {
  data: Lib.ResultOf<typeof queryLayout>['layout'] | null
  children: React.ReactNode
}

const MainWrapper: React.FC<MainWrapperProps> = ({
  children,
  data
}: MainWrapperProps) => {
  //refs
  const mainRef = useRef<HTMLDivElement>(null)
  const modalNavRef = useRef<NavModalRefProps>(null)
  const [tlNav, setTlNav] = useState<GSAPTimeline | null>(null)

  //Store
  const navOpen = useStoreNavigation.use.navOpen()

  //Hooks
  const lenis = useLenis()
  useGSAPContext({
    scope: mainRef,
    callback: () => {
      if (!mainRef.current && !modalNavRef.current) return
      const timeline = animateNav(mainRef.current, modalNavRef.current)
      setTlNav(timeline)
    },
    deps: [mainRef, modalNavRef]
  })

  useLayoutEffect(() => {
    if (tlNav && navOpen) {
      tlNav.play()
    } else if (tlNav && !navOpen) {
      tlNav.reverse()
    }
  }, [navOpen, tlNav])

  if (!data) return null
  return (
    <Lenis>
      <Preload data={data}>
        <Header data={data} />
        <div className="page-wrapper" data-main ref={mainRef}>
          <main>{children}</main>
        </div>
        <Nav data={data} ref={modalNavRef} />
      </Preload>
    </Lenis>
  )
}

export default memo(MainWrapper)
