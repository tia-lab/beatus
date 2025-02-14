'use client'

import RoomCardFragment from '@/lib/fragments/rooms/cards'
import { Lib } from '@/types'
import { memo } from 'react'
import { Tabs as AriaTabs, Tab, TabList, TabPanel } from 'react-aria-components'
import { CardTypes, SectionListProps, queryCategoryRooms } from '../..'
import $ from '../../style.module.scss'
import List from '../List'
interface TabsProps extends SectionListProps {
  categories: Lib.ResultOf<typeof queryCategoryRooms>['allRoomCategories']
  items: CardTypes[]
}

const Tabs = ({ ...props }: TabsProps) => {
  const { data, categories, items } = props

  //filter categories to macth only the items that have the same category id if not not display the category
  const filterCategories = (
    categories: TabsProps['categories'],
    items: Lib.FragmentOf<typeof RoomCardFragment>[]
  ) => {
    return categories.filter((category) => {
      return items.some((item) => item?.category?.id === category.id)
    })
  }

  return (
    <AriaTabs className={$.tabs}>
      <TabList aria-label="Rooms tabs" className={$.tab_list}>
        {
          //@ts-expect-error
          filterCategories(categories, items).map((category) => (
            <Tab key={category.id} id={category.id} className={$.tab}>
              {category.title}
              <div className={$.tab_line} />
            </Tab>
          ))
        }
      </TabList>
      <div className={$.tab_indicator}></div>
      {
        //@ts-expect-error
        filterCategories(categories, items).map((category) => (
          <TabPanel key={category.id} id={category.id} className="fade-in">
            <List
              data={data}
              items={items.filter(
                (item) =>
                  (item as Lib.FragmentOf<typeof RoomCardFragment>)?.category
                    ?.id === category.id
              )}
            />
          </TabPanel>
        ))
      }
    </AriaTabs>
  )
}

export default memo(Tabs)
