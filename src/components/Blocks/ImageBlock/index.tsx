import ResponsiveImage from '@/components/Core/ResponsiveImage'
import { ResponsiveImageFragment } from '@/lib/fragments'
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
export const ImageBlockFragment = graphql(
  /* GraphQL */ `
    fragment ImageBlockFragment on ImageBlockRecord {
      asset {
        title
        responsiveImage(sizes: "(max-width: 700px) 100vw, 700px") {
          ...ResponsiveImageFragment
        }
      }
    }
  `,
  [ResponsiveImageFragment]
)

export type ImageBlockProps = {
  data: Lib.FragmentOf<typeof ImageBlockFragment>
}

export default function ImageBlock({ data }: ImageBlockProps) {
  // Read unmasked data from fragment
  const unmaskedData = readFragment(ImageBlockFragment, data)

  return (
    <figure>
      {/* Display responsive image */}
      <ResponsiveImage data={unmaskedData.asset.responsiveImage} />
      {/* Display image title */}
      <figcaption>{unmaskedData.asset.title}</figcaption>
    </figure>
  )
}
