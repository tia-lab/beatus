import { ImageFragment } from '@/lib/fragments'

import { graphql } from '@/lib/query'

const RetreatCardFragment = graphql(
  /* GraphQL */ `
    fragment RetreatCardFragment on RetreatRecord @_unmask {
      id
      __typename
      _modelApiKey
      title
      shortDescription
      price
      date
      slug
      image {
        ...ImageFragment
      }
    }
  `,
  [ImageFragment]
)

export default RetreatCardFragment
