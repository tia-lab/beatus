import { I18N } from '@config'
import { executeQuery, executeQueryWithAutoPagination } from '../query'
import { query } from './query'
executeQuery
const locales = I18N.locales

const redirects = async () => {
  const allRedirects = []

  for (const locale of locales) {
    // Fetch data for each locale
    const data = await executeQueryWithAutoPagination(query, {
      variables: { locale }
    })

    // Transform the fetched data
    const transformedRedirects = data.allRedirects
      .map((redirect: any) => {
        const permanent = redirect.permanent || false // Default to `false` if undefined

        // Prefix the locale to source and destination URLs
        const source =
          redirect.sourceCustomUrl || redirect.sourceUrl
            ? `/${locale}${redirect.sourceCustomUrl || redirect.sourceUrl}`
            : `/${locale}` // Default to the locale root

        let destination
        if (redirect.destinationUrl && redirect.destinationUrl.slug) {
          // Build destination path from `destinationUrl` with locale prefix
          const segments = []
          let current = redirect.destinationUrl
          while (current) {
            segments.unshift(current.slug)
            current = current.parent
          }

          // Check if the model API key is 'blog_post' and add '/blog/' prefix if true
          if (redirect.destinationUrl._modelApiKey === 'blog_post') {
            destination = `/${locale}/blog/${segments.join('/')}`
          } else {
            destination = `/${locale}/${segments.join('/')}`
          }
        } else if (redirect.destinationCustomUrl) {
          // Use custom destination URL if provided, prefixed with locale
          destination = `/${locale}${redirect.destinationCustomUrl}`
        } else {
          destination = `/${locale}` // Default to the locale root if no destination is defined
        }

        return {
          source,
          destination,
          permanent
        }
      })
      .filter(
        (redirect) => redirect.source !== redirect.destination // Exclude redundant redirects
      )

    // Append transformed redirects to the final list
    allRedirects.push(...transformedRedirects)
  }

  return allRedirects
}

export default redirects
