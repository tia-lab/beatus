import { graphql } from '@/lib/query'
import SectionAboutFragment from '@/sections/SectionAbout/query'
import SectionCtaFragment from '@/sections/SectionCta/query'
import SectionHeroFragment from '@/sections/SectionHero/query'
import SectionHeroHomeFragment from '@/sections/SectionHeroHome/query'
import SectionListFragment from '@/sections/SectionList/query'
import SectionSliderFragment from '@/sections/SectionSlider/query'
import SectionTextDisplayFragment from '@/sections/SectionTextDisplay/query'
import SectionTextImageFragment from '@/sections/SectionTextImage/query'

const SectionBuilderFragment = graphql(
  /* GraphQL */ `
    fragment SectionBuilderFragment on SectionBuilderRecord @_unmask {
      sectionBuilder {
        ...SectionHeroFragment
        ...SectionHeroHomeFragment
        ...SectionAboutFragment
        ...SectionCtaFragment
        ...SectionTextImageFragment
        ...SectionTextDisplayFragment
        ...SectionSliderFragment
        ...SectionListFragment
      }
    }
  `,
  [
    SectionHeroFragment,
    SectionHeroHomeFragment,
    SectionAboutFragment,
    SectionCtaFragment,
    SectionTextImageFragment,
    SectionTextDisplayFragment,
    SectionSliderFragment,
    SectionListFragment
  ]
)

export default SectionBuilderFragment
