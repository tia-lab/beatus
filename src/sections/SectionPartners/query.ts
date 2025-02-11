import PartnerBlockFragment from '@/lib/fragments/partner-block'
import SectionPaddingFragment from '@/lib/fragments/section-padding'

import { graphql } from '@/lib/query'

const SectionPartnersFragment = graphql(
  /* GraphQL */ `
    fragment SectionPartnersFragment on SectionPartnerRecord @_unmask {
      id
      sectionId
      _modelApiKey
      title
      sectionPadding {
        ...SectionPaddingFragment
      }
      partners {
        ...PartnerBlockFragment
      }
    }
  `,
  [SectionPaddingFragment, PartnerBlockFragment]
)

export default SectionPartnersFragment
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
