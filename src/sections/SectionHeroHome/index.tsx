import { Section } from '@/components/Core'
import { routing } from '@/i18n/routing'
import { Lib } from '@/types'
import { memo } from 'react'
import SectionHeroFragment from './query'
export interface SectionHeroProps {
  data: Lib.FragmentOf<typeof SectionHeroFragment>
  params?: {
    locale: (typeof routing.locales)[number]
    slug: string[]
  }
}

export type SectionHeroData = Lib.FragmentOf<typeof SectionHeroFragment> & {
  _modelApiKey: 'section_hero'
  __typename: 'SectionHeroRecord'
  id: string
}

const SectionHero = ({ data, params }: SectionHeroProps) => {
  return <Section>Section Hero</Section>
}

export default memo(SectionHero)
