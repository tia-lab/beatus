import { BaseLink, Image, Parse } from '@/components/Core'
import { BaseLinkProps } from '@/components/Core/types'
import { Lib } from '@/types'
import clsx from 'clsx'
import { memo } from 'react'
import CardBookinModalFragment from './query'
import $ from './style.module.scss'
export interface CardBookingModalProps extends BaseLinkProps {
  data: Lib.FragmentOf<typeof CardBookinModalFragment>
}

const CardBookingModal = ({ ...props }: CardBookingModalProps) => {
  const { data, className, ...rest } = props
  return (
    <BaseLink className={clsx($.card, className)} {...rest}>
      <Image data={data.image} fitWrap wrap={{ className: $.image }} ar="3x4" />
      <div className={$.overlay} />
      <div className={$.bottom}>
        <div className="title-h5 text-style-uppercase">
          <Parse html={data.title} excludeTags={['p']} />
        </div>
        <div className={$.icon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M23.8235 11.9105L24 11.9463V12.4115C21.0353 13.1629 16.8353 16.0254 12.2824 21.5L10.5529 19.7825C13.4824 17.0273 17.1176 14.6299 21.3882 12.6262C14.2588 12.6262 7.12941 12.9124 0 13.2702V11.1234C7.12941 11.4812 14.2588 11.7674 21.3882 11.7674C17.2235 9.72787 13.6235 7.18738 10.5529 4.21751L12.2824 2.5C16.8 7.97458 21 11.0518 23.8235 11.9105Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </BaseLink>
  )
}

export default memo(CardBookingModal)
