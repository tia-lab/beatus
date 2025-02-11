import MediaBlockFragment from '@/lib/fragments/media-block'
import SectionPaddingFragment from '@/lib/fragments/section-padding'

import { graphql } from '@/lib/query'

const SectionMediaFragment = graphql(
  /* GraphQL */ `
    fragment SectionMediaFragment on SectionMediaImageRecord @_unmask {
      id
      sectionId
      _modelApiKey
      sectionPadding {
        ...SectionPaddingFragment
      }
      media {
        ...MediaBlockFragment
      }
    }
  `,
  [SectionPaddingFragment, MediaBlockFragment]
)

export default SectionMediaFragment
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
