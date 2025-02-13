import ImageFragment from '@/lib/fragments/image'
import LinkFragment from '@/lib/fragments/link'
import SectionPaddingFragment from '@/lib/fragments/section-padding'
import { graphql } from '@/lib/query'
const SectionTextImageFragment = graphql(
  /* GraphQL */ `
    fragment SectionTextImageFragment on SectionTextImageRecord @_unmask {
      __typename
      _modelApiKey
      sectionPadding {
        ...SectionPaddingFragment
      }
      title
      variant
      text
      image {
        ...ImageFragment
      }
      button {
        ...LinkFragment
      }
    }
  `,
  [ImageFragment, LinkFragment, SectionPaddingFragment]
)

export default SectionTextImageFragment
