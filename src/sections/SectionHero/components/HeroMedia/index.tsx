import { Image } from '@/components/Core'
import { ImageProps } from '@/components/Core/types'
import { ImageFragment, VideoPlayerFragment } from '@/lib/fragments'
import { Lib } from '@/types'
import dynamic from 'next/dynamic'
const BackgroundVideo = dynamic(() => import('next-video/background-video'))

export interface HeroMediaData extends React.HTMLAttributes<HTMLDivElement> {
  data: {
    isVideo?: boolean
    image?: Lib.FragmentOf<typeof ImageFragment> | null
    video?: Lib.FragmentOf<typeof VideoPlayerFragment> | null
  }
  ar?: ImageProps['ar']
  sizes?: ImageProps['sizes']
}

const HeroMedia = ({ data, ...props }: HeroMediaData) => {
  if (!data.video && !data.image) return null

  return (
    <div {...props}>
      {data?.isVideo && data.video ? (
        <BackgroundVideo
          playbackId={data.video.video.muxPlaybackId}
          className="object-fit"
        />
      ) : (
        data.image && (
          <Image data={data.image} fitWrap ar={props.ar} sizes={props.sizes} />
        )
      )}
    </div>
  )
}

export default HeroMedia
