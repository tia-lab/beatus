import {
  ImageFragment,
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
      newsletterLink {
        ...LinkFragment
      }
      notificationLink {
        ...LinkFragment
      }
      preloadLogo {
        ...ImageFragment
      }

      footerLinks {
        ...LinkFragment
      }

      navigation {
        ...MenuDropdownFragment
      }
      footerDescription
      contactAddress
      contactPhone
      contactEmail
      instagramLink
      youtubeLink
      facebookLink
      viemoLink
      partners {
        ...PartnerBlockFragment
      }
    }
  `,
  [LinkFragment, PartnerBlockFragment, MenuDropdownFragment, ImageFragment]
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
