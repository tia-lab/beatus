import ExternalVideoFragment from '@/lib/fragments/external-video'
import SectionPaddingFragment from '@/lib/fragments/section-padding'

import { graphql } from '@/lib/query'

const SectionVideoFragment = graphql(
  /* GraphQL */ `
    fragment SectionVideoFragment on SectionVideoRecord @_unmask {
      id
      sectionId
      _modelApiKey
      sectionPadding {
        ...SectionPaddingFragment
      }
      video {
        ...ExternalVideoFragment
      }
    }
  `,
  [SectionPaddingFragment, ExternalVideoFragment]
)

export default SectionVideoFragment
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
