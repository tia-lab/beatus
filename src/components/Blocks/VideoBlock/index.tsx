import VideoPlayer from '@/components/Core/VideoPlayer'
import { VideoPlayerFragment } from '@/lib/fragments'
import { graphql, readFragment } from '@/lib/query'
import { Lib } from '@/types'

/**
 * Let's define the GraphQL fragment needed for the component to function.
 *
 * GraphQL fragment colocation keeps queries near the components using them,
 * improving maintainability and encapsulation. Fragment composition enables
 * building complex queries from reusable parts, promoting code reuse and
 * efficiency. Together, these practices lead to more modular, maintainable, and
 * performant GraphQL implementations by allowing precise data fetching and
 * easier code management.
 *
 * Learn more: https://gql-tada.0no.co/guides/fragment-colocation
 */
export const VideoBlockFragment = graphql(
  /* GraphQL */ `
    fragment VideoBlockFragment on VideoBlockRecord {
      asset {
        title
        ...VideoPlayerFragment
      }
    }
  `,
  [VideoPlayerFragment]
)

export type VideoBlockProps = {
  data: Lib.FragmentOf<typeof VideoBlockFragment>
}

export default function VideoBlock({ data }: VideoBlockProps) {
  // Read unmasked data from fragment
  const unmaskedData = readFragment(VideoBlockFragment, data)

  return (
    <figure>
      {/* Render the video player component */}
      <VideoPlayer data={unmaskedData.asset} />
      {/* Display the title of the video asset below the video player */}
      <figcaption>{unmaskedData.asset.title}</figcaption>
    </figure>
  )
}
