import { ResponsiveImageFragment } from '@/lib/fragments'
import { readFragment } from '@/lib/query'
import { Lib } from '@/types'

import { Image, type ImagePropTypes, SRCImage } from 'react-datocms'

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

export type ResponsiveImageProps = Omit<ImagePropTypes, 'data'> & {
  alt?: string | null
  data: Lib.FragmentOf<typeof ResponsiveImageFragment>
  isClient?: boolean
}

/**
 * This component is a wrapper for the `<SRCImage />` component provided by
 * react-datocms, optimized for use with graphql.tada. We define the necessary
 * GraphQL fragment for this component to function only once, then reuse it
 * wherever needed.
 */
export default function ResponsiveImage({
  data,
  isClient = false,
  ...other
}: ResponsiveImageProps) {
  const unmaskedData = readFragment(ResponsiveImageFragment, data)

  return isClient ? (
    <Image
      data={unmaskedData}
      alt={unmaskedData.alt || 'decorative'}
      {...other}
    />
  ) : (
    <SRCImage
      data={unmaskedData}
      alt={unmaskedData.alt || 'decorative'}
      {...other}
    />
  )
}
