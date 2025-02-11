import { graphql } from '@/lib/query'

const OfficeFragment = graphql(/* GraphQL */ `
  fragment OfficeFragment on OfficeRecord @_unmask {
    position
    title
    subtitle
    id
    googleDirectionsLink
    address
  }
`)

export default OfficeFragment
