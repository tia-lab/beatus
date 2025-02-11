import { Redirect, SectionBuilder, UpdateLangSwitch } from '@/components/Core'
import { TransitionIn } from '@/components/Layout'
import { routing } from '@/i18n/routing'
import { getMetadata } from '@/lib/next'
import { executeQuery } from '@/lib/query'
import { checkPathMatch, getLocalizedParentSlugs } from '@/lib/slugs'
import { I18N } from '@config'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { query, queryPageParams } from './query'
import { PageProps } from './types'

export async function generateStaticParams() {
  const { allPages } = await executeQuery(queryPageParams)

  // Recursive function to handle nested pages and locales
  return allPages.reduce<{ locale: string; slug: string[] }[]>((acc, page) => {
    const addPaths = (page: (typeof allPages)[0], path: string[] = []) => {
      page._allSlugLocales?.forEach((localeSlug) => {
        const currentPath = [...path, localeSlug.value]
        acc.push({ locale: localeSlug.locale as string, slug: currentPath })

        // If there are children, continue recursively for each locale
        if (page.children && page.children.length > 0) {
          page.children.forEach((child) => addPaths(child, currentPath))
        }
      })
    }

    addPaths(page)
    return acc
  }, [])
}

export const generateMetadata = getMetadata({
  query,
  buildQueryVariables: ({ params }: PageProps) => ({
    slug: params.slug[params.slug.length - 1],
    locale: params.locale,
    fallbackLocale: routing.defaultLocale
  }),
  pickSeoMetaTags: (data) => data.page?._seoMetaTags
})

export default async function Page({ params }: PageProps) {
  const { isEnabled: isDraftModeEnabled } = draftMode()

  const { page } = await executeQuery(query, {
    includeDrafts: isDraftModeEnabled,
    variables: {
      slug: params.slug[params.slug.length - 1],
      locale: params.locale,
      fallbackLocales: I18N.fallbackLocales as any
    }
  })

  if (!page) {
    notFound()
  }

  const localizedPrefixes = getLocalizedParentSlugs(page)

  // Check if the constructed path matches the provided params slug
  if (!checkPathMatch(localizedPrefixes, params.locale, params.slug)) {
    notFound()
  }

  setRequestLocale(params.locale)
  const _t = await getTranslations()

  return (
    <>
      <Redirect data={page?.redirect} />
      <UpdateLangSwitch
        locale={params.locale}
        data={page._allSlugLocales}
        localizedPrefix={localizedPrefixes}
      />
      <SectionBuilder
        sections={page.sectionBuilder.sectionBuilder}
        params={params}
      />
      <TransitionIn />
    </>
  )
}
