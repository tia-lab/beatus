import { routing } from '@/i18n/routing'
import { Lib } from '@/types'
import { memo } from 'react'
import SectionCtaFragment from './query'
import Fifty from './Variants/Fifty'
import SingleImage from './Variants/SingleImage'

export interface SectionCtaProps {
  data: Lib.FragmentOf<typeof SectionCtaFragment>
  params?: {
    locale: (typeof routing.locales)[number]
    slug: string[]
  }
}

const SectionAbout = ({ data }: SectionCtaProps) => {
  switch (data.variant) {
    case 'single-image': {
      return <SingleImage data={data} />
    }
    case 'fifty': {
      return <Fifty data={data} />
    }
  }
}

export default memo(SectionAbout)
