import { graphql } from '@/lib/query'

const query = graphql(/* GraphQL */ `
  query Locales {
    _site {
      locales
    }
  }
`)

export default query
