import { graphql } from '@/lib/query'
import FaqCategoryFragment from '../faq-category'
import LinkFragment from '../link'

const FaqFragment = graphql(
  /* GraphQL */ `
    fragment FaqFragment on FaqRecord @_unmask {
      title
      description
      position
      category {
        ...FaqCategoryFragment
      }
      button {
        ...LinkFragment
      }
    }
  `,
  [LinkFragment, FaqCategoryFragment]
)

export default FaqFragment
