import { Container, Parse, Section } from '@/components/Core'
import RetreatFragment from '@/lib/fragments/retreats/retreat'
import { Lib } from '@/types'
import { readFragment } from 'gql.tada'
import { memo } from 'react'
import { SectionHeroProps } from '..'
import SectionHeroFragment from '../query'
import $ from '../style.module.scss'

const Default = ({ data }: Omit<SectionHeroProps, 'variant'>) => {
  const d = readFragment(
    SectionHeroFragment,
    data as Lib.FragmentOf<typeof SectionHeroFragment> &
      Lib.FragmentOf<typeof RetreatFragment>
  )
  if (!d) return null
  return (
    <Section className={$.section} headerColor="dark" headerColorImmediate>
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

export default memo(Default)
