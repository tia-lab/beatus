'use client'
import { animateBookingModal } from '@/animations/components'
import { Parse } from '@/components/Core'
import { EmblaCarousel, IconButton } from '@/components/Ui'
import { useGSAPContext, useKeyPress, useMedia } from '@/hooks'
import { getLinkUrl } from '@/lib/slugs'
import { useStoreNavigation } from '@/store'
import { Lib } from '@/types'
import { MEDIA } from '@config'
import clsx from 'clsx'
import { X } from 'lucide-react'
import { memo, useEffect, useRef } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-aria-components'
import { BookingModalProps } from '.'
import CardBookingModal from '../Cards/CardBookingModal'
import bookingModalQuery from './query'
import $ from './style.module.scss'

interface Props extends BookingModalProps {
  data: Lib.ResultOf<typeof bookingModalQuery>
}

const Client = ({ ...props }: Props) => {
  const { data } = props
  const d = data?.bookingModal

  const comp = useRef<any>(null)
  const tlRef = useRef<GSAPTimeline | null>(null)

  //Stores
  const open = useStoreNavigation.use.bookingModalOpen()
  const setOpen = useStoreNavigation.use.setBookingModalOpen()
  const bookinkKey = useStoreNavigation.use.bookingKey()
  const setBookingKey = useStoreNavigation.use.setBookingKey()

  //hooks
  const isTablet = useMedia(MEDIA.mobileUp)
  const isDekstop = useMedia(MEDIA.desktop)
  const isMobile = useMedia(MEDIA.mobile)

  useGSAPContext({
    type: 'isomorphic',
    scope: comp,
    callback: () => {
      animateBookingModal(comp, tlRef)
    }
  })

  useEffect(() => {
    if (open) {
      tlRef.current?.play()
    } else {
      tlRef.current?.reverse()
    }
  }, [open])

  useKeyPress('Escape', () => {
    setOpen(false)
  })

  const active = (cardLenght: number): boolean => {
    if (isTablet && cardLenght > 2) {
      return true
    }
    if (isDekstop && cardLenght > 3) {
      return true
    }

    if (isMobile && cardLenght > 1) {
      return true
    }
    return false
  }

  const axis = isTablet ? 'x' : 'y'

  return (
    <aside className={$.modal} ref={comp}>
      <div className={clsx('main-wrapper', $.main_wrapper)}>
        <h2 className="text-style-uppercase" data-item>
          <Parse html={d?.title} excludeTags={['p']} />
        </h2>
        <Tabs
          className={$.tabs}
          selectedKey={bookinkKey}
          onSelectionChange={(key) => setBookingKey(key as any)}
        >
          <TabList aria-label="Bookings" className={$.tab_list}>
            {d?.tabs.map((tab, k) => (
              <Tab
                id={String(k)}
                key={k}
                className={$.tab}
                data-active={String(k) === String(bookinkKey)}
                data-item
                data-cacca={String(k)}
              >
                {tab.title}
                <div className={$.tab_line} />
              </Tab>
            ))}
          </TabList>
          <div className={$.tabs_line} data-line />
          <div data-item>
            {d?.tabs.map((tab, k) => (
              <TabPanel
                id={String(k)}
                key={k}
                className="fade-in relative"
                data-item
              >
                <EmblaCarousel
                  containerClassName={$.embla_container}
                  options={{ active: active(tab.cards.length), axis }}
                  slides={tab.cards.map((card) => (
                    <CardBookingModal
                      className={$.slide}
                      key={card.id}
                      data={card}
                      href={getLinkUrl({ data: card.link }) || undefined}
                      transitionType="fade"
                      onClick={() => setOpen(false)}
                    />
                  ))}
                />
                {tab.cards.length > 3 && <div className={$.overlay} />}
              </TabPanel>
            ))}
          </div>
        </Tabs>
      </div>

      <IconButton
        data-item
        className={$.close}
        icon={<X width="100%" height="100%" strokeWidth={1} />}
        size="large"
        isNext={false}
        as="button"
        iconAnimation="rotate"
        onClick={() => setOpen(false)}
      />
    </aside>
  )
}

export default memo(Client)
