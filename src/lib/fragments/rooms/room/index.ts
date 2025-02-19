import SectionBuilderDetailFragment from '@/components/Core/SectionBuilderDetail/query'
import { graphql } from '@/lib/query'
import ImageFragment from '../../image'
import LinkFragment from '../../link'
import RedirectLinkFragment from '../../redirect-link'
import DetailContentFragment from '../../structured-text/detail'
import TagFragment from '../../tag'

const RoomFragment = graphql(
  /* GraphQL */ `
    fragment RoomFragment on RoomRecord @_unmask {
      _seoMetaTags {
        ...TagFragment
      }
      requestLink {
        ...LinkFragment
      }
      _allSlugLocales {
        locale
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
      size
      people
      shortDescription
      image {
        ...ImageFragment
      }
      gallery {
        ...ImageFragment
      }
      category {
        title
      }
      amenities {
        title
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
    DetailContentFragment,
    LinkFragment
  ]
)

export default RoomFragment
