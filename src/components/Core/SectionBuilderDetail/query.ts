import { graphql } from '@/lib/query'
import SectionCtaFragment from '@/sections/SectionCta/query'
import SectionFaqFragment from '@/sections/SectionFaq/query'
import SectionSliderFragment from '@/sections/SectionSlider/query'
import SectionTextDisplayFragment from '@/sections/SectionTextDisplay/query'

const SectionBuilderDetailFragment = graphql(
  /* GraphQL */ `
    fragment SectionBuilderDetailFragment on SectionBuilderDetailRecord
    @_unmask {
      sectionBuilder {
        ...SectionCtaFragment
        ...SectionTextDisplayFragment
        ...SectionSliderFragment
        ...SectionFaqFragment
      }
    }
  `,
  [
    SectionCtaFragment,
    SectionTextDisplayFragment,
    SectionSliderFragment,
    SectionFaqFragment
  ]
)

export default SectionBuilderDetailFragment
