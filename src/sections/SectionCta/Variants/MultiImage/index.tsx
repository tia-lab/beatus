import { Container, Div, Image, Parse, Section } from '@/components/Core'
import { Button } from '@/components/Ui'
import clsx from 'clsx'
import { memo } from 'react'
import { SectionCtaProps } from '../..'
import $ from './style.module.scss'
interface Props extends SectionCtaProps {}

const MultiImage = ({ ...props }: Props) => {
  const { data } = props

  const [image1, image2, image3, image4, image5] = data.imageGallery

  return (
    <Section
      className={$.section}
      padding={data.sectionPadding}
      mainWrapper={false}
      headerColor="light"
    >
      <div className={clsx('main-wrapper', $.mainWrapper)}>
        <div className={$.imageGallery}>
          <Div parallax={-1} className={clsx($.image, $.image_1)}>
            <Image
              data={image1}
              wrap={{ className: $.image_inner }}
              fitWrap
              ar="16x9"
            />
          </Div>
          <Div parallax={2} className={clsx($.image, $.image_2)}>
            <Image
              data={image2}
              wrap={{ className: $.image_inner }}
              fitWrap
              ar="3x4"
            />
          </Div>
          <Div parallax={-2} className={clsx($.image, $.image_3)}>
            <Image
              data={image3}
              wrap={{ className: $.image_inner }}
              fitWrap
              ar="16x9"
            />
          </Div>
          <Div parallax={1} className={clsx($.image, $.image_4)}>
            <Image
              data={image4}
              wrap={{ className: $.image_inner }}
              fitWrap
              ar="3x4"
            />
          </Div>
          <Div parallax={-1} className={clsx($.image, $.image_5)}>
            <Image
              data={image5}
              wrap={{ className: $.image_inner }}
              fitWrap
              ar="16x9"
            />
          </Div>
        </div>

        <Container className={$.container}>
          <Div className={$.content} anim="fade-in">
            {data.overline && <p className="text-small">{data.overline}</p>}
            <h2 className="text-style-uppercase">{data.title}</h2>
            <div className={$.text}>
              <Parse html={data.text} />
            </div>

            <Button
              data={data.button}
              variant="outline"
              transitionType="slide"
            />
          </Div>
        </Container>
      </div>
    </Section>
  )
}

export default memo(MultiImage)
