import { graphql } from '@/lib/query'

const SelectFieldFragment = graphql(/* GraphQL */ `
  fragment SelectFieldFragment on FormFieldSelectRecord @_unmask {
    _modelApiKey
    __typename
    id
    required
    halfSize
    label
    defaultValue
    fieldId
    items {
      title
      value
    }
    placeholder
  }
`)

export default SelectFieldFragment
