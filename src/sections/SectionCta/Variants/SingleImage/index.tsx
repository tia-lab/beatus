import { Container, Image, Section } from '@/components/Core'
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
    >
      <Image
        data={data.image}
        wrap={{ className: $.image }}
        fitWrap
        ar="16x9"
      />
      <div className={$.overlay} />
      <div className="main-wrapper">
        <Container anim="fade-in" className={$.container}>
          <div className={$.content}>
            {data.overline && (
              <p className="text-small text-white">{data.overline}</p>
            )}
            <h2 className={$.title}>{data.title}</h2>
            <p className={$.sub_title}>{data.subtitle}</p>
            <Button data={data.button} onImage transitionType="slide" />
          </div>
        </Container>
      </div>
    </Section>
  )
}

export default memo(SingleImage)
