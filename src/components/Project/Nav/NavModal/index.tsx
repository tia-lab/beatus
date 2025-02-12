'use client'

import { animateNav } from '@/animations/components'
import { LayoutFragment } from '@/app/[locale]/query'
import { IconButton, LangSwitch } from '@/components/Ui'
import { useGSAPContext, useKeyPress } from '@/hooks'
import { Link } from '@/i18n/routing'
import { useStoreNavigation } from '@/store'
import { Lib } from '@/types'
import { useLenis } from '@studio-freight/react-lenis'
import clsx from 'clsx'
import { X } from 'lucide-react'
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
  const navOpen = useStoreNavigation.use.navOpen()
  const setNavOpen = useStoreNavigation.use.setNavOpen()

  //hooks
  const t = useTranslations()

  useGSAPContext({
    scope: comp,
    callback: () => {
      animateNav(comp, tl)
    }
  })

  useEffect(() => {
    if (!tl.current || !lenis) return
    navOpen ? tl.current.timeScale(1).play() : tl.current.timeScale(1).reverse()
    navOpen ? lenis.stop() : lenis.start()
  }, [navOpen, lenis])

  useOnClickOutside(modalRef, () => navOpen && setNavOpen(false))

  //Hanlders
  const closeModal = () => setNavOpen(false)

  useKeyPress('Escape', closeModal)

  return (
    <nav ref={comp} className={clsx($.modal)} data-active={navOpen} {...props}>
      <div className={clsx('main-wrapper', $.wrapper)}>
        <div className={$.modal_inner} data-inner ref={modalRef}>
          <div className={$.head}>
            <p
              className="title-h2 font-secondary text-style-uppercase"
              data-item
            >
              <Link href="/" onClick={closeModal}>
                {t('menu')}
              </Link>
            </p>
            <IconButton
              icon={<X width="100%" height="100%" strokeWidth={1} />}
              iconAnimation="rotate"
              onClick={closeModal}
              size="large"
              data-item
            />
          </div>
          <div className={$.line} data-line />
          <div className={$.modal_content} data-lenis-prevent>
            <div className={$.menu}>
              {Array.from({ length: 4 }).map((_, index) => (
                <Link
                  key={index}
                  className={$.menu_item}
                  data-item
                  href={'/test'}
                  onClick={closeModal}
                >
                  Nav Item {index + 1}
                </Link>
              ))}
              <NavDropdown>
                {data?.navigation.map((item, i) => (
                  <NavDropdownItem key={i} id={item.id} data={item} />
                ))}
              </NavDropdown>
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
