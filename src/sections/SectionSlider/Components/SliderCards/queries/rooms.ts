import RoomCardFragment from '@/lib/fragments/rooms/cards'
import { graphql } from '@/lib/query'

const queryAllRooms = graphql(
  /* GraphQL */ `
    query query {
      allRooms {
        ...RoomCardFragment
      }
    }
  `,
  [RoomCardFragment]
)

export default queryAllRooms
