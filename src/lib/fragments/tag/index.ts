import { graphql } from '../../query/graphql'

const TagFragment = graphql(`
  fragment TagFragment on Tag @_unmask {
    tag
    attributes
    content
  }
`)

export default TagFragment
