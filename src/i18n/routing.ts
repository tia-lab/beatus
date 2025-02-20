import { I18N, Locale } from '@config'
import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: I18N.locales,

  // Used when no locale matches
  defaultLocale: I18N.defaultLocale as Locale,

  //Pathnames
  pathnames: {
    '/room/[slug]': {
      en: '/room/[slug]',
      de: '/zimmer/[slug]'
    },
    '/retreat/[slug]': {
      en: '/retreat/[slug]',
      de: '/retreat/[slug]'
    }
  }
})

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing)
