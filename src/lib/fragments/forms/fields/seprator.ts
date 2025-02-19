import { graphql } from '@/lib/query'

const FormSepratorFragment = graphql(/* GraphQL */ `
  fragment FormSepratorFragment on FormFieldSepratorRecord @_unmask {
    _modelApiKey
    __typename
    id
    halfSize
  }
`)

export default FormSepratorFragment
