import { Section } from '@/components/Core'
import { readFragment } from 'gql.tada'
import { memo } from 'react'
import { SectionSliderProps } from '../..'
import SliderImages from '../../Components/SliderImages'
import SectionSliderFragment from '../../query'
import $ from './style.module.scss'

const VariantImages = ({ data }: SectionSliderProps) => {
  const d = readFragment(SectionSliderFragment, data)

  return (
    <Section padding={d.sectionPadding} className={$.section}>
      <SliderImages data={data} />
    </Section>
  )
}

export default memo(VariantImages)
