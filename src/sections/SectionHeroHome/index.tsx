import Arrow from '$/public/icons/arrow/arrow.svg'
import { Container, Image, Parse, Section } from '@/components/Core'
import { routing } from '@/i18n/routing'
import { Lib } from '@/types'
import { memo } from 'react'
import Buttons from './Components/Buttons'
import SectionHeroFragment from './query'
import $ from './style.module.scss'
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

const SectionHero = ({ data }: SectionHeroProps) => {
  return (
    <Section
      mainWrapper={false}
      className={$.section}
      headerColor="light"
      headerColorImmediate
    >
      <Image
        data={data.image}
        wrap={{ className: $.image }}
        fitWrap
        ar="16x9"
        sizes="100vw"
      />
      <div className={$.overlay} />
      <Container className={$.container}>
        {data.title && (
          <h1 className={$.title}>
            <Parse html={data.title} excludeTags={['p']} />
          </h1>
        )}
      </Container>
      <div className={$.arrow}>
        <Arrow />
      </div>
      <Buttons />
    </Section>
  )
}

export default memo(SectionHero)
