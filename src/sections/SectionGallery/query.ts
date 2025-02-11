import MediaBlockExternalFragment from '@/lib/fragments/media-block-external'
import SectionPaddingFragment from '@/lib/fragments/section-padding'

import { graphql } from '@/lib/query'

const SectionGalleryFragment = graphql(
  /* GraphQL */ `
    fragment SectionGalleryFragment on SectionGalleryRecord @_unmask {
      id
      sectionId
      _modelApiKey
      sectionPadding {
        ...SectionPaddingFragment
      }
      media {
        ...MediaBlockExternalFragment
      }
    }
  `,
  [SectionPaddingFragment, MediaBlockExternalFragment]
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
