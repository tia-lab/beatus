import { routing } from '@/i18n/routing'
import { SectionHero } from '@/sections'
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
          return <SectionHero key={k} data={section} params={params} />
        case 'SectionHeroHomeRecord':
          return <SectionHeroHome key={k} data={section} params={params} />
      }
    })
  }, [sections, params])

  return <>{renderedSections}</>
}

export default memo(SectionBuilder)
