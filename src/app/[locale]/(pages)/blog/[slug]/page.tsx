import { Redirect, UpdateLangSwitch } from '@/components/Core'
import { routing } from '@/i18n/routing'
import { getMetadata } from '@/lib/next'
import { executeQuery } from '@/lib/query'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { query, queryAllPosts } from './query'
import { PageProps } from './types'

export async function generateStaticParams() {
  const { allBlogPosts } = await executeQuery(queryAllPosts)

  // Map each blog post to its slugs in each locale
  const params = allBlogPosts.flatMap((post) =>
    post?._allSlugLocales?.map((localeSlug) => ({
      slug: localeSlug.value, // Slug in the specific locale
      locale: localeSlug.locale // Locale for the slug
    }))
  )

  return params
}
export const generateMetadata = getMetadata({
  query,
  buildQueryVariables: ({ params }: PageProps) => ({
    slug: params.slug,
    locale: params.locale,
    fallbackLocale: routing.defaultLocale
  }),
  pickSeoMetaTags: (data) => data.blogPost?._seoMetaTags
})

export default async function Page({ params }: PageProps) {
  const { isEnabled: isDraftModeEnabled } = draftMode()

  const { blogPost } = await executeQuery(query, {
    includeDrafts: isDraftModeEnabled,
    variables: {
      slug: params.slug,
      locale: params.locale,
      fallbackLocale: routing.defaultLocale
    }
  })

  if (!blogPost) {
    notFound()
  }

  return (
    <>
      <Redirect data={blogPost?.redirect} />
      <UpdateLangSwitch
        locale={params.locale}
        data={blogPost._allSlugLocales}
        prefix="blog"
      />
      <section>
        <div>{blogPost?.postTitle}</div>
        <div>{blogPost?.excerpt}</div>
        <div>
          {blogPost._allSlugLocales?.map((postLocale) => (
            <div key={postLocale.locale}>{postLocale.value}</div>
          ))}
        </div>
      </section>
    </>
  )
}
