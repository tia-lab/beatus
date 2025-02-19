import { graphql } from '@/lib/query'
import ImageFragment from '../image'
import LinkFragment from '../link'
import SpacerFragment from '../spacer'

const DetailContentFragment = graphql(
  /* GraphQL */ `
    fragment DetailContentFragment on DetailContentRecord @_unmask {
      content {
        value
        blocks {
          ... on ImageBlockRecord {
            id
            __typename
            ...ImageFragment
          }
          ... on LinkRecord {
            id
            __typename
            ...LinkFragment
          }
          ... on SpacerRecord {
            id
            __typename
            ...SpacerFragment
          }
        }
      }
    }
  `,
  [ImageFragment, LinkFragment, SpacerFragment]
)

export default DetailContentFragment
