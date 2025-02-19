import { graphql } from '@/lib/query'

const TextFieldFragment = graphql(/* GraphQL */ `
  fragment TextFieldFragment on TextFieldRecord @_unmask {
    _modelApiKey
    __typename
    id
    variant
    required
    halfSize
    label
    hidden
    placeholder
    fieldId
  }
`)

export default TextFieldFragment
