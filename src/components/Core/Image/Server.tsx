import { ImageFragment } from '@/lib/fragments'
import { readFragment } from '@/lib/query'
import { Dato } from '@/types'
import clsx from 'clsx'
import { ImageProps } from '.'
import ResponsiveImage from '../ResponsiveImage'

export interface ServerImageProps extends ImageProps {
  season: Dato.Season
}

const ServerImage = ({
  data,
  isClient = false,
  wrap,
  wrapChildren,
  fitWrap,
  imgClassName,
  pictureClassName,
  priority,
  caption,
  ar = 'default',
  season,
  ...other
}: ServerImageProps) => {
  if (!data) {
    console.error('Responsive Image component is missing data')
    return null
  }

  const unmaskedData = readFragment(ImageFragment, data)

  const asset =
    data.isSeason && season === 'winter' && unmaskedData.assetWinter
      ? unmaskedData.assetWinter
      : unmaskedData.asset

  const {
    responsiveImage,
    responsiveImage16x9,
    responsiveImage1x1,
    responsiveImage3x4,
    responsiveImage4x3
  } = asset ?? {}

  const pictureClasses = clsx(fitWrap && 'picture-fit-wrap', pictureClassName)
  const imageClasses = clsx(fitWrap && 'image-fit-wrap', imgClassName)

  const getResponsiveImage =
    ar === '4x3'
      ? responsiveImage4x3
      : ar === '16x9'
        ? responsiveImage16x9
        : ar === '1x1'
          ? responsiveImage1x1
          : ar === '3x4'
            ? responsiveImage3x4
            : responsiveImage

  const ImageComponent = () => (
    <ResponsiveImage
      priority={data.priority || priority}
      data={{
        ...getResponsiveImage
      }}
      alt={getResponsiveImage.alt || 'decorative image'}
      isClient={isClient}
      imgClassName={imageClasses}
      pictureClassName={pictureClasses}
      layout={fitWrap ? 'fill' : other.layout}
      {...other}
    />
  )

  return wrap || caption ? (
    <div {...wrap}>
      <ImageComponent />
      {wrapChildren}
    </div>
  ) : (
    <ImageComponent />
  )
}

export default ServerImage
