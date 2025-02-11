import { graphql } from '@/lib/query'
import ExternalVideoFragment from '../external-video'
import ImageFragment from '../image'

const MediaBlockExternalFragment = graphql(
  /* GraphQL */ `
    fragment MediaBlockExternalFragment on MediaBlockExternalRecord @_unmask {
      isVideo
      image {
        ...ImageFragment
      }
      video {
        ...ExternalVideoFragment
      }
    }
  `,
  [ImageFragment, ExternalVideoFragment]
)

export default MediaBlockExternalFragment
