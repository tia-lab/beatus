import { Section } from '@/components/Core'
import RoomFragment from '@/lib/fragments/rooms/room'
import { Lib } from '@/types'
import { memo } from 'react'
import SliderImages from './Components/SliderImages'
import $ from './style.module.scss'

export interface DetailGalleryProps {
  data: Lib.FragmentOf<typeof RoomFragment>
}

const DetailGallery = ({ ...props }: DetailGalleryProps) => {
  return (
    <Section className={$.section}>
      <SliderImages {...props} />
    </Section>
  )
}

export default memo(DetailGallery)
