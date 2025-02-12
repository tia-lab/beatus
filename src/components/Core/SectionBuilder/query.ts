import { graphql } from '@/lib/query'
import SectionAboutFragment from '@/sections/SectionAbout/query'
import SectionCtaFragment from '@/sections/SectionCta/query'
import SectionHeroFragment from '@/sections/SectionHero/query'
import SectionHeroHomeFragment from '@/sections/SectionHeroHome/query'
const SectionBuilderFragment = graphql(
  /* GraphQL */ `
    fragment SectionBuilderFragment on SectionBuilderRecord @_unmask {
      sectionBuilder {
        ...SectionHeroFragment
        ...SectionHeroHomeFragment
        ...SectionAboutFragment
        ...SectionCtaFragment
      }
    }
  `,
  [
    SectionHeroFragment,
    SectionHeroHomeFragment,
    SectionAboutFragment,
    SectionCtaFragment
  ]
)

export default SectionBuilderFragment
