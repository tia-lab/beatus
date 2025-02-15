import { executeQuery } from '@/lib/query'
import { I18N, Locale } from '@config'
import { getLocale } from 'next-intl/server'
import { memo } from 'react'
import Client from './index.client'
import bookingModalQuery from './query'

export interface BookingModalProps {}

const BookingModal = async ({ ...props }: BookingModalProps) => {
  const locale = (await getLocale()) as Locale
  const data = await executeQuery(bookingModalQuery, {
    variables: {
      locale: locale,
      fallbackLocales: I18N.fallbackLocales as any
    }
  })

  return <Client data={data} {...props} />
}

export default memo(BookingModal)
