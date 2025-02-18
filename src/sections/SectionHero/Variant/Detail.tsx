import { Container, Parse, Section } from '@/components/Core'
import RoomFragment from '@/lib/fragments/rooms/room'
import { Lib } from '@/types'
import { readFragment } from 'gql.tada'
import { memo } from 'react'
import { SectionHeroProps } from '..'
import $ from '../style.module.scss'

const Detail = ({ data }: Omit<SectionHeroProps, 'variant'>) => {
  const d = readFragment(
    RoomFragment,
    data as Lib.FragmentOf<typeof RoomFragment>
  )
  if (!d) return null
  return (
    <Section className={$.section_detail}>
      <Container className={$.container} anim="section-fade-in">
        {d.overline && <p className={$.overline}>{d.overline}</p>}
        <h1 className={$.title}>
          <Parse html={d.title} excludeTags={['p']} />
        </h1>
        {/* {d.shortDescription && (
          <div className={$.text}>
            <Parse html={d.shortDescription} />
          </div>
        )} */}
      </Container>
    </Section>
  )
}

export default memo(Detail)
