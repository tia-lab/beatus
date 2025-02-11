import { Container, Section } from '@/components/Core'
import { MEDIA } from '@config'
import clsx from 'clsx'
import { readFragment } from 'gql.tada'
import { SectionHeroProps } from '../..'
import HeroMedia from '../../components/HeroMedia'
import HeroTitle from '../../components/HeroTitle'
import SectionHeroFragment from '../../query'
import $ from './style.module.scss'

const VariantHome = ({ data }: SectionHeroProps) => {
  const d = readFragment(SectionHeroFragment, data)

  return (
    <Section
      id={d.sectionId || undefined}
      padding={d.sectionPadding}
      className={$.section}
    >
      <Container>
        <div className={$.left_col}>
          <HeroTitle data={data} variant="home" />
          <div className={$.left_col_bottom}>
            <HeroMedia
              sizes={`${MEDIA.tablet} 18rem, 21rem`}
              className={$.hero_small_media}
              data={d.smallMedia as any}
              ar="4x3"
            />
            <p className={clsx('text-large', $.text)}>{d.text}</p>
          </div>
        </div>
        <HeroMedia
          className={$.hero_media}
          data={d.mainMedia}
          ar="3x4"
          sizes={`${MEDIA.tablet} 18rem, 29rem`}
        />
      </Container>
    </Section>
  )
}

export default VariantHome
