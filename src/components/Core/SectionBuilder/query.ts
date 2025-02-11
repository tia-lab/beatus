import { graphql } from '@/lib/query'
import SectionHeroFragment from '@/sections/SectionHero/query'
import SectionHeroHomeFragment from '@/sections/SectionHeroHome/query'
const SectionBuilderFragment = graphql(
  /* GraphQL */ `
    fragment SectionBuilderFragment on SectionBuilderRecord @_unmask {
      sectionBuilder {
        ...SectionHeroFragment
        ...SectionHeroHomeFragment
      }
    }
  `,
  [SectionHeroFragment, SectionHeroHomeFragment]
)

export default SectionBuilderFragment
