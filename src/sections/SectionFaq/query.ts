import { FaqFragment } from '@/lib/fragments'
import LinkFragment from '@/lib/fragments/link'
import SectionPaddingFragment from '@/lib/fragments/section-padding'
import { graphql } from '@/lib/query'

const SectionFaqFragment = graphql(
  /* GraphQL */ `
    fragment SectionFaqFragment on SectionFaqRecord {
      id
      sectionId
      _modelApiKey
      sectionPadding {
        ...SectionPaddingFragment
      }
      title
      pickFromCategory
      useTitleFromCategory
      categories {
        title
        id
      }
      faqs {
        ...FaqFragment
      }
      bottomButton {
        ...LinkFragment
      }
      bottomText
    }
  `,
  [FaqFragment, LinkFragment, SectionPaddingFragment]
)

export default SectionFaqFragment
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
