import { graphql } from '@/lib/query'

const SpacerFragment = graphql(/* GraphQL */ `
  fragment SpacerFragment on SpacerRecord @_unmask {
    space
  }
`)

export default SpacerFragment
