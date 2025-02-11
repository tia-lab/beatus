import SectionPaddingFragment from '@/lib/fragments/section-padding'

import { graphql } from '@/lib/query'

const SectionNewsletterFormFragment = graphql(
  /* GraphQL */ `
    fragment SectionNewsletterFormFragment on SectionNewsletterFormRecord
    @_unmask {
      id
      sectionId
      _modelApiKey
      sectionPadding {
        ...SectionPaddingFragment
      }
    }
  `,
  [SectionPaddingFragment]
)

export default SectionNewsletterFormFragment
