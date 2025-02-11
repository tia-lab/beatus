import SectionPaddingFragment from '@/lib/fragments/section-padding'

import { graphql } from '@/lib/query'

const SectionTextFragment = graphql(
  /* GraphQL */ `
    fragment SectionTextFragment on SectionTextRecord {
      id
      _modelApiKey
      sectionPadding {
        ...SectionPaddingFragment
      }
    }
  `,
  [SectionPaddingFragment]
)

export default SectionTextFragment
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
