'use client'

import { Container } from '@/components/Core'
import {
  Button,
  Datepicker,
  IconButton,
  RoomPeopleField
} from '@/components/Ui'
import clsx from 'clsx'
import { Formik } from 'formik'
import React, { useRef } from 'react'

import { Room } from '@/components/Ui/RoomPeopleField/RoomPeopleField'
import { useMedia } from '@/hooks'
import { useStoreNavigation } from '@/store'
import { MEDIA } from '@config'
import { ChevronDown, X } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import $ from './style.module.scss'

export interface BookingBarProps
  extends React.AllHTMLAttributes<HTMLDivElement> {
  active?: boolean
}

const BookingBar = ({ ...props }: BookingBarProps) => {
  const { active, className, ...rest } = props
  const locale = useLocale()
  const t = useTranslations()
  const comp = useRef<any>(null)

  const isDesktop = useMedia(MEDIA.desktop)

  const [open, setOpen] = React.useState(isDesktop)

  const headerHidden = useStoreNavigation.use.headerHidden()

  if (!active) return null

  const parseRoom = (rooms: Room[]) => {
    return rooms
      .map((room) => {
        const adults = Array(room.adults).fill('A').join('%2C')
        const children =
          room.childrenAges.length > 0
            ? room.childrenAges.map((age) => `%2C${age}`).join('')
            : ''

        return `${adults}${children}`
      })
      .join('%7C') // Room separator
  }

  return (
    <>
      {!isDesktop && (
        <div
          onClick={() => setOpen(true)}
          className={$.open}
          data-open={open}
          data-hidden={headerHidden}
        >
          <p className="title-h5 text-style-uppercase">{t('booking_mobile')}</p>
          <div className={$.open_icon}>
            <ChevronDown width="100%" height="100%" strokeWidth={1} />
          </div>
        </div>
      )}
      <div
        {...rest}
        className={clsx($.booking_bar, className)}
        ref={comp}
        data-active={open}
        data-hidden={headerHidden}
      >
        {!isDesktop && (
          <IconButton
            onClick={() => setOpen(false)}
            className={$.close}
            icon={<X width="100%" height="100%" strokeWidth={1} />}
          />
        )}
        <div className="main-wrapper">
          <Container>
            <Formik
              initialValues={{
                startDate: '',
                endDate: '',
                rooms: [{ adults: 2, children: 0, childrenAges: [] }]
              }}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                const url = `https://www.simplebooking.it/ibe2/hotel/9160?lang=${locale}&cur=CHF&in=${values.startDate}&out=${values.endDate}&guests=${parseRoom(values.rooms)}`
                window.open(url, '_blank', 'noopener,noreferrer')
                setSubmitting(false)
                resetForm()
              }}
            >
              {({
                values,
                handleSubmit,
                setFieldValue,
                isValid,
                dirty,
                isSubmitting
              }) => (
                <form onSubmit={handleSubmit} className={$.form}>
                  <Datepicker
                    label={t('booking_bar_start_date')}
                    onChange={(val) =>
                      setFieldValue(
                        'startDate',
                        val.toDate('UTC').toISOString().split('T')[0]
                      )
                    }
                  />
                  <Datepicker
                    label={t('booking_bar_end_date')}
                    onChange={(val) =>
                      setFieldValue(
                        'endDate',
                        val.toDate('UTC').toISOString().split('T')[0]
                      )
                    }
                  />
                  <RoomPeopleField
                    value={values.rooms}
                    onChange={(updatedRooms) =>
                      setFieldValue('rooms', updatedRooms)
                    }
                  />
                  <Button
                    type="submit"
                    isNext={false}
                    as={'button'}
                    disabled={
                      isSubmitting ||
                      !dirty ||
                      !isValid ||
                      values.startDate === '' ||
                      values.endDate === '' ||
                      values.rooms.length === 0
                    }
                  >
                    {t('booking_bar_send')}
                  </Button>
                </form>
              )}
            </Formik>
          </Container>
        </div>
      </div>
    </>
  )
}

export default BookingBar
