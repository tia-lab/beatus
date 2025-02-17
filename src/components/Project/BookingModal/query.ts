import { ImageFragment, LinkFragment } from '@/lib/fragments'
import { graphql } from '@/lib/query'
import CardBookinModalFragment from '../Cards/CardBookingModal/query'

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
            ...CardBookinModalFragment
          }
        }
      }
    }
  `,
  [ImageFragment, LinkFragment, CardBookinModalFragment]
)

export default bookingModalQuery
