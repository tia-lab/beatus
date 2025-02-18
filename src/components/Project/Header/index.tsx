'use client'

import LogoBeatus from '$/public/beatus/logo/logo.svg'
import { LayoutFragment } from '@/app/[locale]/query'
import { BaseLink, Container } from '@/components/Core'
import { Button, NotificationBar } from '@/components/Ui'
import { NotificationBarProps } from '@/components/Ui/NotificationBar'
import { useGSAPMedia } from '@/hooks'
import { useStoreNavigation } from '@/store'
import { Lib } from '@/types'
import { MEDIA, PROJECT } from '@config'
import { ScrollTrigger, gsap } from '@gsap'
import clsx from 'clsx'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import OpenNav from './components/OpenNav'
import $ from './style.module.scss'
export interface HeaderProps {
  data: Lib.FragmentOf<typeof LayoutFragment> | null
}

const Header = ({ data }: HeaderProps) => {
  const notification: NotificationBarProps['data'] = {
    notificationIsActive: data?.notificationIsActive,
    notification: data?.notification,
    notificationLink: data?.notificationLink,
    notificationTitle: data?.notificationTitle
  }

  //refs
  const comp = useRef<any>(null)
  const pathname = usePathname()

  const t = useTranslations()

  //Stores
  const notificationActive = useStoreNavigation.use.notificationActive()
  const headerHidden = useStoreNavigation.use.headerHidden()
  const setHeaderHidden = useStoreNavigation.use.setHeaderHidden()
  const headerColor = useStoreNavigation.use.headerColor()
  const setOpenBookingModal = useStoreNavigation.use.setBookingModalOpen()
  const setBookingKey = useStoreNavigation.use.setBookingKey()

  useGSAPMedia({
    media: MEDIA,
    scope: comp,
    deps: [headerHidden],
    callback: (c) => {
      gsap.registerPlugin(ScrollTrigger)
      ScrollTrigger.observe({
        type: 'wheel,touch,scroll',
        onUp: () => {
          headerHidden && setHeaderHidden(false)
        },
        onDown: () => {
          headerHidden === false && setHeaderHidden(true)
        },
        tolerance: c?.conditions?.desktop ? 20 * 16 : 100
      })
    }
  })

  const locale = useLocale()

  useEffect(() => {
    setHeaderHidden(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  if (!data) return null
  return (
    <header
      className={$.header}
      data-notifaction={notificationActive}
      data-hidden={headerHidden}
      ref={comp}
      data-color={headerColor}
    >
      <div className={$.bg} data-color={headerColor} />
      <div className="main-wrapper">
        <NotificationBar data={notification} />
        <Container className={$.container}>
          <OpenNav className={$.open} />
          <BaseLink
            className={clsx($.logo, pathname === `/${locale}` && $.disabled)}
            href="/"
            aria-label="home"
            transitionType="fade"
          >
            {PROJECT === 'beatus' && <LogoBeatus />}
          </BaseLink>
          <div
            className={$.buttons_wrap}
            onClick={() => setOpenBookingModal(true)}
          >
            <p className="text-style-uppercase font-weight-700">
              {t('header_booking')}
            </p>
            <div className={$.buttons}>
              <div className={$.buttons_overlay} data-color={headerColor} />
              <Button
                isNext={false}
                className={$.button_1}
                data-light={headerColor === 'light'}
                variant="outline"
                onClick={() => {
                  setOpenBookingModal(true)
                  setBookingKey('0')
                }}
              >
                {t('header_btn_dayguest')}
              </Button>
              <Button
                isNext={false}
                className={$.button_2}
                data-light={headerColor === 'light'}
                onClick={() => {
                  setOpenBookingModal(true)
                  setBookingKey('1')
                }}
              >
                {t('header_btn_hotel')}
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </header>
  )
}

export default Header
