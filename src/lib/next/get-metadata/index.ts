/* eslint-disable no-unused-vars  */

import { executeQuery } from '@/lib/query'
import type { TadaDocumentNode } from 'gql.tada'
import type { Metadata, ResolvingMetadata } from 'next'
import { draftMode } from 'next/headers'
import {
  type SeoOrFaviconTag,
  type TitleMetaLinkTag,
  toNextMetadata
} from 'react-datocms/seo'

/**
 * Generates a function that fits the Next.js `generateMetadata()` format. This
 * automates the creation of meta tags based on the `_seoMetaTags` present in a
 * DatoCMS GraphQL query.
 */
export default function getMetadata<PageProps, Result, Variables>(
  options: GetMetadataOptions<PageProps, Result, Variables>
) {
  return async function generateMetadata(
    pageProps: PageProps,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    const { isEnabled: isDraftModeEnabled } = draftMode()

    const variables = options.buildQueryVariables
      ? await options.buildQueryVariables(pageProps)
      : ({} as Variables)

    const [parentMetadata, data] = await Promise.all([
      parent,
      executeQuery(options.query, {
        variables,
        includeDrafts: isDraftModeEnabled
      })
    ])

    const tags = options.pickSeoMetaTags(data as Result)

    // Combine metadata from parent routes with those of this route:
    return {
      ...(parentMetadata as Metadata),
      ...toNextMetadata(tags || [])
    }
  }
}

export type BuildQueryVariablesFn<PageProps, Variables> = (
  context: PageProps
) => Promise<Variables> | Variables

export type GetMetadataOptions<PageProps, Result, Variables> = {
  /** The GraphQL query that will be used to generate metadata. */
  query: TadaDocumentNode<Result, Variables>

  /** A function that takes page props and builds and returns the variables
   * required by the GraphQL query. */
  buildQueryVariables?: BuildQueryVariablesFn<PageProps, Variables>

  /** A callback that picks the SEO meta tags from the result of the query. */
  pickSeoMetaTags: (
    data: Result
  ) => TitleMetaLinkTag[] | SeoOrFaviconTag[] | undefined
}
