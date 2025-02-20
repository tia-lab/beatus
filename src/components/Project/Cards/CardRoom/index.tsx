import { Image, Parse } from '@/components/Core'
import Button, { ButtonProps } from '@/components/Ui/Button'
import RoomCardFragment from '@/lib/fragments/rooms/cards'
import { Lib } from '@/types'
import { Icon } from '@iconify-icon/react/dist/iconify.mjs'
import clsx from 'clsx'
import { readFragment } from 'gql.tada'
import { useTranslations } from 'next-intl'
import { memo } from 'react'
import $ from './style.module.scss'

export interface CardRoomProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Lib.FragmentOf<typeof RoomCardFragment>
  button1Props?: ButtonProps
  button2Props?: ButtonProps
}

const CardRoom = ({ ...props }: CardRoomProps) => {
  const { data, className, button1Props, button2Props, ...rest } = props
  const d = readFragment(RoomCardFragment, data)
  const t = useTranslations()

  const _button1Props: ButtonProps = {
    href: `/room/${d.slug}`,
    children: t('card_room_more'),
    variant: 'outline',
    transitionType: 'slide',
    ...button1Props
  }

  const _button2Props: ButtonProps = {
    data: d.requestLink,
    transitionType: 'slide',
    children: t('card_room_request'),
    ...button2Props
  }

  return (
    <div className={clsx($.card, className)} {...rest}>
      <Image
        data={d.image}
        fitWrap
        wrap={{ className: $.image }}
        ar="16x9"
        sizes="40rem"
      />
      <div className={$.content}>
        <div className={$.title}>
          <Parse html={d.title} excludeTags={['p']} />
        </div>
        <div className={$.list}>
          <div className={$.list_item}>
            <div className={$.icon}>
              <Icon icon={d.amenities[0].icon} width="100%" height="100%" />
            </div>
            {d.amenities[0].title}
          </div>
          <div className={$.list_item}>
            <div className={$.icon}>
              <Icon icon="lucide:scan" width="100%" height="100%" />
            </div>
            <Parse html={d.size} />
          </div>
          <div className={$.list_item}>
            <div className={$.icon}>
              <Icon icon="lucide:user" width="100%" height="100%" />
            </div>
            <Parse html={d.people} />
          </div>
        </div>
        <div className={$.buttons}>
          <Button {..._button1Props} />
          <Button {..._button2Props} variant="fill" />
        </div>
      </div>
    </div>
  )
}

export default memo(CardRoom)
