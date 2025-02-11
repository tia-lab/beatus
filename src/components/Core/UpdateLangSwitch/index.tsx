'use client'

import { useStoreI18 } from '@/store'
import { I18N, Locale } from '@config'
import { useEffect } from 'react'

interface UpdateLangSwitchProps {
  isHome?: boolean
  prefix?: string // Universal prefix
  localizedPrefix?: { [_key in Locale]?: string } // Object with prefixes for each locale
  locale: Locale
  data?: { locale: Locale | null; value: string | null }[] | null
}

const UpdateLangSwitch = ({
  data,
  prefix,
  localizedPrefix,
  locale,
  isHome
}: UpdateLangSwitchProps) => {
  const { setLocale, setCurrentSlug, setLangSwitchSlugs } = useStoreI18()

  // Helper function to safely concatenate URL parts and avoid double slashes
  const buildUrl = (
    locale: Locale,
    prefix: string | undefined,
    value: string | null
  ) => {
    const cleanPrefix = prefix ? prefix.replace(/^\/|\/$/g, '') : '' // Remove leading/trailing slashes
    const cleanValue = value ? value.replace(/^\/|\/$/g, '') : '' // Remove leading/trailing slashes
    return `/${locale}${cleanPrefix ? `/${cleanPrefix}` : ''}/${cleanValue}`
  }

  // Find the current locale's slug, or fallback to the default locale's slug if missing
  const currentData = data?.find((item) => item.locale === locale)
  const defaultData = data?.find((item) => item.locale === I18N.defaultLocale)
  const selectedData = currentData?.value ? currentData : defaultData

  // Generate the URL for the selected data or fallback to home if neither are available
  const url = isHome
    ? `/${locale}`
    : selectedData?.value
      ? buildUrl(
          locale,
          localizedPrefix?.[locale] || prefix,
          selectedData.value
        )
      : `/${I18N.defaultLocale}`

  useEffect(() => {
    if (url) {
      setCurrentSlug(url)
    }
    setLocale(locale)

    // Populate langSwitchSlugs with localized slugs from `data`
    if (data) {
      const slugs = data
        .filter((item) => item.locale && item.value && item.locale !== locale)
        .map((item) => ({
          locale: item.locale as Locale,
          slug: buildUrl(
            item.locale as Locale,
            localizedPrefix?.[item.locale as Locale] || prefix,
            item.value
          )
        }))
      setLangSwitchSlugs(slugs)
    } else if (isHome) {
      setLangSwitchSlugs(
        I18N.locales
          .filter((item) => item !== locale)
          .map((item) => ({
            locale: item,
            slug: `/${item}`
          }))
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    url,
    locale,
    data,
    prefix,
    localizedPrefix,
    setLocale,
    setCurrentSlug,
    setLangSwitchSlugs
  ])

  return null
}

export default UpdateLangSwitch
