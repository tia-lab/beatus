import { ImageFragment } from '@/lib/fragments'

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
  [ImageFragment]
)

export default RoomCardFragment
