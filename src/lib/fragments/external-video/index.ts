import { graphql } from '@/lib/query'

const ExternalVideoFragment = graphql(/* GraphQL */ `
  fragment ExternalVideoFragment on VideoField @_unmask {
    provider
    height
    providerUid
    thumbnailUrl
    title
    url
    width
  }
`)

export default ExternalVideoFragment
