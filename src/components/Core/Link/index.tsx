import { LinkFragment } from '@/lib/fragments'
import { getLinkTitle, getLinkUrl } from '@/lib/slugs'
import { Lib } from '@/types'
import React from 'react'
import BaseLink from '../Base/BaseLink'
import { BaseLinkProps } from '../types'

export interface LinkProps extends BaseLinkProps {
  data?: Lib.FragmentOf<typeof LinkFragment> | null
  children?: React.ReactNode
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ data, ...props }, ref) => {
    if (!data) {
      return null
    }

    const url = getLinkUrl({ data })
    const title = getLinkTitle({ data })

    return data.isExternal ? (
      data.externalUrl && (
        <BaseLink
          {...props}
          isNext={false}
          href={data.externalUrl}
          target={data.targetBlank ? '_blank' : '_self'}
          ref={ref}
        >
          {data.text}
          {props.children}
        </BaseLink>
      )
    ) : (
      <BaseLink href={url || '/'} {...props} ref={ref}>
        {data.titleText && title ? title : data.text}
        {props.children}
      </BaseLink>
    )
  }
)

Link.displayName = 'Link'

export default Link
