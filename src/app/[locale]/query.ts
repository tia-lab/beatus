import {
  LinkFragment,
  MenuDropdownFragment,
  PartnerBlockFragment
} from '@/lib/fragments'
import { graphql } from '@/lib/query'

export const LayoutFragment = graphql(
  `
    fragment LayoutFragment on LayoutRecord @_unmask {
      notification
      notificationIsActive
      notificationTitle
      notificationLink {
        ...LinkFragment
      }

      footerLinks {
        ...LinkFragment
      }
      footerLinksCol2 {
        ...LinkFragment
      }
      footerContact
      socialLinks {
        link
        icon
      }
      footerCopyright
      navigation {
        ...MenuDropdownFragment
      }

      partners {
        ...PartnerBlockFragment
      }
    }
  `,
  [LinkFragment, PartnerBlockFragment, MenuDropdownFragment]
)

const queryLayout = graphql(
  /* GraphQL */ `
    query QueryLayout(
      $locale: SiteLocale
      $fallbackLocales: [SiteLocale!] = de
    ) {
      layout(locale: $locale, fallbackLocales: $fallbackLocales) {
        ...LayoutFragment
      }
    }
  `,
  [LayoutFragment]
)

export default queryLayout
