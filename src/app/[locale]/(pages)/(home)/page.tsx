import { Redirect, UpdateLangSwitch } from '@/components/Core'
import SectionBuilder from '@/components/Core/SectionBuilder'
import { TransitionIn } from '@/components/Layout'
import { getMetadata } from '@/lib/next'
import { executeQuery } from '@/lib/query'
import { I18N } from '@config'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import query from './query'
import { PageProps } from './types'

export const generateMetadata = getMetadata({
  query,
  // A callback that picks the SEO meta tags from the result of the query
  pickSeoMetaTags: (data) => data.home?._seoMetaTags
})

export default async function Page({ params }: PageProps) {
  const { isEnabled: isDraftModeEnabled } = draftMode()

  const { home } = await executeQuery(query, {
    includeDrafts: isDraftModeEnabled,
    variables: {
      locale: params.locale,
      fallbackLocales: I18N.fallbackLocales as any
    }
  })

  setRequestLocale(params.locale)
  const _t = await getTranslations()

  if (!home) {
    notFound()
  }

  return (
    <>
      <Redirect data={home?.redirect} />
      <UpdateLangSwitch locale={params.locale} isHome />
      <SectionBuilder sections={home.sectionBuilder.sectionBuilder} />
      <TransitionIn />
    </>
  )
}
