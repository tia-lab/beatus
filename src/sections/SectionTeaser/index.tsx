import { Container, Image, Section } from '@/components/Core'
import { Button } from '@/components/Ui'
import { Lib } from '@/types'
import { MEDIA } from '@config'
import { readFragment } from 'gql.tada'
import { memo } from 'react'
import SectionTeaserFragment from './query'
import $ from './style.module.scss'

export interface SectionTeaserProps {
  data: Lib.FragmentOf<typeof SectionTeaserFragment>
}

export type SectionTeaserData = Lib.FragmentOf<typeof SectionTeaserFragment> & {
  _modelApiKey: 'section_teaser'
  __typename: 'SectionTeaserRecord'
  id: string
}

const SectionTeaser = ({ data }: SectionTeaserProps) => {
  const d = readFragment(SectionTeaserFragment, data)

  return (
    <Section
      id={d.sectionId || undefined}
      padding={d.sectionPadding}
      className={$.section}
      anim="section-fade-in"
    >
      <Container>
        <Image
          data={d.image}
          fitWrap
          wrap={{ className: $.image_wrap }}
          ar="3x4"
          sizes={`${MEDIA.tablet} 43.75rem, 31.25rem`}
        />
        <div className={$.content}>
          <h1 className="title-display">{d.title}</h1>
          <div className={$.content_text}>
            <h2>{d.subtitle}</h2>
            {d.text && <p className="text-large font-weight-400">{d.text}</p>}
          </div>
          <Button
            data={d.button}
            className={$.button}
            transitionType={d.button?.isExternal ? undefined : 'slide'}
          />
        </div>
      </Container>
      <Container>
        <Image
          sizes={`${MEDIA.tablet} 18rem, 30rem`}
          data={d.imageSmall}
          fitWrap
          wrap={{ className: $.image_small_wrap }}
          ar="16x9"
        />
      </Container>
    </Section>
  )
}

export default memo(SectionTeaser)
