import { BaseLink, Image, Parse } from '@/components/Core'
import { BaseLinkProps } from '@/components/Core/types'
import RetreatCardFragment from '@/lib/fragments/retreats/card'
import { Lib } from '@/types'
import clsx from 'clsx'
import { readFragment } from 'gql.tada'
import { memo } from 'react'
import $ from './style.module.scss'

export interface CardRetreatProps extends BaseLinkProps {
  data: Lib.FragmentOf<typeof RetreatCardFragment>
}

const CardRetreat = ({ ...props }: CardRetreatProps) => {
  const { data, className, ...rest } = props

  const d = readFragment(RetreatCardFragment, data)

  return (
    <BaseLink className={clsx($.card, className)} {...rest}>
      <Image
        data={d.image}
        fitWrap
        wrap={{ className: $.image }}
        ar="16x9"
        sizes="40rem"
      />
      <div className={$.content}>
        <div className={$.head}>
          <div className={$.title}>
            <Parse html={d.title} excludeTags={['p']} />
          </div>
          <div className="text-neutral-400">
            <Parse html={d.price} />
            <Parse html={d.date} />
          </div>
        </div>
        <p>{d.shortDescription}</p>
      </div>
    </BaseLink>
  )
}

export default memo(CardRetreat)
