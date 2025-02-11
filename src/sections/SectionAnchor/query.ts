import AnchorLinkFragment from '@/lib/fragments/anchor-link'
import SectionPaddingFragment from '@/lib/fragments/section-padding'

import { graphql } from '@/lib/query'

const SectionAnchorFragment = graphql(
  /* GraphQL */ `
    fragment SectionAnchorFragment on SectionAnchorLinkRecord @_unmask {
      id
      anchorLinks {
        ...AnchorLinkFragment
      }
      _modelApiKey
      sectionPadding {
        ...SectionPaddingFragment
      }
    }
  `,
  [SectionPaddingFragment, AnchorLinkFragment]
)

export default SectionAnchorFragment
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
