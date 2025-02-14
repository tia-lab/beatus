import { BaseLink, Image, Parse } from '@/components/Core'
import { BaseLinkProps } from '@/components/Core/types'
import PackageCardFragment from '@/lib/fragments/packages/card'
import { Lib } from '@/types'
import clsx from 'clsx'
import { readFragment } from 'gql.tada'
import { memo } from 'react'
import $ from './style.module.scss'

export interface CardPackageProps extends BaseLinkProps {
  data: Lib.FragmentOf<typeof PackageCardFragment>
}

const CardPackage = ({ ...props }: CardPackageProps) => {
  const { data, className, ...rest } = props

  const d = readFragment(PackageCardFragment, data)

  return (
    <BaseLink className={clsx($.card, className)} {...rest}>
      <Image data={d.image} fitWrap wrap={{ className: $.image }} ar="16x9" />
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

export default memo(CardPackage)
