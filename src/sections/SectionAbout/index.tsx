import { Container, Div, Image, Parse, Section } from '@/components/Core'
import { Button } from '@/components/Ui'
import { routing } from '@/i18n/routing'
import { Lib } from '@/types'
import clsx from 'clsx'
import { memo } from 'react'
import SectionAboutFragment from './query'
import $ from './style.module.scss'
export interface SectionAboutProps {
  data: Lib.FragmentOf<typeof SectionAboutFragment>
  params?: {
    locale: (typeof routing.locales)[number]
    slug: string[]
  }
}

const SectionAbout = ({ data }: SectionAboutProps) => {
  return (
    <Section
      mainWrapper={false}
      className={$.section}
      padding={data.sectionPadding}
    >
      <div className="main-wrapper">
        <Container className={$.container} anim="section-fade-in">
          <div className={$.row}>
            <Div className={$.title} parallax={3}>
              <h2 className="title-h2 text-style-uppercase mb-space-md">
                <Parse html={data.title} excludeTags={['p']} />
              </h2>
              <p className="title-h4 text-style-uppercase">{data?.subtitle}</p>
            </Div>
            <Div parallax={2}>
              <Image
                data={data.imageTop}
                wrap={{ className: $.image }}
                fitWrap
                ar="1x1"
                sizes="28rem"
              />
            </Div>
          </div>
          <div className={$.row}>
            <Div parallax={5}>
              <Image
                data={data.imageBottom}
                wrap={{ className: clsx($.image, $.is_bottom) }}
                fitWrap
                ar="1x1"
                sizes="28rem"
              />
            </Div>
            <Div className={$.text} parallax={4}>
              <div className="rich-text">
                <Parse html={data.text} />
              </div>
              <div className="mb-space-lg" />
              <Button
                data={data.button}
                variant="text"
                className="text-neutral-600"
              />
            </Div>
          </div>
        </Container>
      </div>
    </Section>
  )
}

export default memo(SectionAbout)
