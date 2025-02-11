import { Locale } from '@config'

const getSlugFromUrl = (
  locales: readonly Locale[],
  url?: string
): string | undefined => {
  if (!url) return undefined
  try {
    const parsedUrl = new URL(url)
    const pathSegments = parsedUrl.pathname.split('/').filter(Boolean)

    // Check if the first segment is a locale
    const isLocale = locales.includes(pathSegments[0] as Locale)
    if (isLocale && pathSegments.length > 1) {
      return pathSegments[pathSegments.length - 1] // Return the last segment as the slug
    }

    return undefined // No valid slug found
  } catch (error) {
    console.error('Invalid URL:', error)
    return undefined
  }
}

export default getSlugFromUrl
