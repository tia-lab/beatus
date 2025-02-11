'use client'

import { useMedia } from '@/hooks'

export interface MediaQueryProps {
  media: string
  initialValue?: boolean
  children?: React.ReactNode
}

const MediaQuery = ({ media, initialValue, children }: MediaQueryProps) => {
  const isMedia = useMedia(media, initialValue)

  return isMedia ? <>{children}</> : null
}

export default MediaQuery
