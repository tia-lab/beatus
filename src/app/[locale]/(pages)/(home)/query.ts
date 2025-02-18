import SectionBuilderFragment from '@/components/Core/SectionBuilder/query'
import { RedirectLinkFragment, TagFragment } from '@/lib/fragments'
import { graphql } from '@/lib/query'

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

        sectionBuilder {
          ...SectionBuilderFragment
        }
        bookingBar
      }
    }
  `,
  [RedirectLinkFragment, TagFragment, SectionBuilderFragment]
)

export default query
