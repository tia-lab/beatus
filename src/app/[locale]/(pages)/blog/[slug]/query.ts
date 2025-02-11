import { RedirectLinkFragment, TagFragment } from '@/lib/fragments'
import { graphql } from '@/lib/query'

export const query = graphql(
  /* GraphQL */ `
    query BlogPost(
      $slug: String = ""
      $locale: SiteLocale = de
      $fallbackLocales: [SiteLocale!] = de
    ) {
      blogPost(
        filter: { slug: { eq: $slug } }
        locale: $locale
        fallbackLocales: $fallbackLocales
      ) {
        redirect {
          ...RedirectLinkFragment
        }
        _modelApiKey
        postTitle
        excerpt
        _seoMetaTags {
          ...TagFragment
        }
        _allSlugLocales {
          locale
          value
        }
      }
    }
  `,
  [TagFragment, RedirectLinkFragment]
)

export const queryAllPosts = graphql(`
  query BlogPosts {
    allBlogPosts {
      _allSlugLocales {
        locale
        value
      }
    }
  }
`)
