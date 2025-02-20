import { routing } from '@/i18n/routing'
import RetreatFragment from '@/lib/fragments/retreats/retreat'
import RoomFragment from '@/lib/fragments/rooms/room'
import { Lib } from '@/types'
import { memo } from 'react'
import SectionHeroFragment from './query'
import Default from './Variant/Default'
import Detail from './Variant/Detail'
export interface SectionHeroProps {
  variant: 'default' | 'detail'
  data:
    | Lib.FragmentOf<typeof SectionHeroFragment>
    | Lib.FragmentOf<typeof RoomFragment>
    | Lib.FragmentOf<typeof RetreatFragment>
  params?: {
    locale: (typeof routing.locales)[number]
    slug: string[]
  }
}

const SectionHero = ({ data, variant = 'default' }: SectionHeroProps) => {
  return variant === 'default' ? (
    <Default data={data} />
  ) : (
    <Detail data={data} />
  )
}

export default memo(SectionHero)
