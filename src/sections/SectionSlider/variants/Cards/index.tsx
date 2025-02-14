import { Container, Parse, Section } from '@/components/Core'
import { readFragment } from 'gql.tada'
import { memo } from 'react'
import { SectionSliderProps } from '../..'
import SliderCards from '../../Components/SliderCards'
import SectionSliderFragment from '../../query'
import $ from './style.module.scss'

const VariantCards = ({ data }: SectionSliderProps) => {
  const d = readFragment(SectionSliderFragment, data)

  return (
    <Section padding={d.sectionPadding} className={$.section}>
      <Container anim="section-fade-in">
        <div className={$.content}>
          <div className={$.content_title}>
            {d.overline && (
              <div className="text-small text-neutral-400">{d.overline}</div>
            )}
            <h2 className="text-style-uppercase title-h3 text-primary-300">
              <Parse html={d.title} excludeTags={['p']} />
            </h2>
          </div>
          <div className={$.content_text}>
            <div className="rich-text">
              <Parse html={d.text} />
            </div>
          </div>
        </div>
      </Container>
      <SliderCards
        //@ts-expect-error
        data={data}
      />
    </Section>
  )
}

export default memo(VariantCards)
