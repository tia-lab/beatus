import { executeQuery, graphql } from '@/lib/query'
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'
type Translations = {
  [_key in (typeof routing.locales)[number]]: Record<string, string>
}

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = (await requestLocale) as (typeof routing.locales)[number]

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale
  }

  const query = graphql(/* GraphQL */ `
    query translations {
      setting {
        translations
      }
    }
  `)

  const { setting } = await executeQuery(query)

  const allTranslations = setting?.translations as Translations
  const messages: Record<string, string> = allTranslations[locale] ?? {}

  return {
    locale,
    messages
  }
})
