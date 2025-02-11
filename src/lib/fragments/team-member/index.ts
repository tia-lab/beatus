import { graphql } from '@/lib/query'
import ResponsiveImageFragment from '../responsive-image'

const TeamMemberFragment = graphql(
  /* GraphQL */ `
    fragment TeamMemberFragment on TeamMemberRecord @_unmask {
      name
      image {
        caption
        priority
        asset {
          title
          responsiveImage1x1: responsiveImage(
            imgixParams: { fit: crop, crop: faces, ar: "1:1", auto: format }
          ) {
            ...ResponsiveImageFragment
          }
        }
      }
      disciplines {
        title
      }
      languages {
        language
      }
      departements {
        title
      }
      nationality {
        nationality
      }
    }
  `,
  [ResponsiveImageFragment]
)

export default TeamMemberFragment
