import { Container, Section } from '@/components/Core'
import RoomFragment from '@/lib/fragments/rooms/room'
import { Lib } from '@/types'
import { readFragment } from 'gql.tada'
import { memo } from 'react'
import RichText from '../../RichText'
import $ from './style.module.scss'

export interface DetailContentProps {
  data: Lib.FragmentOf<typeof RoomFragment>
}

const DetailContent = ({ data }: DetailContentProps) => {
  const d = readFragment(RoomFragment, data)
  return (
    <Section className={$.section}>
      <Container anim="fade-in">
        <RichText
          data={d.content}
          variant="detail-content"
          className={$.text}
        />
      </Container>
    </Section>
  )
}

export default memo(DetailContent)
