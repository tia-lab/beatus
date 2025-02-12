import { ImageFragment } from '@/lib/fragments'
import { graphql } from '@/lib/query'
const SectionHeroHomeFragment = graphql(
  /* GraphQL */ `
    fragment SectionHeroHomeFragment on SectionHeroHomeRecord @_unmask {
      __typename
      _modelApiKey
      title(markdown: false)
      linkTo
      image {
        ...ImageFragment
      }
    }
  `,
  [ImageFragment]
)

export default SectionHeroHomeFragment
