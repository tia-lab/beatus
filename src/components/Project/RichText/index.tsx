import DetailContentFragment from '@/lib/fragments/structured-text/detail'
import { Lib } from '@/types'
import React, { memo } from 'react'
import VariantDetail from './Variant/Detail'

export interface RichTextProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Lib.FragmentOf<typeof DetailContentFragment>
  variant: 'detail-content'
}

const RichText = ({ ...props }: RichTextProps) => {
  switch (props.variant) {
    case 'detail-content':
      return <VariantDetail {...props} />
    default:
      return null
  }
}

export default memo(RichText)
