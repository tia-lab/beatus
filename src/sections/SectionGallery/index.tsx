'use client'

import { Container, Section } from '@/components/Core'
import { useMedia } from '@/hooks'
import { Lib } from '@/types'
import { MEDIA } from '@config'
import { readFragment } from 'gql.tada'
import { memo } from 'react'
import EmblaCarousel from './Components/EmblaCarousel'
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
  const isDesktop = useMedia(MEDIA.desktop)

  const Comp = () => {
    return (
      <Container className={$.container}>
        <EmblaCarousel
          useButtons
          options={{
            align: 'center',
            containScroll: 'trimSnaps',
            startIndex: 1,
            breakpoints: {
              '(max-width: 1023px)': {
                startIndex: 0,
                containScroll: 'keepSnaps'
              }
            }
          }}
          data={d}
        />
      </Container>
    )
  }

  return (
    <Section
      id={d.sectionId || undefined}
      padding={d.sectionPadding}
      className={$.section}
      anim="section-fade-in"
      mainWrapper={false}
    >
      {isDesktop ? (
        <div className="main-wrapper">
          <Comp />
        </div>
      ) : (
        <Comp />
      )}
    </Section>
  )
}

export default memo(SectionGallery)
