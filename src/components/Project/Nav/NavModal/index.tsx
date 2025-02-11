'use client'

import { animateModal } from '@/animations/components'
import { LayoutFragment } from '@/app/[locale]/query'
import { Button, LangSwitch } from '@/components/Ui'
import { useGSAPContext, useKeyPress } from '@/hooks'
import { useStoreNavigation } from '@/store'
import { Lib } from '@/types'
import { useLenis } from '@studio-freight/react-lenis'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { memo, useEffect, useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import { NavDropdown, NavDropdownItem } from './components/NavDropdown'
import $ from './style.module.scss'

export interface NavModalProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Lib.FragmentOf<typeof LayoutFragment> | null
}

const NavModal = ({ data, ...props }: NavModalProps) => {
  //Refs
  const comp = useRef<any>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const tl = useRef<GSAPTimeline>(null)

  //Hooks
  const lenis = useLenis()

  //stores
  const { navOpen, setNavOpen } = useStoreNavigation()

  //hooks
  const t = useTranslations()

  useGSAPContext({
    scope: comp,
    callback: () => {
      animateModal(comp, tl)
    }
  })

  useEffect(() => {
    if (!tl.current || !lenis) return
    navOpen ? tl.current.play() : tl.current.reverse()
    navOpen ? lenis.stop() : lenis.start()
  }, [navOpen, lenis])

  useOnClickOutside(modalRef, () => navOpen && setNavOpen(false))

  //Hanlders
  const closeModal = () => setNavOpen(false)

  useKeyPress('Escape', closeModal)

  return (
    <nav ref={comp} className={clsx($.modal)} data-active={navOpen} {...props}>
      <div className={$.bg} onClick={() => setNavOpen(false)} />
      <div className={clsx('main-wrapper', $.wrapper)}>
        <div className={$.modal_inner} data-inner ref={modalRef}>
          <div
            className={clsx('text-btn-large', 'text-primary-300', $.close)}
            onClick={closeModal}
          >
            {t('menu_close')}
          </div>
          <div className={$.modal_content} data-lenis-prevent>
            <NavDropdown>
              {data?.navigation.map((item, i) => (
                <NavDropdownItem key={i} id={item.id} data={item} />
              ))}
            </NavDropdown>
            <div className={$.sidebar} data-lenis-prevent>
              <div className={$.quick_links}>
                {data?.navigationQuicklinks.map((link, i) => (
                  <Button
                    variant="text"
                    key={i}
                    data={link}
                    onClick={() => setNavOpen(false)}
                    transitionType={link.isExternal ? undefined : 'fade'}
                    preventSameUrlClass="pointer-events-none"
                  />
                ))}
              </div>
            </div>
            <div className={$.lang_switch}>
              <LangSwitch />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default memo(NavModal)
