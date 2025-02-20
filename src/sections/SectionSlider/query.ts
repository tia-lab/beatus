import { ImageFragment, LinkFragment } from '@/lib/fragments'
import RetreatCardFragment from '@/lib/fragments/retreats/card'
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
        ...RetreatCardFragment
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
    RetreatCardFragment,
    RoomCardFragment
  ]
)

export default SectionSliderFragment
