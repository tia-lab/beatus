import LinkFragment from '@/lib/fragments/link'
import SectionPaddingFragment from '@/lib/fragments/section-padding'

import { graphql } from '@/lib/query'

const SectionBannerFragment = graphql(
  /* GraphQL */ `
    fragment SectionBannerFragment on SectionBannerRecord @_unmask {
      id
      sectionId
      _modelApiKey
      sectionPadding {
        ...SectionPaddingFragment
      }
      text
      button {
        ...LinkFragment
      }
    }
  `,
  [SectionPaddingFragment, LinkFragment]
)

export default SectionBannerFragment
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
