import SectionBuilderFragment from '@/components/Core/SectionBuilder/query'
import { graphql } from '@/lib/query'
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
      sectionBuilder {
        ...SectionBuilderFragment
      }

      ...ParentTreeFragmentAllLocales
    }
  `,
  [
    LinkFragment,
    ParentTreeFragmentAllLocales,
    RedirectLinkFragment,
    TagFragment,
    ImageFragment,
    SectionBuilderFragment
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
