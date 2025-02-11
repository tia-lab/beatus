import { graphql } from '@/lib/query'

const AnchorLinkFragment = graphql(/* GraphQL */ `
  fragment AnchorLinkFragment on AnchorLinkRecord @_unmask {
    text
    anchorId
  }
`)

export default AnchorLinkFragment
