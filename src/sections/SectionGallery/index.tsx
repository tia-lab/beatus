'use client'

import { Section } from '@/components/Core'
import { Lib } from '@/types'
import { readFragment } from 'gql.tada'
import { memo } from 'react'
import SectionGalleryFragment from './query'
import $ from './style.module.scss'

export interface SectionGalleryProps {
  data: Lib.FragmentOf<typeof SectionGalleryFragment>
}

export type SectionGalleryData = Lib.FragmentOf<
  typeof SectionGalleryFragment
> & {
  _modelApiKey: 'section_gallery'
  __typename: 'SectionGalleryRecord'
  id: string
}

const SectionGallery = ({ data }: SectionGalleryProps) => {
  const d = readFragment(SectionGalleryFragment, data)

  return (
    <Section
      padding={d.sectionPadding}
      className={$.section}
      anim="section-fade-in"
      mainWrapper={false}
    >
      section gallery
    </Section>
  )
}

export default memo(SectionGallery)
