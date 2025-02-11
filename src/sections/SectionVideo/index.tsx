import { Container, Section, VideoPlayerExternal } from '@/components/Core'
import { Lib } from '@/types'
import { readFragment } from 'gql.tada'
import { memo } from 'react'
import SectionVideoFragment from './query'
import $ from './style.module.scss'

export interface SectionVideoProps {
  data: Lib.FragmentOf<typeof SectionVideoFragment>
}

export type SectionVideoData = Lib.FragmentOf<typeof SectionVideoFragment> & {
  _modelApiKey: 'section_video'
  __typename: 'SectionVideoRecord'
  id: string
}

const SectionVideo = ({ data }: SectionVideoProps) => {
  const d = readFragment(SectionVideoFragment, data)

  return (
    <Section
      id={d.sectionId || undefined}
      padding={d.sectionPadding}
      className={$.section}
      anim="section-fade-in"
    >
      <Container className={$.banner}>
        <VideoPlayerExternal
          data={d.video}
          wrap={{ className: $.video }}
          controls
        />
      </Container>
    </Section>
  )
}

export default memo(SectionVideo)
