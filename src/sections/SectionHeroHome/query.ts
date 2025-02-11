import { graphql } from '@/lib/query'
const SectionHeroHomeFragment = graphql(/* GraphQL */ `
  fragment SectionHeroHomeFragment on SectionHeroHomeRecord @_unmask {
    __typename
    _modelApiKey
    title
    linkTo
  }
`)

export default SectionHeroHomeFragment
