'use client'

import { DUR, EASE } from '@/animations/vars'
import { useGSAPContext } from '@/hooks'
import { useStoreNavigation } from '@/store'
import { gsap } from '@gsap'
import { useEffect, useRef, useState } from 'react'

import Button from '@/components/Ui/Button'
import IconButton from '@/components/Ui/IconButton'
import Iconify from '@/components/Ui/Iconify'
import { NotificationBarProps } from '../..'
import $ from './style.module.scss'

const Mobile = ({ data, ...props }: NotificationBarProps) => {
  // refs
  const comp = useRef<any>(null)

  const tl = useRef<GSAPTimeline | null>(null)
  const tlOpen = useRef<GSAPTimeline | null>(null)

  //states
  const [isOpened, setIsOpened] = useState(false)
  const [isRemoved, setIsRemoved] = useState(false)

  // store
  const { notificationActive, setNotificationActive } = useStoreNavigation()
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(useStoreNavigation.persist.hasHydrated())
  }, [])

  useEffect(() => {
    if (!isHydrated || notificationActive !== null) return
    if (data) {
      setNotificationActive(data.notificationIsActive || false)
    }
  }, [notificationActive, data, setNotificationActive, isHydrated])

  useGSAPContext({
    scope: comp,
    deps: [notificationActive],
    callback: () => {
      if (!comp.current) return
      const body = '[data-body]'
      const open = '[data-open]'
      tl.current = gsap.timeline({
        paused: true,
        onComplete: () => {
          setNotificationActive(false)
        }
      })
      tl.current
        .to(body, {
          height: 0,
          autoAlpha: 0,
          duration: DUR.default,
          ease: EASE.out,
          overflow: 'hidden'
        })
        .to(body, { display: 'none', duration: 0 })
        .to(
          comp.current,
          {
            marginTop: '-4.25rem',
            autoAlpha: 0,
            duration: DUR.default,
            ease: EASE.out
          },
          '<'
        )

      //open
      gsap.set(body, {
        height: 0,
        overflow: 'hidden',
        autoAlpha: 0,
        display: 'none'
      })
      tlOpen.current = gsap.timeline({
        paused: true
      })
      tlOpen.current
        .to(body, { display: 'flex', duration: 0 })
        .to(open, {
          rotate: 45,
          autoAlpha: 1,
          duration: DUR.default,
          ease: EASE.out
        })
        .to(
          body,
          {
            height: 'auto',
            autoAlpha: 1,
            duration: DUR.default,
            ease: EASE.out
          },
          '<'
        )
    }
  })

  // Don't render the notification bar if inactive or not hydrated

  const handleClick = () => {
    if (!isOpened) {
      setIsOpened(true)
    } else {
      setIsRemoved(true)
    }
  }

  useEffect(() => {
    isOpened ? tlOpen.current?.play() : tlOpen.current?.reverse()
    isRemoved ? tl.current?.play() : tl.current?.reverse()
  }, [isOpened, isRemoved])

  if (!data || !data.notificationIsActive || !notificationActive) return null
  return (
    <div {...props} className={$.notification} ref={comp}>
      <div className={$.wrap}>
        <div className={$.head}>
          <div className={$.title}>
            <div className={$.icon}>
              <Iconify family="lucide" icon="alert-triangle" width="100%" />
            </div>
            <p className="font-weight-700">{data.notificationTitle}</p>
          </div>

          <div className={$.buttons}>
            <div className={$.open} onClick={handleClick} data-open>
              <IconButton
                className={$.open_icon}
                variant="ghost"
                icon="lucide:plus"
                size="small"
                isNext={false}
                as="div"
              />
            </div>
          </div>
        </div>
        <div className={$.body} data-body>
          <p>{data.notification}</p>
          <div className={$.button}>
            <Button
              data={data.notificationLink}
              variant="text"
              icon="lucide:chevron-right"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mobile
