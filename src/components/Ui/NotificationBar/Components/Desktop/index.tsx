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

const Desktop = ({ data, ...props }: NotificationBarProps) => {
  // refs
  const comp = useRef<any>(null)
  const tl = useRef<GSAPTimeline | null>(null)

  // store
  const { notificationActive, setNotificationActive } = useStoreNavigation()
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(useStoreNavigation.persist.hasHydrated())
  }, [])

  // Hooks
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
      tl.current = gsap.timeline({
        paused: true,
        onComplete: () => {
          setNotificationActive(false)
        }
      })
      tl.current.to(comp.current, {
        marginTop: '-4.75rem',
        autoAlpha: 0,
        duration: DUR.default,
        ease: EASE.out
      })
    }
  })

  // Don't render the notification bar if inactive or not hydrated
  if (!data || !data.notificationIsActive || !notificationActive) return null

  const handleClose = () => {
    notificationActive && tl.current?.play()
  }

  return (
    <div {...props} className={$.notification} ref={comp}>
      <div className={$.wrap}>
        <div className={$.container}>
          <div className={$.title}>
            <div className={$.icon}>
              <Iconify family="lucide" icon="alert-triangle" width="100%" />
            </div>
            <p className="font-weight-700">{data.notificationTitle}</p>
          </div>
          <div className={$.message}>
            <div className={$.carousel}>
              <p>{data.notification}</p>
              <p>{data.notification}</p> {/* Duplicate for smooth scrolling */}
            </div>
          </div>
          <div className={$.button}>
            <Button
              data={data.notificationLink}
              variant="text"
              icon="lucide:chevron-right"
            />
          </div>
          <div className={$.close}>
            <IconButton
              isNext={false}
              as="div"
              className={$.close_icon}
              variant="ghost"
              icon="lucide:x"
              size="small"
              iconAnimation="rotate"
              onClick={handleClose}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Desktop
