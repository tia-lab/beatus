import { graphql } from '../../query/graphql'
import ParentTreeFragment from '../parent-tree/simple'

const RedirectLinkFragment = graphql(
  /* GraphQL */ `
    fragment RedirectLinkFragment on RedirectLinkRecord @_unmask {
      url {
        ... on HomeRecord {
          id
          _modelApiKey
        }
        ... on PageRecord {
          id
          slug
          pageTitle
          _modelApiKey
          ...ParentTreeFragment
        }
      }
      externalUrl
      isExternal
    }
  `,
  [ParentTreeFragment]
)

export default RedirectLinkFragment
