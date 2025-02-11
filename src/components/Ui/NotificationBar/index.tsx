'use client'

import { useMedia } from '@/hooks'
import { LinkFragment } from '@/lib/fragments'
import { Lib } from '@/types'
import { MEDIA } from '@config'
import Desktop from './Components/Desktop'
import Mobile from './Components/Mobile'

export interface NotificationBarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  data?: {
    notificationIsActive?: boolean
    notification?: string | null
    notificationLink?: Lib.FragmentOf<typeof LinkFragment> | null
    notificationTitle?: string | null
  }
}

const NotificationBar = ({ data, ...props }: NotificationBarProps) => {
  // Hooks

  const isDesktop = useMedia(MEDIA.desktop, true)

  return isDesktop ? (
    <Desktop {...props} data={data} />
  ) : (
    <Mobile {...props} data={data} />
  )
}

export default NotificationBar
