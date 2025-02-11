import { Sections } from '@/components/types'
import { routing } from '@/i18n/routing'
import {
  SectionAnchor,
  SectionBanner,
  SectionContactForm,
  SectionFaq,
  SectionGallery,
  SectionHero,
  SectionIssuEmbed,
  SectionList,
  SectionMedia,
  SectionNewsletterForm,
  SectionOffice,
  SectionPartners,
  SectionTeaser,
  SectionText,
  SectionVideo
} from '@/sections'
import SectionPrivacy from '@/sections/SectionPrivacy'
import SectionTeam from '@/sections/SectionTeam'
import { memo, useMemo } from 'react'

export type SectionBuilderProps = {
  sections: Sections.SectionType[]
  params?: {
    locale: (typeof routing.locales)[number]
    slug: string[]
  }
}

const SectionBuilder = ({ sections, params }: SectionBuilderProps) => {
  const renderedSections = useMemo(() => {
    if (!sections.length) return null
    return sections.map((section) => {
      switch (section._modelApiKey) {
        case 'section_hero':
          return <SectionHero key={section.id} data={section} params={params} />
        case 'section_teaser':
          return <SectionTeaser key={section.id} data={section} />
        case 'section_text':
          return <SectionText key={section.id} data={section} />
        case 'section_faq':
          return <SectionFaq key={section.id} data={section} />
        case 'section_list':
          return <SectionList key={section.id} data={section} />
        case 'section_team':
          return <SectionTeam key={section.id} data={section} />
        case 'section_gallery':
          return <SectionGallery key={section.id} data={section} />
        case 'section_banner':
          return <SectionBanner key={section.id} data={section} />
        case 'section_anchor_link':
          return <SectionAnchor key={section.id} data={section} />
        case 'section_office':
          return <SectionOffice key={section.id} data={section} />
        case 'section_media_image':
          return <SectionMedia key={section.id} data={section} />
        case 'section_partner':
          return <SectionPartners key={section.id} data={section} />
        case 'section_video':
          return <SectionVideo key={section.id} data={section} />
        case 'section_newsletter_form':
          return <SectionNewsletterForm key={section.id} data={section} />
        case 'section_issuu':
          return <SectionIssuEmbed key={section.id} data={section} />
        case 'section_contact_form':
          return <SectionContactForm key={section.id} data={section} />
        case 'section_privacy':
          return <SectionPrivacy key={section.id} data={section} />
        default:
          return null
      }
    })
  }, [sections, params])

  return <>{renderedSections}</>
}

export default memo(SectionBuilder)
