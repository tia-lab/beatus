//https://github.com/datocms/react-datocms/blob/master/docs/video-player.md

import { COLORS } from '@config'
import { VideoPlayer as DatoVideoPlayer } from 'react-datocms'
import { VideoPlayerProps } from '.'

/**
 * This component is a wrapper for the `<VideoPlayer />` component provided by
 * react-datocms, optimized for use with graphql.tada. We define the necessary
 * GraphQL fragment for this component to function only once, then reuse it
 * wherever needed.
 */
export default function VideoPlayerDynamic({
  data,
  ...props
}: VideoPlayerProps) {
  return (
    <DatoVideoPlayer
      data={data?.video}
      accentColor={props.accentColor || COLORS.primary100}
      {...props}
    />
  )
}
