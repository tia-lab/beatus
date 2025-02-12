import { Container, Image, Parse, Section } from '@/components/Core'
import { Button } from '@/components/Ui'
import { memo } from 'react'
import { SectionCtaProps } from '../..'
import $ from './style.module.scss'
interface Props extends SectionCtaProps {}

const Fifty = ({ ...props }: Props) => {
  const { data } = props

  return (
    <Section className={$.section} padding={data.sectionPadding}>
      <Container anim="fade-in">
        <Image
          data={data.image}
          wrap={{ className: $.image }}
          fitWrap
          ar="3x4"
        />
        <div className={$.content}>
          {data.overline && (
            <p className="text-small text-neutral-400">{data.overline}</p>
          )}
          <h2 className="text-primary-400 text-style-uppercase">
            {data.title}
          </h2>
          <div className={$.text}>
            <Parse html={data.text} />
          </div>

          <Button data={data.button} variant="outline" />
        </div>
      </Container>
    </Section>
  )
}

export default memo(Fifty)
