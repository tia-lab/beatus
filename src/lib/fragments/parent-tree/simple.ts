import { graphql } from '../../query/graphql'

const ParentTreeFragment = graphql(/* GraphQL */ `
  fragment ParentTreeFragment on PageRecord @_unmask {
    parent {
      slug
      id
      pageTitle
      parent {
        slug
        id
        pageTitle
        parent {
          slug
          id
          pageTitle
          parent {
            slug
            id
            pageTitle
            parent {
              slug
              id
              pageTitle
            }
          }
        }
      }
    }
  }
`)

export default ParentTreeFragment
