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
export const ImageGalleryBlockFragment = graphql(
  /* GraphQL */ `
    fragment ImageGalleryBlockFragment on ImageGalleryBlockRecord {
      assets {
        id
        title
        responsiveImage(imgixParams: { w: 300 }, sizes: "300px") {
          ...ResponsiveImageFragment
        }
      }
    }
  `,
  [ResponsiveImageFragment]
)

export type ImageGalleryProps = {
  data: Lib.FragmentOf<typeof ImageGalleryBlockFragment>
}

export default function ImageGalleryBlock({ data }: ImageGalleryProps) {
  // Read unmasked data from fragment
  const unmaskedData = readFragment(ImageGalleryBlockFragment, data)

  return (
    <div className="gallery">
      <div>
        {unmaskedData.assets.map((asset) => (
          <figure key={asset.id}>
            {/* Display responsive image for each asset */}
            <ResponsiveImage
              data={asset.responsiveImage}
              imgStyle={{ width: 'auto' }}
            />
            {/* Display title for each asset */}
            <figcaption>{asset.title}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
