import { graphql } from '@/lib/query'
import LinkFragment from '../link'

const MenuDropdownFragment = graphql(
  /* GraphQL */ `
    fragment MenuDropdownFragment on MenuDropdownRecord @_unmask {
      _modelApiKey
      id
      dropdownItems {
        ...LinkFragment
      }
    }
  `,
  [LinkFragment]
)

export default MenuDropdownFragment
