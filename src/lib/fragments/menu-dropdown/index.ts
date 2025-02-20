import { graphql } from '@/lib/query'
import ImageFragment from '../image'
import LinkFragment from '../link'

const MenuDropdownFragment = graphql(
  /* GraphQL */ `
    fragment MenuDropdownFragment on MenuDropdownRecord @_unmask {
      _modelApiKey
      id
      dropdownTitle
      dropdownImage {
        ...ImageFragment
      }
      dropdownItems {
        ...LinkFragment
      }
    }
  `,
  [LinkFragment, ImageFragment]
)

export default MenuDropdownFragment
