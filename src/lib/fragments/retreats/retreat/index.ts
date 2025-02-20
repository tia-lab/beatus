import SectionBuilderDetailFragment from '@/components/Core/SectionBuilderDetail/query'
import { graphql } from '@/lib/query'
import ImageFragment from '../../image'
import RedirectLinkFragment from '../../redirect-link'
import DetailContentFragment from '../../structured-text/detail'
import TagFragment from '../../tag'

const RetreatFragment = graphql(
  /* GraphQL */ `
    fragment RetreatFragment on RetreatRecord @_unmask {
      _seoMetaTags {
        ...TagFragment
      }
      _allSlugLocales {
        locale
        value
      }
      redirect {
        ...RedirectLinkFragment
      }
      _allSlugLocales {
        locale
        value
      }
      overline
      title
      slug
      shortDescription
      price
      date
      shortDescription
      image {
        ...ImageFragment
      }
      gallery {
        ...ImageFragment
      }

      sectionBuilder {
        ...SectionBuilderDetailFragment
      }
      bookingBar
      content {
        id
        ...DetailContentFragment
      }
    }
  `,
  [
    RedirectLinkFragment,
    TagFragment,
    ImageFragment,
    SectionBuilderDetailFragment,
    ImageFragment,
    DetailContentFragment
  ]
)

export default RetreatFragment
