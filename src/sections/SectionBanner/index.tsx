import Logo from '$/public/images/logo/LogoHeader.svg'
import { Container, Section } from '@/components/Core'
import { Button } from '@/components/Ui'
import { Lib } from '@/types'
import { readFragment } from 'gql.tada'
import { memo } from 'react'
import SectionBannerFragment from './query'
import $ from './style.module.scss'
export interface SectionBannerProps {
  data: Lib.FragmentOf<typeof SectionBannerFragment>
}

export type SectionBannerData = Lib.FragmentOf<typeof SectionBannerFragment> & {
  _modelApiKey: 'section_banner'
  __typename: 'SectionBannerRecord'
  id: string
}

const SectionBanner = ({ data }: SectionBannerProps) => {
  const d = readFragment(SectionBannerFragment, data)

  return (
    <Section
      id={d.sectionId || undefined}
      padding={d.sectionPadding}
      className={$.section}
      anim="section-fade-in"
    >
      <Container className={$.banner}>
        <div className={$.logo}>
          <Logo />
        </div>
        <div className={$.text}>{d.text}</div>
        {d.button && (
          <Button data={d.button} className={$.button} transitionType="slide" />
        )}
      </Container>
    </Section>
  )
}

export default memo(SectionBanner)
