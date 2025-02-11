import { graphql } from '@/lib/query'
const SectionHeroFragment = graphql(/* GraphQL */ `
  fragment SectionHeroFragment on SectionHeroRecord @_unmask {
    breadcrumbs
    __typename
    _modelApiKey
    title
    text
    overline
  }
`)

export default SectionHeroFragment
