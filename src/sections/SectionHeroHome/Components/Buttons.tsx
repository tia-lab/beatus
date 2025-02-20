'use client'

import { Button } from '@/components/Ui'
import { useStoreNavigation } from '@/store'
import { useTranslations } from 'next-intl'
import $ from './style.module.scss'

const Buttons = () => {
  const setOpenBookingModal = useStoreNavigation.use.setBookingModalOpen()
  const setBookingKey = useStoreNavigation.use.setBookingKey()
  const t = useTranslations()

  return (
    <div className={$.buttons}>
      <div className={$.buttons_overlay} />
      <Button
        isNext={false}
        className={$.button_1}
        as="div"
        variant="outline"
        onClick={() => {
          setOpenBookingModal(true)
          setBookingKey('0')
        }}
      >
        {t('header_btn_dayguest')}
      </Button>
      <Button
        as="div"
        isNext={false}
        className={$.button_2}
        onClick={() => {
          setOpenBookingModal(true)
          setBookingKey('1')
        }}
      >
        {t('header_btn_hotel')}
      </Button>
    </div>
  )
}

export default Buttons
