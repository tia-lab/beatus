import SectionBuilderDetailFragment from '@/components/Core/SectionBuilderDetail/query'
import { graphql } from '@/lib/query'
import ImageFragment from '../../image'
import RedirectLinkFragment from '../../redirect-link'
import TagFragment from '../../tag'

const RoomFragment = graphql(
  /* GraphQL */ `
    fragment RoomFragment on RoomRecord @_unmask {
      _seoMetaTags {
        ...TagFragment
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
      description
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
    }
  `,
  [
    RedirectLinkFragment,
    TagFragment,
    ImageFragment,
    SectionBuilderDetailFragment
  ]
)

export default RoomFragment
