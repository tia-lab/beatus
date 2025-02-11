import { Container } from '@/components/Core'
import { CardTeam } from '@/components/Project'
import { Lib } from '@/types'
import { Locale } from '@config'
import { memo } from 'react'
import SectionTeamFragment from '../../query'
import $ from '../../style.module.scss'
export interface SectionTeamProps {
  data: Lib.FragmentOf<typeof SectionTeamFragment>
  locale: Locale
}

export type SectionTeamData = Lib.FragmentOf<typeof SectionTeamFragment> & {
  _modelApiKey: 'section_team'
  __typename: 'SectionTeamRecord'
  id: string
}

const VariantSelectTeam = ({ data }: SectionTeamProps) => {
  return (
    <Container>
      <div className={$.cards}>
        {data.teamMembers.map((team, i) => (
          <CardTeam key={i} data={team} />
        ))}
      </div>
    </Container>
  )
}

export default memo(VariantSelectTeam)
