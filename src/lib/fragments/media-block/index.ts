import { graphql } from '@/lib/query'
import ImageFragment from '../image'
import VideoPlayerFragment from '../video-player'

const MediaBlockFragment = graphql(
  /* GraphQL */ `
    fragment MediaBlockFragment on MediaBlockRecord @_unmask {
      isVideo
      image {
        ...ImageFragment
      }
      video {
        ...VideoPlayerFragment
      }
    }
  `,
  [ImageFragment, VideoPlayerFragment]
)

export default MediaBlockFragment
