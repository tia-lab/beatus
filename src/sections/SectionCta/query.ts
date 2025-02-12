import ImageFragment from '@/lib/fragments/image'
import LinkFragment from '@/lib/fragments/link'
import SectionPaddingFragment from '@/lib/fragments/section-padding'
import { graphql } from '@/lib/query'
const SectionCtaFragment = graphql(
  /* GraphQL */ `
    fragment SectionCtaFragment on SectionCtaRecord @_unmask {
      __typename
      _modelApiKey
      sectionPadding {
        ...SectionPaddingFragment
      }
      title
      subtitle
      text
      variant
      overline
      button {
        ...LinkFragment
      }
      image {
        ...ImageFragment
      }
    }
  `,
  [ImageFragment, LinkFragment, SectionPaddingFragment]
)

export default SectionCtaFragment
