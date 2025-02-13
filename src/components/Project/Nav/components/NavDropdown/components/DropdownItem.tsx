'use client'

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

  const { openItem, toggleItem } = useDropdown()
  const isOpen = openItem === id

  //stores
  const { setNavOpen } = useStoreNavigation()

  useGSAPContext({
    scope: comp,
    type: 'effect',
    callback: () => {
      const body = '[data-body]'
      tl.current = gsap.timeline({ paused: true })
      gsap.set(body, { height: 0, opacity: 0, overflow: 'hidden' })
      tl.current.to(body, { height: 'auto', opacity: 1, duration: 0.3 })
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
      <div className={$.icon} onClick={() => toggleItem(id)} data-open={isOpen}>
        <div className={$.icon_inner}>
          <div className={$.icon_line} />
          <div className={clsx($.icon_line, $.is_2)} />
        </div>
      </div>
      <div className={$.links}>
        <div className={$.title}>
          <Button
            data={data.dropdownItems[0]}
            variant="text"
            className={$.dropdown_link}
            onClick={() => setNavOpen(false)}
            preventSameUrlClass="pointer-events-none"
            transitionType={
              data.dropdownItems[0].isExternal ? undefined : 'fade'
            }
          />
        </div>

        <div className={$.body} data-body>
          {data.dropdownItems.slice(1).map((item, i) => (
            <Button
              data={item}
              key={i}
              variant="text"
              preventSameUrlClass="pointer-events-none"
              className={clsx($.dropdown_link)}
              onClick={() => setNavOpen(false)}
              transitionType={item.isExternal ? undefined : 'fade'}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default memo(NavDropdownItem)
