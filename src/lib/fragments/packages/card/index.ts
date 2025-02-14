import { ImageFragment } from '@/lib/fragments'

import { graphql } from '@/lib/query'

const PackageCardFragment = graphql(
  /* GraphQL */ `
    fragment PackageCardFragment on PackageRecord @_unmask {
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

export default PackageCardFragment
