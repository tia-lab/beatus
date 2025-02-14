import { SectionBuilderProps } from '@/components/Core/types'
import { Lib } from '@/types'
import { memo } from 'react'
import SectionSliderFragment from './query'
import VariantCards from './variants/Cards'
import VariantFifty from './variants/Fifty'
import VariantGallery from './variants/Gallery'
import VariantImages from './variants/Images'

export interface SectionSliderProps {
  data: Lib.FragmentOf<typeof SectionSliderFragment>
  params: SectionBuilderProps['params']
}

export type Variants = 'gallery' | 'fifty' | 'images' | 'packages' | 'rooms'

const SectionSlider = ({ ...props }: SectionSliderProps) => {
  switch (props.data.variant as Variants) {
    case 'gallery':
      return <VariantGallery {...props} />
    case 'fifty':
      return <VariantFifty {...props} />
    default:
    case 'images':
      return <VariantImages {...props} />
    case 'packages':
      return <VariantCards {...props} />
    case 'rooms':
      return <VariantCards {...props} />
  }
}

export default memo(SectionSlider)
