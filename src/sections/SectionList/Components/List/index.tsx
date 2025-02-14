'use client'

import { Button } from '@/components/Ui'
import { readFragment } from 'gql.tada'
import { useTranslations } from 'next-intl'
import { memo, useState } from 'react'
import { CardTypes, SectionListProps, Variant } from '../..'
import SectionListFragment from '../../query'
import $ from '../../style.module.scss'
import Cards from '../Cards'
interface ListProps extends SectionListProps {
  items: CardTypes[]
}

const List = ({ ...props }: ListProps) => {
  const { data, items } = props
  const d = readFragment(SectionListFragment, data)
  const variant = d.variant as Variant
  const ITEMS_PER_PAGE = d.pagination ? d?.paginationAmount : items.length
  const t = useTranslations()

  const [visibleItems, setVisibleItems] = useState<number>(
    ITEMS_PER_PAGE as number
  )

  const handleLoadMore = () => {
    setVisibleItems((prev: any) => prev + ITEMS_PER_PAGE)
  }

  return (
    <>
      <div className={$.list}>
        {items.slice(0, visibleItems).map((item, k) => (
          <Cards key={k} item={item} k={k} variant={variant} />
        ))}
      </div>
      {d.pagination && visibleItems < items.length && (
        <div className={$.load_more}>
          <Button onClick={handleLoadMore} isNext={false} as="button">
            {t('laod_more')}
          </Button>
        </div>
      )}
    </>
  )
}

export default memo(List)
