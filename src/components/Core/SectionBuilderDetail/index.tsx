import { routing } from '@/i18n/routing'
import {
  SectionCta,
  SectionFaq,
  SectionForm,
  SectionSlider,
  SectionTextDisplay
} from '@/sections'
import { Lib } from '@/types'
import { memo, useMemo } from 'react'
import SectionBuilderFragment from './query'

export type SectionBuilderPropsDetail = {
  sections: Lib.FragmentOf<typeof SectionBuilderFragment>['sectionBuilder']
  params?: {
    locale: (typeof routing.locales)[number]
    slug: string | string[]
  }
}

const SectionBuilderDetail = ({ sections }: SectionBuilderPropsDetail) => {
  const renderedSections = useMemo(() => {
    if (!sections || !sections.length) return null
    return sections.map((section, k) => {
      switch (section.__typename) {
        case 'SectionCtaRecord':
          return <SectionCta key={k} data={section} />
        case 'SectionTextDisplayRecord':
          return <SectionTextDisplay key={k} data={section} />
        case 'SectionSliderRecord':
          return <SectionSlider key={k} data={section} />
        case 'SectionFaqRecord':
          return <SectionFaq key={k} data={section} />
        case 'SectionFormRecord':
          return <SectionForm key={k} data={section} />
        default:
          return null
      }
    })
  }, [sections])

  return <>{renderedSections}</>
}

export default memo(SectionBuilderDetail)
