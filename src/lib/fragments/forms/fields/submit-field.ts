import { graphql } from '@/lib/query'

const SubmitFieldFragment = graphql(/* GraphQL */ `
  fragment SubmitFieldFragment on FormFieldSubmitRecord @_unmask {
    _modelApiKey
    __typename
    id
    buttonText
  }
`)

export default SubmitFieldFragment
