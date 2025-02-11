'use client'

import { Container, Section } from '@/components/Core'
import { Modal } from '@/components/Layout'
import { Button } from '@/components/Ui'
import { Lib } from '@/types'
import clsx from 'clsx'
import { readFragment } from 'gql.tada'
import { useTranslations } from 'next-intl'
import { memo, useState } from 'react'
import SideBarItem from './components/SidebarItem'
import SectionTextFragment from './query'
import $ from './style.module.scss'

export interface SectionTextProps {
  data: Lib.FragmentOf<typeof SectionTextFragment>
}

export type SectionTextData = Lib.FragmentOf<typeof SectionTextFragment> & {
  _modelApiKey: 'section_text'
  __typename: 'SectionTextRecord'
  id: string
}

const SectionText = ({ data }: SectionTextProps) => {
  const d = readFragment(SectionTextFragment, data)
  const [open, setOpen] = useState(false)
  const t = useTranslations()

  const hanldeOpen = () => {
    setOpen(true)
  }

  return (
    <>
      <Section
        id={d.sectionId || undefined}
        padding={d.sectionPadding}
        className={$.section}
        anim="section-fade-in"
      >
        <Container className="relative">
          <div className={$.col}>
            {d.leadText && <p className="title-h4">{d.leadText}</p>}
            <div
              className="rich-text"
              dangerouslySetInnerHTML={{ __html: d.text as string }}
            />
          </div>
          {d.isSidebar && (
            <div
              className={clsx($.sidebar, d.stickySidebar && $.sidebar_sticky)}
            >
              {d.sidebar.map((item, i) => (
                <SideBarItem
                  key={i}
                  data={item}
                  isDivider={i !== d.sidebar.length - 1}
                />
              ))}
            </div>
          )}
          {d.isSidebar && (
            <div className={$.mobile_sidebar}>
              <Button
                as="div"
                isNext={false}
                className={$.button}
                onClick={hanldeOpen}
              >
                {d.sidebar.length === 1 && d.sidebar[0].isContact
                  ? t('section_text_mobile_contact_button')
                  : t('section_text_mobile_booking_button')}
              </Button>
            </div>
          )}
        </Container>
      </Section>
      {d.isSidebar && (
        <Modal
          title=""
          openState={open}
          setOpenState={setOpen}
          content={d.sidebar.map((item, i) => (
            <SideBarItem
              key={i}
              data={item}
              isDivider={i !== d.sidebar.length - 1}
            />
          ))}
        />
      )}
    </>
  )
}

export default memo(SectionText)
