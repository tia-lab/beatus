import { LinkFragment, ResponsiveImageFragment } from '@/lib/fragments'
import { graphql } from '@/lib/query'

const queryHeader = graphql(
  /* GraphQL */ `
    query homePageQuery(
      $locale: SiteLocale = de
      $fallbackLocales: [SiteLocale!] = de
    ) {
      layout(locale: $locale, fallbackLocales: $fallbackLocales) {
        notification
        notificationIsActive
        notificationTitle
        navigationQuicklinks {
          ...LinkFragment
        }
        notificationLink {
          ...LinkFragment
        }
      }
    }
  `,
  [LinkFragment, ResponsiveImageFragment]
)

export default queryHeader
