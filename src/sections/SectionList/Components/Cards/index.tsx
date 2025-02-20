import { CardRetreat, CardRoom } from '@/components/Project'
import RetreatCardFragment from '@/lib/fragments/retreats/card'
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
        <CardRetreat
          key={k}
          data={item as Lib.FragmentOf<typeof RetreatCardFragment>}
          transitionType="slide"
          href={`/retreat/${item.slug}`}
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
