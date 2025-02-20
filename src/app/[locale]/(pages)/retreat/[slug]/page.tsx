import {
  Redirect,
  SectionBuilderDetail,
  UpdateLangSwitch
} from '@/components/Core'
import { TransitionIn } from '@/components/Layout'
import { BookingBar, DetailContent, DetailGallery } from '@/components/Project'
import { routing } from '@/i18n/routing'
import { getMetadata } from '@/lib/next'
import { executeQuery } from '@/lib/query'
import { getLocalizedParentSlugs } from '@/lib/slugs'
import { SectionHero } from '@/sections'
import { I18N } from '@config'
import { setRequestLocale } from 'next-intl/server'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { query, queryPageParams } from './query'
import { PageProps } from './types'

export async function generateStaticParams() {
  try {
    // Fetch the data from the API
    const { allRetreats } = await executeQuery(queryPageParams)

    // Ensure that `_allSlugLocales` exists and is an array
    if (!allRetreats || !Array.isArray(allRetreats)) {
      console.error('Invalid response from executeQuery:', allRetreats)
      return []
    }

    // Generate static params
    return allRetreats.flatMap((room) =>
      room?._allSlugLocales?.map(({ value, locale }) => ({
        slug: value,
        locale
      }))
    )
  } catch (error) {
    console.error('Error fetching static params:', error)
    return []
  }
}

export const generateMetadata = getMetadata({
  query,
  buildQueryVariables: ({ params }: PageProps) => ({
    slug: params.slug,
    locale: params.locale,
    fallbackLocale: routing.defaultLocale
  }),
  pickSeoMetaTags: (data) => data.retreat?._seoMetaTags
})

export default async function Page({ params }: PageProps) {
  const { isEnabled: isDraftModeEnabled } = draftMode()

  const { retreat } = await executeQuery(query, {
    includeDrafts: isDraftModeEnabled,
    variables: {
      slug: params.slug,
      locale: params.locale,
      fallbackLocales: I18N.fallbackLocales as any
    }
  })

  if (!retreat) {
    notFound()
  }

  const localizedPrefixes = getLocalizedParentSlugs(retreat)

  setRequestLocale(params.locale)

  return (
    <>
      <Redirect data={retreat?.redirect} />
      <UpdateLangSwitch
        locale={params.locale}
        data={retreat._allSlugLocales}
        localizedPrefix={localizedPrefixes}
      />
      <SectionHero data={retreat} variant="detail" />
      <DetailGallery data={retreat} />
      <DetailContent data={retreat} />
      <SectionBuilderDetail
        sections={retreat.sectionBuilder?.sectionBuilder}
        params={params}
      />
      <BookingBar active={retreat.bookingBar} />
      <TransitionIn />
    </>
  )
}
