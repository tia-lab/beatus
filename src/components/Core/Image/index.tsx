'use client'

import { ImageFragment } from '@/lib/fragments'
import { useStoreData } from '@/store'
import { Lib } from '@/types'
import { HTMLAttributes } from 'react'
import { ResponsiveImageProps } from '../ResponsiveImage'
import ServerImage from './Server'

export type ImageProps = Omit<ResponsiveImageProps, 'data'> & {
  data?: Lib.FragmentOf<typeof ImageFragment> | null
  wrap?: HTMLAttributes<HTMLDivElement>
  wrapChildren?: React.ReactNode
  fitWrap?: boolean
  priority?: boolean
  caption?: HTMLAttributes<HTMLDivElement>
  ar?: 'default' | '16x9' | '4x3' | '1x1' | '3x4'
}

const Image = ({ ...props }: ImageProps) => {
  const season = useStoreData((state) => state.data.season)

  return <ServerImage season={season} {...props} />
}

export default Image
