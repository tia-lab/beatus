import { graphql } from '@/lib/query'

const CheckboxFieldFragment = graphql(/* GraphQL */ `
  fragment CheckboxFieldFragment on FormFieldCheckboxRecord @_unmask {
    _modelApiKey
    __typename
    id
    required
    halfSize
    label
    checked
    fieldId
  }
`)

export default CheckboxFieldFragment
