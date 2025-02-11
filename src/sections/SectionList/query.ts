import PageCardPreviewFragment from '@/lib/fragments/page-card-preview'
import SectionPaddingFragment from '@/lib/fragments/section-padding'
import { graphql } from '@/lib/query'

const SectionListFragment = graphql(
  /* GraphQL */ `
    fragment SectionListFragment on SectionListRecord @_unmask {
      id
      sectionId
      _modelApiKey
      sectionPadding {
        ...SectionPaddingFragment
      }
      title
      variant
      pages {
        ...PageCardPreviewFragment
      }
    }
  `,
  [SectionPaddingFragment, PageCardPreviewFragment]
)

export default SectionListFragment
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
