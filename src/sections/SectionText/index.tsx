import { Container, Section } from '@/components/Core'
import { Lib } from '@/types'
import { readFragment } from 'gql.tada'
import { memo } from 'react'
import SectionTextFragment from './query'
import $ from './style.module.scss'

export interface SectionTextProps {
  data: Lib.FragmentOf<typeof SectionTextFragment>
}

export type SectionTextData = Lib.FragmentOf<typeof SectionTextFragment> & {
  _modelApiKey: 'section_text'
  __typename: 'SectionTextRecord'
  id: string
}

const SectionText = ({ data }: SectionTextProps) => {
  const d = readFragment(SectionTextFragment, data)

  return (
    <>
      <Section
        padding={d.sectionPadding}
        className={$.section}
        anim="section-fade-in"
      >
        <Container className="relative">section ntext</Container>
      </Section>
    </>
  )
}

export default memo(SectionText)
