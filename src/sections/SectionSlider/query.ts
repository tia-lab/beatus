import { ImageFragment, LinkFragment } from '@/lib/fragments'
import PackageCardFragment from '@/lib/fragments/packages/card'
import RoomCardFragment from '@/lib/fragments/rooms/cards'
import SectionPaddingFragment from '@/lib/fragments/section-padding'

import { graphql } from '@/lib/query'

const SectionSliderFragment = graphql(
  /* GraphQL */ `
    fragment SectionSliderFragment on SectionSliderRecord @_unmask {
      id
      __typename
      _modelApiKey
      variant
      sectionPadding {
        ...SectionPaddingFragment
      }
      overline
      title
      text
      button {
        ...LinkFragment
      }
      gallery {
        ...ImageFragment
      }
      allPackages
      packages {
        ...PackageCardFragment
      }
      allRooms
      rooms {
        ...RoomCardFragment
      }
    }
  `,
  [
    SectionPaddingFragment,
    LinkFragment,
    ImageFragment,
    PackageCardFragment,
    RoomCardFragment
  ]
)

export default SectionSliderFragment
