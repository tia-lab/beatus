import { graphql } from '@/lib/query'

const RadioGroupFragment = graphql(/* GraphQL */ `
  fragment RadioGroupFragment on FormFieldRadioGroupRecord @_unmask {
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

export default RadioGroupFragment
