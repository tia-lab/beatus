import { graphql } from '../../graphql'

const querySeason = graphql(/* GraphQL */ `
  query MyQuery {
    setting {
      season
    }
  }
`)

export default querySeason
