import { ImageFragment, LinkFragment } from '@/lib/fragments'
import SectionPaddingFragment from '@/lib/fragments/section-padding'

import { graphql } from '@/lib/query'

const SectionSliderGalleryFragment = graphql(
  /* GraphQL */ `
    fragment SectionSliderGalleryFragment on SectionSliderGalleryRecord
    @_unmask {
      id
      __typename
      _modelApiKey
      sectionPadding {
        ...SectionPaddingFragment
      }
      overline
      title
      text
      button {
        ...LinkFragment
      }
      galery {
        ...ImageFragment
      }
    }
  `,
  [SectionPaddingFragment, LinkFragment, ImageFragment]
)

export default SectionSliderGalleryFragment
