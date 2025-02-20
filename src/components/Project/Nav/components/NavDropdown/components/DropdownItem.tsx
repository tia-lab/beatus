'use client'

import { Image } from '@/components/Core'
import { Button } from '@/components/Ui'
import { useGSAPContext } from '@/hooks'
import { MenuDropdownFragment } from '@/lib/fragments'
import { useStoreNavigation } from '@/store'
import { Lib } from '@/types'
import { gsap } from '@gsap'
import clsx from 'clsx'
import { HTMLAttributes, memo, useEffect, useRef } from 'react'
import $ from '../style.module.scss'
import { useDropdown } from './Dropdown'

interface NavDropdownProps extends HTMLAttributes<HTMLDivElement> {
  data: Lib.FragmentOf<typeof MenuDropdownFragment>
  id: string
}

const NavDropdownItem = ({
  data,
  id,
  className,
  ...props
}: NavDropdownProps) => {
  const comp = useRef<any>(null)
  const tl = useRef<GSAPTimeline | null>(null)
  const openItem = useStoreNavigation.use.openDropdown()
  const { toggleItem } = useDropdown()

  const isOpen = openItem === id

  //stores
  const { setNavOpen } = useStoreNavigation()

  useGSAPContext({
    scope: comp,
    type: 'effect',
    callback: () => {
      const body = '[data-body]'
      tl.current = gsap.timeline({ paused: true })
      gsap.set(body, {
        autoAlpha: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        display: 'none'
      })
      tl.current
        .to(body, { display: 'flex', duration: 0, pointerEvents: 'all' })
        .to(body, { autoAlpha: 1, duration: 0.3 })
    }
  })

  useEffect(() => {
    if (!tl.current) return
    isOpen ? tl.current.play() : tl.current.reverse()
  }, [isOpen])

  return (
    <div
      ref={comp}
      className={clsx($.nav_dropdown_item, { [$.open]: isOpen }, className)}
      {...props}
    >
      <div
        className={$.title}
        onClick={() => toggleItem(id)}
        data-open={isOpen}
      >
        <div className={$.title}>{data.dropdownTitle}</div>
      </div>

      <div className={$.body} data-body>
        <div className={$.links}>
          {data.dropdownItems.map((item, i) => (
            <Button
              data={item}
              className={$.link}
              key={i}
              variant="text"
              preventSameUrlClass="pointer-events-none"
              onClick={() => setNavOpen(false)}
              transitionType={item.isExternal ? undefined : 'fade'}
            />
          ))}
        </div>
        <Image
          data={data.dropdownImage}
          wrap={{ className: clsx($.image) }}
          fitWrap
        />
      </div>
    </div>
  )
}

export default memo(NavDropdownItem)
