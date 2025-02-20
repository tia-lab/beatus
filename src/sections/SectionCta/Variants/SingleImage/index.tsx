import { Container, Div, Image, Section } from '@/components/Core'
import { Button } from '@/components/Ui'
import { memo } from 'react'
import { SectionCtaProps } from '../..'
import $ from './style.module.scss'
interface Props extends SectionCtaProps {}

const SingleImage = ({ ...props }: Props) => {
  const { data } = props

  return (
    <Section
      className={$.section}
      mainWrapper={false}
      padding={data.sectionPadding}
      headerColor="light"
    >
      <Image
        data={data.image}
        wrap={{ className: $.image }}
        fitWrap
        ar="16x9"
        sizes="100vw"
      />
      <div className={$.overlay} />
      <div className="main-wrapper">
        <Container anim="fade-in" className={$.container}>
          <div className={$.content}>
            {data.overline && (
              <Div as="p" className="text-small text-white">
                {data.overline}
              </Div>
            )}
            <Div as="h2" className={$.title}>
              {data.title}
            </Div>
            <Div parallax={2}>
              <p className={$.sub_title}>{data.subtitle}</p>
              <Button data={data.button} onImage transitionType="slide" />
            </Div>
          </div>
        </Container>
      </div>
    </Section>
  )
}

export default memo(SingleImage)
