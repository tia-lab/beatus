import PackageCardFragment from '@/lib/fragments/packages/card'
import RoomCardFragment from '@/lib/fragments/rooms/cards'
import SectionPaddingFragment from '@/lib/fragments/section-padding'

import { graphql } from '@/lib/query'

const SectionListFragment = graphql(
  /* GraphQL */ `
    fragment SectionListFragment on SectionListRecord {
      id
      __typename
      _modelApiKey
      sectionPadding {
        ...SectionPaddingFragment
      }
      variant
      allRooms
      rooms {
        ...RoomCardFragment
      }
      roomListLayout
      allPackages
      filterRoomCategories
      roomCategories {
        id
        title
      }
      packages {
        ...PackageCardFragment
      }
      pagination
      paginationAmount
    }
  `,
  [SectionPaddingFragment, RoomCardFragment, PackageCardFragment]
)

export default SectionListFragment
