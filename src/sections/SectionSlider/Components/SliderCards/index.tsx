import PackageCardFragment from '@/lib/fragments/packages/card'
import RoomCardFragment from '@/lib/fragments/rooms/cards'
import { executeQueryWithAutoPagination } from '@/lib/query'
import { Lib } from '@/types'
import { readFragment } from 'gql.tada'
import { memo } from 'react'
import { SectionSliderProps, Variants } from '../..'
import SectionSliderFragment from '../../query'
import SliderCardsClient from './Client'
import queryAllPackages from './queries/packages'
import queryAllRooms from './queries/rooms'

export type CardTypes =
  | Lib.FragmentOf<typeof PackageCardFragment>
  | Lib.FragmentOf<typeof RoomCardFragment>

export interface SliderCardsProps {
  data: Omit<SectionSliderProps, 'params'>
}

const SliderCards = async ({ data }: SliderCardsProps) => {
  //@ts-ignore
  const d = readFragment(SectionSliderFragment, data)

  const variant: Variants = d.variant as Variants

  let elements = [] as CardTypes[]

  switch (variant) {
    case 'packages':
      if (d.allPackages) {
        const data = await executeQueryWithAutoPagination(queryAllPackages)
        elements = data.allPackages
      } else {
        elements = d.packages
      }
      break
    case 'rooms':
      if (d.allRooms) {
        const data = await executeQueryWithAutoPagination(queryAllRooms)
        elements = data.allRooms
      } else {
        elements = d.rooms
      }
      break
    default:
      return []
  }

  return <SliderCardsClient data={data} elements={elements} />
}

export default memo(SliderCards)
