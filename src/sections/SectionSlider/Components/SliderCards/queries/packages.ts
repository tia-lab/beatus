import PackageCardFragment from '@/lib/fragments/packages/card'
import { graphql } from '@/lib/query'

const queryAllPackages = graphql(
  /* GraphQL */ `
    query query {
      allPackages {
        ...PackageCardFragment
      }
    }
  `,
  [PackageCardFragment]
)

export default queryAllPackages
