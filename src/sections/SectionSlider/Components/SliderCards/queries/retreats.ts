import RetreatCardFragment from '@/lib/fragments/retreats/card'
import { graphql } from '@/lib/query'

const queryAllRetreats = graphql(
  /* GraphQL */ `
    query query {
      allRetreats {
        ...RetreatCardFragment
      }
    }
  `,
  [RetreatCardFragment]
)

export default queryAllRetreats
