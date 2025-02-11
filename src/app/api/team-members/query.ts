import TeamMemberFragment from '@/lib/fragments/team-member'
import { graphql } from 'gql.tada'

const query = graphql(
  `
    query MyQuery(
      $locale: SiteLocale = de
      $first: IntType = 5
      $skip: IntType = 0
      $nationality: [ItemId]
      $disciplineId: [ItemId]
      $departementId: [ItemId]
      $languageId: [ItemId]
    ) {
      allTeamMembers(
        fallbackLocales: de
        locale: $locale
        skip: $skip
        first: $first
        filter: {
          nationality: { eq: $nationality }
          disciplines: { anyIn: $disciplineId }
          departements: { anyIn: $departementId }
          languages: { anyIn: $languageId }
        }
      ) {
        _modelApiKey
        disciplines {
          id
          title
        }
        departements {
          id
          title
        }
        ...TeamMemberFragment
      }
    }
  `,
  [TeamMemberFragment]
)

export default query
