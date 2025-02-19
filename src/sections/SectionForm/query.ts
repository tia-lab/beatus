import FormFragment from '@/lib/fragments/forms/form'
import SectionPaddingFragment from '@/lib/fragments/section-padding'
import { graphql } from '@/lib/query'
const SectionFormFragment = graphql(
  /* GraphQL */ `
    fragment SectionFormFragment on SectionFormRecord @_unmask {
      __typename
      _modelApiKey
      sectionPadding {
        ...SectionPaddingFragment
      }
      form {
        ...FormFragment
      }
    }
  `,
  [FormFragment, SectionPaddingFragment]
)

export default SectionFormFragment
