import RoomFragment from '@/lib/fragments/rooms/room'
import { graphql } from '@/lib/query'
//fix
export const queryPageParams = graphql(`
  query QueryPageParams {
    allRooms {
      _allSlugLocales {
        locale
        value
      }
    }
  }
`)

export const query = graphql(
  /* GraphQL */ `
    query RoomQuery(
      $slug: String = ""
      $locale: SiteLocale = de
      $fallbackLocales: [SiteLocale!] = de
    ) {
      room(
        filter: { slug: { eq: $slug } }
        locale: $locale
        fallbackLocales: $fallbackLocales
      ) {
        ...RoomFragment
      }
    }
  `,
  [RoomFragment]
)
