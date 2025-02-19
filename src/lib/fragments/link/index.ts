import { graphql } from '../../query/graphql'
import ParentTreeFragment from '../parent-tree/simple'

const LinkFragment = graphql(
  /* GraphQL */ `
    fragment LinkFragment on LinkRecord @_unmask {
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
        ... on RoomRecord {
          id
          slug
          title
          _modelApiKey
        }
      }
      externalUrl
      isExternal
      text
      targetBlank
      urlParams
      titleText
      _modelApiKey
    }
  `,
  [ParentTreeFragment]
)

export default LinkFragment
