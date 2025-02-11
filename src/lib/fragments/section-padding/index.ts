import { graphql } from '@/lib/query'

const SectionPaddingFragment = graphql(/* GraphQL */ `
  fragment SectionPaddingFragment on SectionPaddingRecord @_unmask {
    paddingTop
    paddingBottom
    customPaddingTop
    customPaddingBottom
  }
`)

export default SectionPaddingFragment
