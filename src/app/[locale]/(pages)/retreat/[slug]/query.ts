import RetreatFragment from '@/lib/fragments/retreats/retreat'
import { graphql } from '@/lib/query'
//fix
export const queryPageParams = graphql(`
  query QueryPageParams {
    allRetreats {
      _allSlugLocales {
        locale
        value
      }
    }
  }
`)

export const query = graphql(
  /* GraphQL */ `
    query PackageQuery(
      $slug: String = ""
      $locale: SiteLocale = de
      $fallbackLocales: [SiteLocale!] = de
    ) {
      retreat(
        filter: { slug: { eq: $slug } }
        locale: $locale
        fallbackLocales: $fallbackLocales
      ) {
        ...RetreatFragment
      }
    }
  `,
  [RetreatFragment]
)
