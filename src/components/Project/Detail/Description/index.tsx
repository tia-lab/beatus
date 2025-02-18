import { Container, Parse, Section } from '@/components/Core'
import RoomFragment from '@/lib/fragments/rooms/room'
import { Lib } from '@/types'
import { readFragment } from 'gql.tada'
import { memo } from 'react'
import $ from './style.module.scss'

export interface DetailDescriptionProps {
  data: Lib.FragmentOf<typeof RoomFragment>
}

const DetailDescription = ({ data }: DetailDescriptionProps) => {
  const d = readFragment(RoomFragment, data)
  return (
    <Section className={$.section}>
      <Container>
        <div className={$.description}>
          <Parse html={d.description} />
        </div>
      </Container>
    </Section>
  )
}

export default memo(DetailDescription)
