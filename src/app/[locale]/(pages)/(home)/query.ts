import { RedirectLinkFragment, TagFragment } from '@/lib/fragments'
import { graphql } from '@/lib/query'
import SectionAnchorFragment from '@/sections/SectionAnchor/query'
import SectionBannerFragment from '@/sections/SectionBanner/query'
import SectionContactFormFragment from '@/sections/SectionContactForm/query'
import SectionFaqFragment from '@/sections/SectionFaq/query'
import SectionGalleryFragment from '@/sections/SectionGallery/query'
import SectionHeroFragment from '@/sections/SectionHero/query'
import SectionIssuuFragment from '@/sections/SectionIssuEmbed/query'
import SectionListFragment from '@/sections/SectionList/query'
import SectionMediaFragment from '@/sections/SectionMedia/query'
import SectionNewsletterFormFragment from '@/sections/SectionNewsletterForm/query'
import SectionOfficeFragment from '@/sections/SectionOffice/query'
import SectionPartnersFragment from '@/sections/SectionPartners/query'
import SectionPrivacyFragment from '@/sections/SectionPrivacy/query'
import SectionTeamFragment from '@/sections/SectionTeam/query'
import SectionTeaserFragment from '@/sections/SectionTeaser/query'
import SectionTextFragment from '@/sections/SectionText/query'
import SectionVideoFragment from '@/sections/SectionVideo/query'

const query = graphql(
  /* GraphQL */ `
    query homePageQuery(
      $locale: SiteLocale = de
      $fallbackLocales: [SiteLocale!] = de
    ) {
      home(locale: $locale, fallbackLocales: $fallbackLocales) {
        _seoMetaTags {
          ...TagFragment
        }
        redirect {
          ...RedirectLinkFragment
        }

        title

        sections {
          ...SectionHeroFragment
          ...SectionTeaserFragment
          ...SectionTextFragment
          ...SectionFaqFragment
          ...SectionBannerFragment
          ...SectionGalleryFragment
          ...SectionListFragment
          ...SectionTeamFragment
          ...SectionAnchorFragment
          ...SectionOfficeFragment
          ...SectionMediaFragment
          ...SectionPartnersFragment
          ...SectionVideoFragment
          ...SectionNewsletterFormFragment
          ...SectionIssuuFragment
          ...SectionContactFormFragment
          ...SectionPrivacyFragment
        }
      }
    }
  `,
  [
    RedirectLinkFragment,
    TagFragment,
    SectionContactFormFragment,
    SectionVideoFragment,
    SectionHeroFragment,
    SectionBannerFragment,
    SectionFaqFragment,
    SectionTeaserFragment,
    SectionTextFragment,
    SectionGalleryFragment,
    SectionNewsletterFormFragment,
    SectionListFragment,
    SectionTeamFragment,
    SectionAnchorFragment,
    SectionOfficeFragment,
    SectionMediaFragment,
    SectionPartnersFragment,
    SectionIssuuFragment,
    SectionPrivacyFragment
  ]
)

export default query
