import { ImageFragment, LinkFragment } from '@/lib/fragments'
import { graphql } from '@/lib/query'

const bookingModalQuery = graphql(
  /* GraphQL */ `
    query BookingModalQuery($locale: SiteLocale = de) {
      bookingModal(fallbackLocales: de, locale: $locale) {
        id
        _modelApiKey
        title
        tabs {
          title
          id
          cards {
            id
            title
            image {
              ...ImageFragment
            }
            link {
              ...LinkFragment
            }
          }
        }
      }
    }
  `,
  [ImageFragment, LinkFragment]
)

export default bookingModalQuery
