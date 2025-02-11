'use client'

import { Image } from '@/components/Core'
import { ImageFragment } from '@/lib/fragments'
import TeamMemberFragment from '@/lib/fragments/team-member'
import { Lib } from '@/types'
import { MEDIA } from '@config'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { HTMLAttributes, memo } from 'react'
import $ from './style.module.scss'

export interface CardTeamProps extends HTMLAttributes<HTMLDivElement> {
  data: Lib.FragmentOf<typeof TeamMemberFragment>
}

const CardTeam = ({ data, className, ...props }: CardTeamProps) => {
  const translations = useTranslations()

  return (
    <div className={clsx($.card_team, className)} {...props}>
      <Image
        data={data.image as Lib.FragmentOf<typeof ImageFragment>}
        wrap={{ className: $.image }}
        imgClassName={$.image_img}
        fitWrap
        sizes={`${MEDIA.tablet} 18rem, 22rem`}
        ar="1x1"
      />
      <div className={$.content}>
        <p className={clsx('title-h3', $.title)}>{data.name}</p>
        <div className={$.categories}>
          <div className={$.category}>
            <p className="font-weight-700">
              {translations('team_card_departement')}
            </p>
            <p>{data.departements.map((el) => el.title).join(', ')}</p>
          </div>
          <div className={$.category_divider} />
          <div className={$.category}>
            <p className="font-weight-700">
              {translations('team_card_discipline')}
            </p>
            <p>{data.disciplines.map((el) => el.title).join(', ')}</p>
          </div>
          <div className={$.category_divider} />
          {/*  <div className={$.category}>
            <p className="font-weight-700">
              {translations('team_card_nationality')}
            </p>
            <p>{data.nationality.map((el) => el.nationality).join(', ')}</p>
          </div> 
          <div className={$.category_divider} />*/}
          <div className={$.category}>
            <p className="font-weight-700">
              {translations('team_card_language')}
            </p>
            <p>{data.languages.map((el) => el.language).join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(CardTeam)
