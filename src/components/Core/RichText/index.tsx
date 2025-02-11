import { ImageBlock, ImageGalleryBlock } from '@/components/Blocks'
import { isCode, isHeading } from 'datocms-structured-text-utils'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { memo } from 'react'
import {
  StructuredText,
  StructuredTextGraphQlResponse,
  renderNodeRule
} from 'react-datocms'
import HeadingWithAnchorLink from './components/HeadingWithAnchorLink'

// Dynamically load these components for optimization
const VideoBlock = dynamic(() => import('@/components/Blocks/VideoBlock'))
const CodeBlock = dynamic(() => import('@/components/Blocks/CodeBlock'))

interface RichTextProps {
  data: StructuredTextGraphQlResponse | null | undefined
}

const RichText = ({ data }: RichTextProps) => {
  if (!data) {
    console.error('StructuredText data is missing')
    return null
  }

  return (
    <StructuredText
      data={data}
      customNodeRules={[
        renderNodeRule(isCode, ({ node, key }) => (
          <CodeBlock key={key} node={node} />
        )),
        renderNodeRule(isHeading, ({ node, key, children }) => (
          <HeadingWithAnchorLink node={node} key={key}>
            {children}
          </HeadingWithAnchorLink>
        ))
      ]}
      renderBlock={({ record }) => {
        switch (record.__typename) {
          case 'VideoBlockRecord':
            return <VideoBlock data={record as any} />
          case 'ImageBlockRecord':
            return <ImageBlock data={record as any} />
          case 'ImageGalleryBlockRecord':
            return <ImageGalleryBlock data={record as any} />
          default:
            return null
        }
      }}
      renderInlineRecord={({ record }) => {
        switch (record.__typename) {
          case 'PageRecord':
            return (
              <Link href="/" className="pill">
                {record.title as any}
              </Link>
            )
          default:
            return null
        }
      }}
      renderLinkToRecord={({ record, children, transformedMeta }) => {
        return (
          <a href={record.id} {...transformedMeta}>
            {children}
          </a>
        )
      }}
    />
  )
}

export default memo(RichText)
