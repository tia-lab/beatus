import SectionPaddingFragment from '@/lib/fragments/section-padding'
import SectionTextSideBlockFragment from '@/lib/fragments/section-text-side-block'

import { graphql } from '@/lib/query'

const SectionTextFragment = graphql(
  /* GraphQL */ `
    fragment SectionTextFragment on SectionTextRecord {
      id
      sectionId
      _modelApiKey
      sectionPadding {
        ...SectionPaddingFragment
      }
      leadText
      text
      isSidebar
      stickySidebar
      sidebar {
        ...SectionTextSideBlockFragment
      }
    }
  `,
  [SectionPaddingFragment, SectionTextSideBlockFragment]
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
