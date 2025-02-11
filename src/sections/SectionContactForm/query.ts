import SectionPaddingFragment from '@/lib/fragments/section-padding'

import { graphql } from '@/lib/query'

const SectionContactFormFragment = graphql(
  /* GraphQL */ `
    fragment SectionContactFormFragment on SectionContactFormRecord @_unmask {
      id
      sectionId
      _modelApiKey
      sectionPadding {
        ...SectionPaddingFragment
      }
    }
  `,
  [SectionPaddingFragment]
)

export default SectionContactFormFragment

export const queryFormMessage = graphql(`
  query queryMessage($locale: SiteLocale = de) {
    setting(fallbackLocales: de, locale: $locale) {
      contactFormSuccessMessage
      contactFormProcessingMessage
      contactFormPrivacy
    }
  }
`)
