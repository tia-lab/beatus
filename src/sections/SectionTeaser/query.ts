import ImageFragment from '@/lib/fragments/image'
import LinkFragment from '@/lib/fragments/link'
import SectionPaddingFragment from '@/lib/fragments/section-padding'
import { graphql } from '@/lib/query'

const SectionTeaserFragment = graphql(
  /* GraphQL */ `
    fragment SectionTeaserFragment on SectionTeaserRecord {
      id
      sectionId
      title
      _modelApiKey
      sectionPadding {
        ...SectionPaddingFragment
      }
      title
      subtitle
      text
      button {
        ...LinkFragment
      }
      image {
        ...ImageFragment
      }
      imageSmall {
        ...ImageFragment
      }
    }
  `,
  [LinkFragment, ImageFragment, SectionPaddingFragment]
)

export default SectionTeaserFragment
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
