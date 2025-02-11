import { Container, Section } from '@/components/Core'
import { CardListItem } from '@/components/Project'
import { Lib } from '@/types'
import clsx from 'clsx'
import { readFragment } from 'gql.tada'
import { memo } from 'react'
import SectionListFragment from './query'
import $ from './style.module.scss'

export interface SectionListProps {
  data: Lib.FragmentOf<typeof SectionListFragment>
}

export type SectionListData = Lib.FragmentOf<typeof SectionListFragment> & {
  _modelApiKey: 'section_list'
  __typename: 'SectionListRecord'
  id: string
}

const SectionList = ({ data }: SectionListProps) => {
  const d = readFragment(SectionListFragment, data)

  const sectionClass = clsx($.section, {
    [$.variant_images]: d.variant === 'images',
    [$.variant_default]: d.variant === 'default'
  })

  return (
    <Section
      id={d.sectionId || undefined}
      padding={d.sectionPadding}
      className={sectionClass}
      anim="section-fade-in"
    >
      <Container>
        {d.title && <h3 className={$.title}>{d.title}</h3>}
        <div className={$.content}>
          {d.pages.map((page, i) => (
            <CardListItem
              key={i}
              data={page}
              variant={d.variant === 'images' ? 'image' : 'default'}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}

export default memo(SectionList)
