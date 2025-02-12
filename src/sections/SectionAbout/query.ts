import ImageFragment from '@/lib/fragments/image'
import LinkFragment from '@/lib/fragments/link'
import SectionPaddingFragment from '@/lib/fragments/section-padding'
import { graphql } from '@/lib/query'
const SectionAboutFragment = graphql(
  /* GraphQL */ `
    fragment SectionAboutFragment on SectionAboutRecord @_unmask {
      __typename
      _modelApiKey
      sectionPadding {
        ...SectionPaddingFragment
      }
      title
      subtitle
      text
      imageTop {
        ...ImageFragment
      }
      imageBottom {
        ...ImageFragment
      }
      button {
        ...LinkFragment
      }
    }
  `,
  [ImageFragment, LinkFragment, SectionPaddingFragment]
)

export default SectionAboutFragment
