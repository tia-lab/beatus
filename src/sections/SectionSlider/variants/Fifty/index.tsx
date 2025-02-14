import { Container, Parse, Section } from '@/components/Core'
import { Button } from '@/components/Ui'
import { readFragment } from 'gql.tada'
import { memo } from 'react'
import { SectionSliderProps } from '../..'
import SliderFifty from '../../Components/SliderFifty'
import SectionSliderFragment from '../../query'
import $ from './style.module.scss'

const VariantFifty = ({ data }: SectionSliderProps) => {
  const d = readFragment(SectionSliderFragment, data)

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
          <div className={$.line} />
          <div className={$.content_text}>
            <div className="rich-text">
              <Parse html={d.text} />
            </div>
            {d.button && (
              <Button data={d.button} variant="text" transitionType="slide" />
            )}
          </div>
        </div>
        <SliderFifty data={data} />
      </Container>
    </Section>
  )
}

export default memo(VariantFifty)
