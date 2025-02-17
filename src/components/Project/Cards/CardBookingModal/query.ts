import ImageFragment from '@/lib/fragments/image'
import LinkFragment from '@/lib/fragments/link'
import { graphql } from '@/lib/query'

const CardBookinModalFragment = graphql(
  /* GraphQL */ `
    fragment CardBookinModalFragment on BookingModalCardRecord @_unmask {
      id
      title
      link {
        ...LinkFragment
      }
      image {
        ...ImageFragment
      }
    }
  `,
  [LinkFragment, ImageFragment]
)

export default CardBookinModalFragment
