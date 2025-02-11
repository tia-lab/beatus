import { graphql } from '@/lib/query'
import ImageFragment from '../image'

const PartnerBlockFragment = graphql(
  /* GraphQL */ `
    fragment PartnerBlockFragment on PartnerBlockRecord @_unmask {
      image {
        ...ImageFragment
      }
      link
    }
  `,
  [ImageFragment]
)

export default PartnerBlockFragment
