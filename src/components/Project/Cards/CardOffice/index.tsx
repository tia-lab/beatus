'use client'

import { Button } from '@/components/Ui'
import OfficeFragment from '@/lib/fragments/office'

import { formatAddress } from '@/lib/text'
import { useStoreCursor } from '@/store'
import { Dato, Lib } from '@/types'
import { useTranslations } from 'next-intl'
import { HTMLAttributes } from 'react'
import $ from './style.module.scss'

interface CardOfficeData extends Lib.FragmentOf<typeof OfficeFragment> {
  address: Dato.DatoAddress['address']
}

export interface CardOfficeProps extends HTMLAttributes<HTMLDivElement> {
  data: CardOfficeData
}

const CardOffice = ({ data, ...props }: CardOfficeProps) => {
  const { setHoverDefault } = useStoreCursor()

  const { line1, line2 } = formatAddress(data.address.formatted_address)
  const t = useTranslations()
  return (
    <div
      {...props}
      className={$.card_office}
      onMouseLeave={() => setHoverDefault(false)}
      onMouseEnter={() => setHoverDefault(true)}
    >
      <div className={$.content}>
        <p className="title-h5">{data.title}</p>

        {data.subtitle && (
          <p className="text-small text-neutral-500 font-weight-700">
            {data.subtitle}
          </p>
        )}
        {line1 && <p className="text-small text-neutral-500">{line1}</p>}
        {line2 && <p className="text-small text-neutral-500">{line2}</p>}
      </div>
      {data.googleDirectionsLink && (
        <Button
          variant="text"
          className={$.button}
          isNext={false}
          size="small"
          icon="lucide:arrow-up-right"
          target="_blank"
          href={data.googleDirectionsLink}
        >
          {t('section_offices_google_link')}
        </Button>
      )}
    </div>
  )
}

export default CardOffice
