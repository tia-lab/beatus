import { graphql } from '../../query/graphql'

const ParentTreeFragmentAllLocales = graphql(/* GraphQL */ `
  fragment ParentTreeFragmentAllLocales on PageRecord @_unmask {
    parent {
      slug
      _allSlugLocales {
        locale
        value
      }
      parent {
        slug
        _allSlugLocales {
          locale
          value
        }
        parent {
          slug
          _allSlugLocales {
            locale
            value
          }
          parent {
            slug
            _allSlugLocales {
              locale
              value
            }
            parent {
              slug
              _allSlugLocales {
                locale
                value
              }
            }
          }
        }
      }
    }
  }
`)

export default ParentTreeFragmentAllLocales
