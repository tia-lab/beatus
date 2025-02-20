import { graphql } from '@/lib/query'

const ReacpcthaFieldFragment = graphql(/* GraphQL */ `
  fragment ReacpcthaFieldFragment on FormFieldRecaptchaRecord @_unmask {
    _modelApiKey
    __typename
    id
    version
    siteKey
    invisible
    halfSize
  }
`)

export default ReacpcthaFieldFragment
