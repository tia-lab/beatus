import { Container, Parse, Section } from '@/components/Core'
import { routing } from '@/i18n/routing'
import { Lib } from '@/types'
import { readFragment } from 'gql.tada'
import { memo } from 'react'
import SectionHeroFragment from './query'
import $ from './style.module.scss'
export interface SectionHeroProps {
  data: Lib.FragmentOf<typeof SectionHeroFragment>
  params?: {
    locale: (typeof routing.locales)[number]
    slug: string[]
  }
}

const SectionHero = ({ data }: SectionHeroProps) => {
  const d = readFragment(SectionHeroFragment, data)

  return (
    <Section className={$.section}>
      <Container className={$.container} anim="section-fade-in">
        {d.overline && <p className={$.overline}>{d.overline}</p>}
        <h1 className={$.title}>
          <Parse html={d.title} excludeTags={['p']} />
        </h1>
        {d.text && (
          <div className={$.text}>
            <Parse html={d.text} />
          </div>
        )}
      </Container>
    </Section>
  )
}

export default memo(SectionHero)
