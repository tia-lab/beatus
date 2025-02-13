import { Container, Image, Parse, Section } from '@/components/Core'
import { Button } from '@/components/Ui'
import { routing } from '@/i18n/routing'
import { Lib } from '@/types'
import clsx from 'clsx'
import { readFragment } from 'gql.tada'
import { memo } from 'react'
import SectionTextImageFragment from './query'
import $ from './style.module.scss'
export interface SectionTextImageProps {
  data: Lib.FragmentOf<typeof SectionTextImageFragment>
  params?: {
    locale: (typeof routing.locales)[number]
    slug: string[]
  }
}

const SectionTextImage = ({ data }: SectionTextImageProps) => {
  const d = readFragment(SectionTextImageFragment, data)

  const sectionClass = clsx($.section, d.variant === 'right' && $.image_right)

  return (
    <Section className={sectionClass} padding={d.sectionPadding}>
      <Container anim="fade-in">
        <Image data={d.image} wrap={{ className: $.image }} fitWrap ar="1x1" />

        <div className={$.content}>
          <h2 className="text-style-uppercase title-h3">
            <Parse html={d.title} excludeTags={['p']} />
          </h2>
          <div className={$.text}>
            <Parse html={d.text} />
          </div>

          <Button data={d.button} transitionType="slide" />
        </div>
      </Container>
    </Section>
  )
}

export default memo(SectionTextImage)
