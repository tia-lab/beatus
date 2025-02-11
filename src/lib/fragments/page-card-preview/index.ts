import { graphql } from '@/lib/query'
import ImageFragment from '../image'
import ParentTreeFragment from '../parent-tree/simple'

const PageCardPreviewFragment = graphql(
  /* GraphQL */ `
    fragment PageCardPreviewFragment on PageRecord @_unmask {
      pageTitle
      excerpt
      slug
      _modelApiKey
      image {
        ...ImageFragment
      }
      ...ParentTreeFragment
    }
  `,
  [ParentTreeFragment, ImageFragment]
)

export default PageCardPreviewFragment
