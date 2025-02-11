import type { SectionAnchorData, SectionAnchorProps } from './SectionAnchor'
import type { SectionBannerData, SectionBannerProps } from './SectionBanner'
import type {
  SectionContactFormData,
  SectionContactFormProps
} from './SectionContactForm'
import type { SectionFaqData, SectionFaqProps } from './SectionFaq'
import type { SectionGalleryData, SectionGalleryProps } from './SectionGallery'
import type { SectionHeroData, SectionHeroProps } from './SectionHero'
import type {
  SectioIssuuEmbedData,
  SectionIssuuEmbedProps
} from './SectionIssuEmbed'
import type { SectionListData, SectionListProps } from './SectionList'
import type { SectionMediaData, SectionMediaProps } from './SectionMedia'
import type {
  SectionNewsletterFormData,
  SectionNewsletterFormProps
} from './SectionNewsletterForm'
import { SectionOfficeData, SectionOfficeProps } from './SectionOffice'
import type {
  SectionPartnersData,
  SectionPartnersProps
} from './SectionPartners'
import { SectionPrivacyData, SectionPrivacyProps } from './SectionPrivacy'
import type { SectionTeamData, SectionTeamProps } from './SectionTeam'
import type { SectionTeaserData, SectionTeaserProps } from './SectionTeaser'
import type { SectionTextData, SectionTextProps } from './SectionText'
import type { SectionVideoData, SectionVideoProps } from './SectionVideo'

type SectionType =
  | SectionHeroData
  | SectionNewsletterFormData
  | SectionTeaserData
  | SectionTextData
  | SectionFaqData
  | SectionListData
  | SectionTeamData
  | SectionGalleryData
  | SectionBannerData
  | SectionAnchorData
  | SectioIssuuEmbedData
  | SectionVideoData
  | SectionOfficeData
  | SectionMediaData
  | SectionPartnersData
  | SectionContactFormData
  | SectionPrivacyData

export type {
  SectionAnchorProps,
  SectionBannerProps,
  SectionContactFormProps,
  SectionFaqProps,
  SectionGalleryProps,
  SectionHeroProps,
  SectionIssuuEmbedProps,
  SectionListProps,
  SectionMediaProps,
  SectionNewsletterFormProps,
  SectionOfficeProps,
  SectionPartnersProps,
  SectionPrivacyProps,
  SectionTeamProps,
  SectionTeaserProps,
  SectionTextProps,
  SectionType,
  SectionVideoProps
}
