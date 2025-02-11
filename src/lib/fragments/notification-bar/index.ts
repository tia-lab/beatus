import { graphql } from '@/lib/query'
import LinkFragment from '../link'

const NotificationBarFragment = graphql(
  /* GraphQL */ `
    fragment NotificationBarFragment on LayoutRecord @_unmask {
      notification
      notificationTitle
      notificationIsActive
      notificationLink {
        ...LinkFragment
      }
    }
  `,
  [LinkFragment]
)

export default NotificationBarFragment
