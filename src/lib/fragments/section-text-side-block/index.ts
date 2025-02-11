import { graphql } from '@/lib/query'
import LinkFragment from '../link'

const SectionTextSideBlockFragment = graphql(
  /* GraphQL */ `
    fragment SectionTextSideBlockFragment on SectionTextSideBlockRecord
    @_unmask {
      isContact
      title
      text
      button {
        ...LinkFragment
      }
      contactPhone
      contactEmail
    }
  `,
  [LinkFragment]
)

export default SectionTextSideBlockFragment
