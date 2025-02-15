'use client'
import { Parse, Section } from '@/components/Core'
import { EmblaCarousel } from '@/components/Ui'
import { Lib } from '@/types'
import { memo, useState } from 'react'
import { Key, Tab, TabList, TabPanel, Tabs } from 'react-aria-components'
import { BookingModalProps } from '.'
import bookingModalQuery from './query'
import $ from './style.module.scss'

interface Props extends BookingModalProps {
  data: Lib.ResultOf<typeof bookingModalQuery>
}

const Client = ({ ...props }: Props) => {
  const { data } = props
  const d = data?.bookingModal

  const [tabKey, setTabKey] = useState<Key>(d?.tabs[0].id as Key)

  return (
    <Section className={$.modal} as="aside" mainWrapper={false}>
      <div className={$.main_wrapper}>
        <h2 className="text-style-uppercase">
          <Parse html={d?.title} excludeTags={['p']} />
        </h2>
        <Tabs
          className={$.tabs}
          selectedKey={tabKey}
          onSelectionChange={setTabKey}
        >
          <TabList aria-label="History of Ancient Rome">
            {d?.tabs.map((tab) => (
              <Tab id={tab.id} key={tab.id}>
                {tab.title}
              </Tab>
            ))}
          </TabList>
          {d?.tabs.map((tab) => (
            <TabPanel id={tab.id} key={tab.id} className="fade-in">
              <EmblaCarousel
                options={{ loop: true }}
                slides={tab.cards.map((card) => (
                  <div key={card.id} className={$.slide}>
                    {card.title}
                  </div>
                ))}
              />
            </TabPanel>
          ))}
        </Tabs>
      </div>
    </Section>
  )
}

export default memo(Client)
