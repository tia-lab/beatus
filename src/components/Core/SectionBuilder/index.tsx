import { routing } from '@/i18n/routing'
import {
  SectionAbout,
  SectionCta,
  SectionFaq,
  SectionForm,
  SectionHero,
  SectionList,
  SectionListing,
  SectionSlider,
  SectionTextDisplay,
  SectionTextImage
} from '@/sections'
import SectionHeroHome from '@/sections/SectionHeroHome'
import { Lib } from '@/types'
import { memo, useMemo } from 'react'
import SectionBuilderFragment from './query'

export type SectionBuilderProps = {
  sections: Lib.FragmentOf<typeof SectionBuilderFragment>['sectionBuilder']
  params?: {
    locale: (typeof routing.locales)[number]
    slug: string[]
  }
}

const SectionBuilder = ({ sections, params }: SectionBuilderProps) => {
  const renderedSections = useMemo(() => {
    if (!sections.length) return null
    return sections.map((section, k) => {
      switch (section.__typename) {
        case 'SectionHeroRecord':
          return (
            <SectionHero
              key={k}
              data={section}
              params={params}
              variant="default"
            />
          )
        case 'SectionHeroHomeRecord':
          return <SectionHeroHome key={k} data={section} params={params} />
        case 'SectionAboutRecord':
          return <SectionAbout key={k} data={section} params={params} />
        case 'SectionCtaRecord':
          return <SectionCta key={k} data={section} params={params} />
        case 'SectionTextImageRecord':
          return <SectionTextImage key={k} data={section} params={params} />
        case 'SectionTextDisplayRecord':
          return <SectionTextDisplay key={k} data={section} params={params} />
        case 'SectionSliderRecord':
          return <SectionSlider key={k} data={section} params={params} />
        case 'SectionListRecord':
          return <SectionList key={k} data={section} params={params} />
        case 'SectionListingRecord':
          return <SectionListing key={k} data={section} params={params} />
        case 'SectionFaqRecord':
          return <SectionFaq key={k} data={section} params={params} />
        case 'SectionFormRecord':
          return <SectionForm key={k} data={section} params={params} />
        default:
          return null
      }
    })
  }, [sections, params])

  return <>{renderedSections}</>
}

export default memo(SectionBuilder)
