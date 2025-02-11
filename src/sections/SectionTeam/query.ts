import SectionPaddingFragment from '@/lib/fragments/section-padding'
import TeamMemberFragment from '@/lib/fragments/team-member'
import { graphql } from '@/lib/query'

const SectionTeamFragment = graphql(
  /* GraphQL */ `
    fragment SectionTeamFragment on SectionTeamRecord @_unmask {
      id
      _modelApiKey
      sectionId
      sectionPadding {
        ...SectionPaddingFragment
      }
      selectTeamMember
      teamMembers {
        ...TeamMemberFragment
      }
    }
  `,
  [SectionPaddingFragment, TeamMemberFragment]
)

export default SectionTeamFragment

export const queryCategories = graphql(`
  query MyQuery(
    $locale: SiteLocale
    $locale1: SiteLocale
    $locale2: SiteLocale
    $locale3: SiteLocale
  ) {
    allTeamDepartments(fallbackLocales: de, locale: $locale) {
      id
      title
      position
    }
    allTeamDisciplines(fallbackLocales: de, locale: $locale1) {
      id
      position
      title
    }
    allTeamLanguages(fallbackLocales: de, locale: $locale2) {
      position
      language
      id
    }
    allTeamNationalities(locale: $locale3, fallbackLocales: de) {
      position
      id
      nationality
    }
  }
`)

// richeTextSimple {
//   value
//   blocks {
//     ... on RecordInterface {
//       id
//       __typename
//     }
//     ... on ImageBlockRecord {
//       ...ImageBlockFragment
//     }
//     ... on ImageGalleryBlockRecord {
//       ...ImageGalleryBlockFragment
//     }
//     ... on VideoBlockRecord {
//       ...VideoBlockFragment
//     }
//   }
// }
