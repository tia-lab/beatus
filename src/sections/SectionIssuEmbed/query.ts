import SectionPaddingFragment from '@/lib/fragments/section-padding'

import { graphql } from '@/lib/query'

const SectionIssuuFragment = graphql(
  /* GraphQL */ `
    fragment SectionIssuuFragment on SectionIssuuRecord @_unmask {
      id
      sectionId
      _modelApiKey
      sectionPadding {
        ...SectionPaddingFragment
      }
      src
    }
  `,
  [SectionPaddingFragment]
)

export default SectionIssuuFragment
