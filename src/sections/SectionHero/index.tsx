import { routing } from '@/i18n/routing'
import { Lib } from '@/types'
import { memo } from 'react'
import SectionHeroFragment from './query'
import VariantDefault from './variants/Default'
import VariantHome from './variants/Home'
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
  return data.variants === 'default' ? (
    <VariantDefault data={data} params={params} />
  ) : (
    <VariantHome data={data} />
  )
}

export default memo(SectionHero)
