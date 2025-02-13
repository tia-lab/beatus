import { Container, Parse, Section } from '@/components/Core'
import { Button } from '@/components/Ui'
import { routing } from '@/i18n/routing'
import { Lib } from '@/types'
import clsx from 'clsx'
import { readFragment } from 'gql.tada'
import { memo } from 'react'
import SectionTextDisplayFragment from './query'
import $ from './style.module.scss'

export interface SectionTextDisplayProps {
  data: Lib.FragmentOf<typeof SectionTextDisplayFragment>
  params?: {
    locale: (typeof routing.locales)[number]
    slug: string[]
  }
}

const SectionTextDisplay = ({ data }: SectionTextDisplayProps) => {
  const d = readFragment(SectionTextDisplayFragment, data)

  const sectionClass = clsx($.section, d.variant === 'two-col' && $.twoCol)

  const Texts = () => {
    return d.variant === 'two-col' ? (
      <div className={$.cols}>
        <div className="rich-text">
          <Parse html={d?.text} />
        </div>
        <div className="rich-text">
          <Parse html={d?.textColTwo} />
        </div>
      </div>
    ) : (
      <div className={$.col}>
        <div className="rich-text">
          <Parse html={d?.text} />
        </div>
      </div>
    )
  }

  return (
    <Section padding={d.sectionPadding} className={sectionClass}>
      <Container anim="section-fade-in">
        <div className={$.content}>
          {d.overline && (
            <p className="text-small text-neutral-400">{d.overline}</p>
          )}
          <h2 className="text-style-uppercase title-h1">
            <Parse html={d.title} excludeTags={['p']} />
          </h2>
          <Texts />
          {d.button && (
            <Button data={d?.button} variant="outline" transitionType="slide" />
          )}
        </div>
      </Container>
    </Section>
  )
}

export default memo(SectionTextDisplay)
