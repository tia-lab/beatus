'use client'

import ReactPlayer from 'react-player'
import { VideoPlayerExternalProps } from '.'

export default function VideoPlayerExternalClient({
  data,
  ...props
}: VideoPlayerExternalProps) {
  return <ReactPlayer url={data?.url} {...props} />
}
