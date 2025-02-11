import { graphql } from '@/lib/query'

const FaqCategoryFragment = graphql(/* GraphQL */ `
  fragment FaqCategoryFragment on FaqCategoryRecord @_unmask {
    title
    id
  }
`)

export default FaqCategoryFragment
