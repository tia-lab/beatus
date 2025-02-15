import ImageFragment from '@/lib/fragments/image'
import ParentTreeFragment from '@/lib/fragments/parent-tree/simple'
import { graphql } from '@/lib/query'
const SectionListingFragment = graphql(
  /* GraphQL */ `
    fragment SectionListingFragment on SectionListingRecord @_unmask {
      __typename
      _modelApiKey
      links {
        slug
        pageTitle
        image {
          ...ImageFragment
        }
        ...ParentTreeFragment
      }
    }
  `,
  [ImageFragment, ParentTreeFragment]
)

export default SectionListingFragment
