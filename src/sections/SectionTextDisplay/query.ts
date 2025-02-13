import { LinkFragment } from '@/lib/fragments'
import SectionPaddingFragment from '@/lib/fragments/section-padding'

import { graphql } from '@/lib/query'

const SectionTextDisplayFragment = graphql(
  /* GraphQL */ `
    fragment SectionTextDisplayFragment on SectionTextDisplayRecord {
      id
      __typename
      _modelApiKey
      sectionPadding {
        ...SectionPaddingFragment
      }
      variant
      overline
      title
      text
      textColTwo
      button {
        ...LinkFragment
      }
    }
  `,
  [SectionPaddingFragment, LinkFragment]
)

export default SectionTextDisplayFragment
// richeTextSimple {
//   value
//   blocks {
//     ... on RecordInterface {
//       id
//       __typename
//     }
//     ... on ImageBlockRecord {
//       ...ImageBlockFragment
//     }
//     ... on ImageGalleryBlockRecord {
//       ...ImageGalleryBlockFragment
//     }
//     ... on VideoBlockRecord {
//       ...VideoBlockFragment
//     }
//   }
// }
