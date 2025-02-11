import { graphql } from '@/lib/query'

const queryBreadcrumbs = graphql(`
  query QueryBreadcrumb($eq: String = "", $locale: SiteLocale = de) {
    page(filter: { slug: { eq: $eq } }, fallbackLocales: de, locale: $locale) {
      id
      pageTitle
      slug
      parent {
        slug
        pageTitle
        parent {
          slug
          pageTitle
          parent {
            slug
            pageTitle
            parent {
              slug
              pageTitle
              parent {
                slug
                pageTitle
              }
            }
          }
        }
      }
    }
  }
`)

export default queryBreadcrumbs
