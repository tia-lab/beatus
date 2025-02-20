import { ImageFragment, LinkFragment } from '@/lib/fragments'

import { graphql } from '@/lib/query'

const RoomCardFragment = graphql(
  /* GraphQL */ `
    fragment RoomCardFragment on RoomRecord @_unmask {
      id
      __typename
      _modelApiKey
      title
      shortDescription
      slug
      people
      requestLink {
        ...LinkFragment
      }
      size
      category {
        title
        id
      }
      image {
        ...ImageFragment
      }
      category {
        title
      }
      amenities {
        title
        icon
      }
    }
  `,
  [ImageFragment, LinkFragment]
)

export default RoomCardFragment
