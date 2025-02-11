import { PageFragment, PageStaticParamsFragment } from '@/lib/fragments'
import { graphql } from '@/lib/query'
//fix
export const queryPageParams = graphql(
  `
    query QueryPageParams {
      allPages(filter: { parent: { exists: "false" } }) {
        ...PageStaticParamsFragment
      }
    }
  `,
  [PageStaticParamsFragment]
)

export const query = graphql(
  /* GraphQL */ `
    query PageQuery(
      $slug: String = ""
      $locale: SiteLocale = de
      $fallbackLocales: [SiteLocale!] = de
    ) {
      page(
        filter: { slug: { eq: $slug } }
        locale: $locale
        fallbackLocales: $fallbackLocales
      ) {
        ...PageFragment
      }
    }
  `,
  [PageFragment]
)
