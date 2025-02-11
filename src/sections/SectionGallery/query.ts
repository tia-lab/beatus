import SectionPaddingFragment from '@/lib/fragments/section-padding'

import { graphql } from '@/lib/query'

const SectionGalleryFragment = graphql(
  /* GraphQL */ `
    fragment SectionGalleryFragment on SectionGalleryRecord @_unmask {
      id
      _modelApiKey
      sectionPadding {
        ...SectionPaddingFragment
      }
    }
  `,
  [SectionPaddingFragment]
)

export default SectionGalleryFragment
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
