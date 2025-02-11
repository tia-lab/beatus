'use client'

import { CONFIG, DEBUG, USE } from '@config'
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'
import { usePathname } from 'next/navigation'
import { memo, useEffect } from 'react'

export interface LenisProps {
  children?: React.ReactNode
}

function Lenis({ children }: LenisProps) {
  const pathname = usePathname()

  const lenis = useLenis((lenis) => {
    if (!USE.lenis) return
    if (DEBUG.lenis) {
      console.log('----------lenis debug---------')
      console.log('velocity', lenis.velocity)
      console.log('direction', lenis.direction)
      console.log('isScrolling', lenis.isScrolling)
      console.log('emitter', lenis.emitter)
      console.log('actualScroll	', lenis.actualScroll)
      console.log('velocity', lenis.velocity)
      console.log('isScrolling', lenis.isScrolling)
      console.log('isSmooth', lenis.isSmooth)
      console.log('isStopped', lenis.isStopped)
      console.log('progress', lenis.progress)
      console.log('scroll', lenis.scroll)
    }
  })

  useEffect(() => {
    lenis && lenis.scrollTo(0, { immediate: true })
    DEBUG.lenis && console.log('lenis scroll to 0')
  }, [pathname, lenis])

  return USE.lenis ? (
    <ReactLenis root options={CONFIG.animations.lenis}>
      {children}
    </ReactLenis>
  ) : (
    <>{children}</>
  )
}

export default memo(Lenis)
