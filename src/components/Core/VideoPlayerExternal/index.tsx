//https://github.com/cookpete/react-player

import { ExternalVideoFragment } from '@/lib/fragments'
import { Lib } from '@/types'
import { readFragment } from 'gql.tada'
import dynamic from 'next/dynamic'
import { HTMLAttributes } from 'react'
import { ReactPlayerProps } from 'react-player'
import { BaseReactPlayerProps } from 'react-player/base'

const VideoPlayerExternalClient = dynamic(() => import('./client'), {
  ssr: false
})

export interface VideoPlayerExternalProps
  extends ReactPlayerProps,
    BaseReactPlayerProps {
  data: Lib.FragmentOf<typeof ExternalVideoFragment> | null
  wrap?: HTMLAttributes<HTMLDivElement>
}

export default function VideoPlayerExternal({
  data,
  wrap,
  ...props
}: VideoPlayerExternalProps) {
  if (!data) {
    console.error('Video Player External component is missing data')
    return null
  }
  const d = readFragment(ExternalVideoFragment, data)
  if (!d.url) {
    console.warn('Video Player External component is missing url')
  }

  return wrap ? (
    <div {...wrap}>
      <VideoPlayerExternalClient
        data={data}
        {...props}
        width="100%"
        height="100%"
      />
    </div>
  ) : (
    <VideoPlayerExternalClient data={data} {...props} />
  )
}
