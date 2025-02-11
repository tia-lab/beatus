import { ParentTreeFragment } from '../fragments'
import { graphql } from '../query'

export const query = graphql(
  `
    query redirects($locale: SiteLocale = de) {
      allRedirects(locale: $locale, first: 5000) {
        permanent
        sourceUrl {
          ... on BlogPostRecord {
            slug
            _modelApiKey
          }
          ... on PageRecord {
            slug
            _modelApiKey
            ...ParentTreeFragment
          }
          ... on HomeRecord {
            _modelApiKey
          }
        }
        destinationUrl {
          ... on BlogPostRecord {
            slug
            _modelApiKey
          }
          ... on PageRecord {
            slug
            _modelApiKey
            ...ParentTreeFragment
          }
          ... on HomeRecord {
            _modelApiKey
          }
        }
        sourceCustomUrl
        destinationCustomUrl
      }
    }
  `,
  [ParentTreeFragment]
)
