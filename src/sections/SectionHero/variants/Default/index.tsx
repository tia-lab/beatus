import { Container, Section } from '@/components/Core'
import { Breadcrumb } from '@/components/Project'
import queryBreadcrumbs from '@/components/Project/Breadcrumbs/query'
import { executeQuery } from '@/lib/query'
import { MEDIA } from '@config'
import clsx from 'clsx'
import { readFragment } from 'gql.tada'
import { SectionHeroProps } from '../..'
import HeroMedia from '../../components/HeroMedia'
import HeroTitle from '../../components/HeroTitle'
import SectionHeroFragment from '../../query'
import $ from './style.module.scss'

const VariantDefault = async ({ data, params }: SectionHeroProps) => {
  const d = readFragment(SectionHeroFragment, data)
  const slug = params?.slug ? params.slug[params.slug.length - 1] : ''
  const { page } = await executeQuery(queryBreadcrumbs, {
    variables: { eq: slug, locale: params?.locale }
  })

  return (
    <>
      <Section
        id={d.sectionId || undefined}
        padding={d.sectionPadding}
        className={$.section}
      >
        <Container>
          <div
            className={clsx(
              $.left_col,
              d.variants === 'default' && $.is_default
            )}
          >
            <HeroTitle data={data} variant="default" />
          </div>
          <HeroMedia
            className={$.hero_media}
            data={d.mainMedia}
            ar="3x4"
            sizes={`${MEDIA.tablet} 18rem, 27rem`}
          />
        </Container>
      </Section>

      {d.breadcrumbs && page?.parent?.slug && (
        <Section anim="section-fade-in">
          <Container>
            <Breadcrumb data={page} />
          </Container>
        </Section>
      )}
    </>
  )
}

export default VariantDefault
