import { graphql } from '@/lib/query'
import SectionAboutFragment from '@/sections/SectionAbout/query'
import SectionCtaFragment from '@/sections/SectionCta/query'
import SectionHeroFragment from '@/sections/SectionHero/query'
import SectionHeroHomeFragment from '@/sections/SectionHeroHome/query'
import SectionSliderGalleryFragment from '@/sections/SectionSliderGallery/query'
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
        ...SectionSliderGalleryFragment
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
    SectionSliderGalleryFragment
  ]
)

export default SectionBuilderFragment
