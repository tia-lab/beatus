import { Image } from '@/components/Core'
import { Button } from '@/components/Ui'
import DetailContentFragment from '@/lib/fragments/structured-text/detail'
import { Lib } from '@/types'
import clsx from 'clsx'
import { isHeading } from 'datocms-structured-text-utils'
import { StructuredText, renderNodeRule } from 'react-datocms/structured-text'
import { RichTextProps } from '..'
import Spacer from '../../Spacer'

const VariantDetail = ({ ...props }: RichTextProps) => {
  const { data, className, ...rest } = props
  if (!data) return null
  return (
    <div className={clsx('rich-text', className)} {...rest}>
      <StructuredText
        data={(data as Lib.FragmentOf<typeof DetailContentFragment>).content}
        customNodeRules={[
          renderNodeRule(isHeading, ({ node, children, key }) => {
            const HeadingTag = `h${node.level}` as any
            return (
              <HeadingTag key={key} className="text-style-uppercase">
                {children}
              </HeadingTag>
            )
          })
        ]}
        renderBlock={({ record }) => {
          switch (record.__typename) {
            case 'ImageBlockRecord':
              return <Image data={record} />
            case 'LinkRecord':
              return <Button data={record} transitionType="slide" />
            case 'SpacerRecord':
              return <Spacer data={record} />
            default:
              return null
          }
        }}
      />
    </div>
  )
}

export default VariantDetail
