import { ImageFragment } from '@/lib/fragments'
import { readFragment } from '@/lib/query'
import { Lib } from '@/types'
import clsx from 'clsx'
import { HTMLAttributes } from 'react'
import ResponsiveImage, { ResponsiveImageProps } from '../ResponsiveImage'

export type ImageProps = Omit<ResponsiveImageProps, 'data'> & {
  data?: Lib.FragmentOf<typeof ImageFragment> | null
  wrap?: HTMLAttributes<HTMLDivElement>
  wrapChildren?: React.ReactNode
  fitWrap?: boolean
  priority?: boolean
  caption?: HTMLAttributes<HTMLDivElement>
  ar?: 'default' | '16x9' | '4x3' | '1x1' | '3x4' | '13x4'
}

const Image = ({
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
  ...other
}: ImageProps) => {
  if (!data) {
    console.error('Responsive Image component is missing data')
    return null
  }

  const unmaskedData = readFragment(ImageFragment, data)

  const {
    responsiveImage,
    responsiveImage16x9,
    responsiveImage1x1,
    responsiveImage3x4,
    responsiveImage4x3,
    responsiveImage13x4
  } = unmaskedData.asset

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
            : ar === '13x4'
              ? responsiveImage13x4
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

export default Image
