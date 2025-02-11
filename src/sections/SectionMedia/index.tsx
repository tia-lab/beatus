import { Container, Image, Section } from '@/components/Core'
import { Lib } from '@/types'
import { MEDIA } from '@config'
import { readFragment } from 'gql.tada'
import dynamic from 'next/dynamic'
import { memo } from 'react'
import SectionMediaFragment from './query'
import $ from './style.module.scss'
const BackgroundVideo = dynamic(() => import('next-video/background-video'), {
  ssr: false
})

export interface SectionMediaProps {
  data: Lib.FragmentOf<typeof SectionMediaFragment>
}

export type SectionMediaData = Lib.FragmentOf<typeof SectionMediaFragment> & {
  _modelApiKey: 'section_media_image'
  __typename: 'SectionMediaRecord'
  id: string
}

const SectionMedia = ({ data }: SectionMediaProps) => {
  const d = readFragment(SectionMediaFragment, data)

  return (
    <Section
      id={d.sectionId || undefined}
      padding={d.sectionPadding}
      className={$.section}
      anim="section-fade-in"
    >
      <Container className={$.banner}>
        {data?.media?.isVideo ? (
          <div className={$.media}>
            <BackgroundVideo
              playbackId={data.media.video?.video.muxPlaybackId}
              className="object-fit"
            />
          </div>
        ) : (
          <Image
            data={data?.media?.image}
            wrap={{ className: $.media }}
            ar="13x4"
            fitWrap
            sizes={`${MEDIA.tablet}  100vw, 86rem`}
          />
        )}
      </Container>
    </Section>
  )
}

export default memo(SectionMedia)
