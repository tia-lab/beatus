import { Container, Section } from '@/components/Core'
import { SectionBuilderProps } from '@/components/Core/SectionBuilder'
import PackageCardFragment from '@/lib/fragments/packages/card'
import RoomCardFragment from '@/lib/fragments/rooms/cards'
import {
  executeQuery,
  executeQueryWithAutoPagination,
  graphql
} from '@/lib/query'
import { Lib } from '@/types'
import {} from '@datocms/cda-client'
import { readFragment } from 'gql.tada'
import { memo } from 'react'
import queryAllPackages from '../SectionSlider/Components/SliderCards/queries/packages'
import queryAllRooms from '../SectionSlider/Components/SliderCards/queries/rooms'
import List from './Components/List'
import Tabs from './Components/Tabs'
import SectionListFragment from './query'
import $ from './style.module.scss'

export const queryCategoryRooms = graphql(`
  query roomsCategory {
    allRoomCategories {
      id
      title
    }
  }
`)

export interface SectionListProps {
  data: Lib.FragmentOf<typeof SectionListFragment>
  params?: SectionBuilderProps['params']
}

export type CardTypes =
  | Lib.FragmentOf<typeof PackageCardFragment>
  | Lib.FragmentOf<typeof RoomCardFragment>

export type Variant = 'rooms' | 'packages'

const SectionList = async ({ data }: SectionListProps) => {
  const d = readFragment(SectionListFragment, data)
  const roomCategories = d.roomCategories
  const _allCategoriesData = await executeQuery(queryCategoryRooms)
  const categories = _allCategoriesData.allRoomCategories

  const variant = d.variant as Variant

  const filterRooms = (items: Lib.FragmentOf<typeof RoomCardFragment>[]) => {
    if (d.filterRoomCategories) {
      return items.filter((item) => {
        return roomCategories.some(
          (category) => category.id === item?.category?.id
        )
      })
    }
    return items
  }

  let items = [] as CardTypes[]
  switch (d.variant as Variant) {
    case 'packages':
      if (d.allPackages) {
        const data = await executeQueryWithAutoPagination(queryAllPackages)
        items = data.allPackages
      } else {
        items = d.packages
      }
      break
    case 'rooms':
      if (d.allRooms) {
        const data = await executeQueryWithAutoPagination(queryAllRooms)
        items = filterRooms(data.allRooms)
      } else {
        items = filterRooms(d.rooms)
      }
      break
    default:
      return []
  }

  return (
    <Section
      padding={d.sectionPadding}
      className={$.section}
      anim="section-fade-in"
    >
      <Container className="relative" anim="section-fade-in">
        {variant === 'rooms' && d.roomListLayout === 'list' ? (
          <List data={data} items={items} />
        ) : (
          <Tabs categories={categories} data={data} items={items} />
        )}
        {variant === 'packages' && <List data={data} items={items} />}
      </Container>
    </Section>
  )
}

export default memo(SectionList)
