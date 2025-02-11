import { graphql } from '@/lib/query'
import ResponsiveImageFragment from '../responsive-image'

const ImageFragment = graphql(
  /* GraphQL */ `
    fragment ImageFragment on ImageBlockRecord @_unmask {
      caption
      priority
      asset {
        title
        responsiveImage(
          imgixParams: { fit: crop, crop: focalpoint, auto: format }
        ) {
          ...ResponsiveImageFragment
        }
        responsiveImage1x1: responsiveImage(
          imgixParams: { fit: crop, crop: focalpoint, ar: "1:1", auto: format }
        ) {
          ...ResponsiveImageFragment
        }
        responsiveImage4x3: responsiveImage(
          imgixParams: { fit: crop, crop: focalpoint, ar: "4:3", auto: format }
        ) {
          ...ResponsiveImageFragment
        }
        responsiveImage16x9: responsiveImage(
          imgixParams: { fit: crop, crop: focalpoint, ar: "16:9", auto: format }
        ) {
          ...ResponsiveImageFragment
        }
        responsiveImage3x4: responsiveImage(
          imgixParams: { fit: crop, crop: focalpoint, ar: "3:4", auto: format }
        ) {
          ...ResponsiveImageFragment
        }
        responsiveImage13x4: responsiveImage(
          imgixParams: { fit: crop, crop: focalpoint, ar: "13:4", auto: format }
        ) {
          ...ResponsiveImageFragment
        }
      }
    }
  `,
  [ResponsiveImageFragment]
)

export default ImageFragment
