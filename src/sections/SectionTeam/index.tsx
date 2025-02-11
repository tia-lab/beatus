import { Section } from '@/components/Core'
import { TeamMemberFragment } from '@/lib/fragments'
import { executeQuery } from '@/lib/query'
import { Lib } from '@/types'
import { Locale } from '@config'
import { readFragment } from 'gql.tada'
import { getLocale, getTranslations } from 'next-intl/server'
import { memo } from 'react'
import SectionTeamFragment, { queryCategories } from './query'
import $ from './style.module.scss'
import VariantAllTeam from './Variants/AllTeam'
import VariantSelectTeam from './Variants/SelectTeam'
export interface SectionTeamProps {
  data: Lib.FragmentOf<typeof SectionTeamFragment>
}

export type SectionTeamData = Lib.FragmentOf<typeof SectionTeamFragment> & {
  _modelApiKey: 'section_team'
  __typename: 'SectionTeamRecord'
  id: string
}

export type TeamMember = Lib.FragmentOf<typeof TeamMemberFragment>[]

const SectionTeam = async ({ data }: SectionTeamProps) => {
  const d = readFragment(SectionTeamFragment, data)
  const locale = (await getLocale()) as Locale
  const _t = await getTranslations()
  const categories = await executeQuery(queryCategories, {
    variables: { locale, locale1: locale, locale2: locale, locale3: locale }
  })

  return (
    <Section
      id={d.sectionId || undefined}
      className={$.section}
      padding={d.sectionPadding}
      anim="section-fade-in"
    >
      {d.selectTeamMember ? (
        <VariantSelectTeam data={d} locale={locale} />
      ) : (
        <VariantAllTeam data={d} categories={categories as any} />
      )}
    </Section>
  )
}

export default memo(SectionTeam)
