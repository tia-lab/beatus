import { Container, Section, Title } from '@/components/Core'
import { Lib } from '@/types'
import { readFragment } from 'gql.tada'
import { memo } from 'react'
import Client from './Client'
import SectionOfficeFragment from './query'
import $ from './style.module.scss'

export interface SectionOfficeProps {
  data: Lib.FragmentOf<typeof SectionOfficeFragment>
}

export type SectionOfficeData = Lib.FragmentOf<typeof SectionOfficeFragment> & {
  _modelApiKey: 'section_office'
  __typename: 'SectionOfficeRecord'
  id: string
}

const SectionOffice = ({ data }: SectionOfficeProps) => {
  const d = readFragment(SectionOfficeFragment, data)
  return (
    <Section
      padding={d.sectionPadding}
      className={$.section}
      id={d.sectionId || undefined}
      anim="section-fade-in"
    >
      <Container>
        <Title className={$.title} as="h3">
          {d.title}
        </Title>
        <Client data={data} />
      </Container>
    </Section>
  )
}

export default memo(SectionOffice)
