import type { SchemaTypes } from '@datocms/cma-client'

/*
 * Both the "Web Previews" and "SEO/Readability Analysis" plugins from DatoCMS
 * need to know the URL of the site that corresponds to each DatoCMS record to
 * work properly. These two functions are responsible for returning this
 * information, and are utilized by the route handlers associated with the two
 * plugins:
 *
 * - src/app/api/seo-analysis/route.tsx
 * - src/app/api/preview-links/route.tsx
 */

export async function recordToWebsiteRoute(
  item: SchemaTypes.Item,
  itemTypeApiKey: string,
  locale: string
): Promise<string | null> {
  switch (itemTypeApiKey) {
    case 'page': {
      return '/'
    }
    case 'blog_post': {
      return `/${locale}/blog/${await recordToSlug(item, itemTypeApiKey, locale)}`
    }
    default:
      return null
  }
}

export async function recordToSlug(
  item: SchemaTypes.Item,
  itemTypeApiKey: string,
  // eslint-disable-next-line no-unused-vars
  locale: string
): Promise<string | null> {
  switch (itemTypeApiKey) {
    case 'blog_post': {
      return item.attributes.slug as string
    }
    default:
      return null
  }
}
