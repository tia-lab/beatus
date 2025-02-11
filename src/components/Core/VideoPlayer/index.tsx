//https://github.com/datocms/react-datocms/blob/master/docs/video-player.md

import { VideoPlayerFragment } from '@/lib/fragments'
import { readFragment } from '@/lib/query'
import { Lib } from '@/types'
import dynamic from 'next/dynamic'
import { type VideoPlayerProps as DatoVideoPlayerProps } from 'react-datocms'

const VideoPlayerDynamic = dynamic(() => import('./dynamic'))

export type VideoPlayerProps = Omit<DatoVideoPlayerProps, 'data'> & {
  data: Lib.FragmentOf<typeof VideoPlayerFragment> | null
}

/**
 * This component is a wrapper for the `<VideoPlayer />` component provided by
 * react-datocms, optimized for use with graphql.tada. We define the necessary
 * GraphQL fragment for this component to function only once, then reuse it
 * wherever needed.
 */
export default function VideoPlayer({ data, ...props }: VideoPlayerProps) {
  if (!data) {
    console.error('Video Player component is missing data')
    return null
  }

  const unmaskedData = readFragment(VideoPlayerFragment, data)

  return <VideoPlayerDynamic data={unmaskedData} {...props} />
}
