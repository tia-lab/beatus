import SectionPaddingFragment from '@/lib/fragments/section-padding'

import { graphql } from '@/lib/query'

const SectionPrivacyFragment = graphql(
  /* GraphQL */ `
    fragment SectionPrivacyFragment on SectionPrivacyRecord @_unmask {
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

export default SectionPrivacyFragment
