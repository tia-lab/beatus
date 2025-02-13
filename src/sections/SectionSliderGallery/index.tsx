import { Container, Parse, Section } from '@/components/Core'
import { SectionBuilderProps } from '@/components/Core/types'
import { Button } from '@/components/Ui'
import { Lib } from '@/types'
import { readFragment } from 'gql.tada'
import { memo } from 'react'
import Slider from './Components/Slider'
import SectionSliderGalleryFragment from './query'
import $ from './style.module.scss'

export interface SectionSliderGalleryProps {
  data: Lib.FragmentOf<typeof SectionSliderGalleryFragment>
  params: SectionBuilderProps['params']
}

const SectionSliderGallery = ({ data }: SectionSliderGalleryProps) => {
  const d = readFragment(SectionSliderGalleryFragment, data)

  return (
    <Section padding={d.sectionPadding} className={$.section}>
      <Container anim="section-fade-in">
        <div className={$.content}>
          <div className={$.content_title}>
            {d.overline && (
              <div className="text-small text-neutral-400">{d.overline}</div>
            )}
            <h2 className="text-style-uppercase text-primary-300">
              <Parse html={d.title} excludeTags={['p']} />
            </h2>
          </div>
          <div className={$.content_text}>
            <div className="rich-text">
              <Parse html={d.text} />
            </div>
            {d.button && (
              <Button data={d.button} variant="text" transitionType="slide" />
            )}
          </div>
        </div>
      </Container>
      <Slider data={data} />
    </Section>
  )
}

export default memo(SectionSliderGallery)
