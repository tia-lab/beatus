import MediaBlockFragment from '@/lib/fragments/media-block'
import SectionPaddingFragment from '@/lib/fragments/section-padding'
import { graphql } from '@/lib/query'
const SectionHeroFragment = graphql(
  /* GraphQL */ `
    fragment SectionHeroFragment on SectionHeroRecord @_unmask {
      id
      breadcrumbs
      sectionId
      variants
      _modelApiKey
      sectionPadding {
        ...SectionPaddingFragment
      }
      title
      title2
      title3
      text
      mainMedia {
        ...MediaBlockFragment
      }
      smallMedia {
        ...MediaBlockFragment
      }
    }
  `,
  [MediaBlockFragment, SectionPaddingFragment]
)

export default SectionHeroFragment
