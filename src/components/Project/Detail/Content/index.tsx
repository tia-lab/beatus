import { Container, Section } from '@/components/Core'
import RetreatFragment from '@/lib/fragments/retreats/retreat'
import RoomFragment from '@/lib/fragments/rooms/room'
import { Lib } from '@/types'
import { memo } from 'react'
import RichText from '../../RichText'
import $ from './style.module.scss'

export interface DetailContentProps {
  data:
    | Lib.FragmentOf<typeof RoomFragment>
    | Lib.FragmentOf<typeof RetreatFragment>
}

const DetailContent = ({ data }: DetailContentProps) => {
  return (
    <Section className={$.section}>
      <Container anim="fade-in">
        <RichText
          data={data.content}
          variant="detail-content"
          className={$.text}
        />
      </Container>
    </Section>
  )
}

export default memo(DetailContent)
