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
    const { allRooms } = await executeQuery(queryPageParams)

    // Ensure that `_allSlugLocales` exists and is an array
    if (!allRooms || !Array.isArray(allRooms)) {
      console.error('Invalid response from executeQuery:', allRooms)
      return []
    }

    // Generate static params
    return allRooms.flatMap((room) =>
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
  pickSeoMetaTags: (data) => data.room?._seoMetaTags
})

export default async function Page({ params }: PageProps) {
  const { isEnabled: isDraftModeEnabled } = draftMode()

  const { room } = await executeQuery(query, {
    includeDrafts: isDraftModeEnabled,
    variables: {
      slug: params.slug,
      locale: params.locale,
      fallbackLocales: I18N.fallbackLocales as any
    }
  })

  if (!room) {
    notFound()
  }

  const localizedPrefixes = getLocalizedParentSlugs(room)

  setRequestLocale(params.locale)

  return (
    <>
      <Redirect data={room?.redirect} />
      <UpdateLangSwitch
        locale={params.locale}
        data={room._allSlugLocales}
        localizedPrefix={localizedPrefixes}
      />
      <SectionHero data={room} variant="detail" />
      <DetailGallery data={room} />
      <DetailContent data={room} />
      <SectionBuilderDetail
        //@ts-expect-error
        sections={room.sectionBuilder?.sectionBuilder}
        params={params}
      />
      <BookingBar active={room.bookingBar} />
      <TransitionIn />
    </>
  )
}
