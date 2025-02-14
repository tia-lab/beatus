import { CardPackage, CardRoom } from '@/components/Project'
import PackageCardFragment from '@/lib/fragments/packages/card'
import RoomCardFragment from '@/lib/fragments/rooms/cards'
import { Lib } from '@/types'
import { memo } from 'react'
import { CardTypes, Variant } from '../..'

interface CardsProps {
  item: CardTypes
  k: number
  variant: Variant
}

const Cards = ({ ...props }: CardsProps) => {
  const { item, k, variant } = props
  switch (variant) {
    case 'packages':
      return (
        <CardPackage
          key={k}
          data={item as Lib.FragmentOf<typeof PackageCardFragment>}
          transitionType="slide"
          href={`/packages/${item.slug}`}
          className="fade-in"
        />
      )
    case 'rooms':
      return (
        <CardRoom
          key={k}
          data={item as Lib.FragmentOf<typeof RoomCardFragment>}
          className="fade-in"
          button1Props={{
            transitionType: 'slide',
            href: `/rooms/${item.slug}`
          }}
          button2Props={{
            transitionType: 'slide',
            href: `/rooms/${item.slug}`
          }}
        />
      )
    default:
      return null
  }
}

export default memo(Cards)
