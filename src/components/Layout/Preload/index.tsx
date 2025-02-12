'use client'

import { animatePreload } from '@/animations/components'
import { LayoutFragment } from '@/app/[locale]/query'
import { Image } from '@/components/Core'
import { useGSAPContext } from '@/hooks'
import { useStorePreload } from '@/store'
import { Lib } from '@/types'
import { useRef } from 'react'
import $ from './style.module.scss'

export interface PreloadProps {
  children: React.ReactNode
  data: Lib.FragmentOf<typeof LayoutFragment> | null
}

const Preload = ({ children, data }: PreloadProps) => {
  //refs
  const comp = useRef(null)
  const tl = useRef<GSAPTimeline | null>(null)

  //stores
  const isPreloaded = useStorePreload.use.isPreloaded()
  const setIsPreloaded = useStorePreload.use.setIsPreloaded()
  const setStartAnimations = useStorePreload.use.setStartAnimations()

  useGSAPContext({
    scope: comp,
    type: 'isomorphic',
    deps: [isPreloaded],
    callback: () => {
      if (!isPreloaded) {
        animatePreload(comp, tl, setIsPreloaded, setStartAnimations)
        tl.current?.play()
      }
    }
  })

  return (
    <>
      {children}
      {!isPreloaded && (
        <div ref={comp} className={$.preload}>
          <div data-logo>
            <Image data={data?.preloadLogo} isClient />
          </div>
        </div>
      )}
    </>
  )
}

export default Preload
