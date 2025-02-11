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
import ImageFragment from '../image'
import LinkFragment from '../link'
import ParentTreeFragmentAllLocales from '../parent-tree/all-locales'
import RedirectLinkFragment from '../redirect-link'
import TagFragment from '../tag'

const PageFragment = graphql(
  /* GraphQL */ `
    fragment PageFragment on PageRecord @_unmask {
      _seoMetaTags {
        ...TagFragment
      }
      redirect {
        ...RedirectLinkFragment
      }
      _allSlugLocales {
        locale
        value
      }
      pageTitle
      slug
      image {
        ...ImageFragment
      }
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
        ...SectionIssuuFragment
        ...SectionNewsletterFormFragment
        ...SectionPrivacyFragment
        ...SectionContactFormFragment
      }
      ...ParentTreeFragmentAllLocales
    }
  `,
  [
    LinkFragment,
    SectionVideoFragment,
    ParentTreeFragmentAllLocales,
    SectionHeroFragment,
    RedirectLinkFragment,
    TagFragment,
    SectionFaqFragment,
    SectionTeaserFragment,
    SectionNewsletterFormFragment,
    SectionTextFragment,
    SectionBannerFragment,
    SectionGalleryFragment,
    SectionListFragment,
    SectionIssuuFragment,
    SectionPartnersFragment,
    SectionContactFormFragment,
    SectionTeamFragment,
    SectionAnchorFragment,
    ImageFragment,
    SectionOfficeFragment,
    SectionMediaFragment,
    SectionPrivacyFragment
  ]
)

const PageStaticParamsFragment = graphql(`
  fragment PageStaticParamsFragment on PageRecord @_unmask {
    slug
    pageTitle
    _allSlugLocales {
      locale
      value
    }
    children {
      pageTitle
      slug
      _allSlugLocales {
        locale
        value
      }
      children {
        pageTitle
        slug
        _allSlugLocales {
          locale
          value
        }
        children {
          pageTitle
          slug
          _allSlugLocales {
            locale
            value
          }
        }
      }
    }
  }
`)

export { PageFragment, PageStaticParamsFragment }
