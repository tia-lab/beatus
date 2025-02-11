import OfficeFragment from '@/lib/fragments/office'
import SectionPaddingFragment from '@/lib/fragments/section-padding'
import { graphql } from '@/lib/query'

const SectionOfficeFragment = graphql(
  /* GraphQL */ `
    fragment SectionOfficeFragment on SectionOfficeRecord {
      id
      title
      sectionId
      _modelApiKey
      sectionPadding {
        ...SectionPaddingFragment
      }
      mapZoom
      offices {
        ...OfficeFragment
      }
    }
  `,
  [OfficeFragment, SectionPaddingFragment]
)

export default SectionOfficeFragment
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
