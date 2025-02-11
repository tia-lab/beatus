import { colorsVars } from '@/styles/config/colors'
import { LenisOptions } from '@studio-freight/lenis'

const config = {
  debug: {
    sectionBuilder: false,
    routes: false,
    lenis: false,
    cursor: false
  },
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9852',
  forms: {
    projectId:
      process.env.NEXT_PUBLIC_FORMSPREE_PROJECT_ID || 'your-project-id',
    deployKey: process.env.NEXT_PUBLIC_FORMSPREE_DEPLOY_KEY || 'key'
  },
  use: {
    lenis: true,
    cursor: false,
    privacy: true
  },
  breakpoints: {
    mobile: 640,
    tablet: 1024
  },
  media: {
    desktop: '(min-width: 1024px)',
    tablet: '(max-width: 1023px)',
    mobile: '(max-width: 640px)',
    preferSchemaDark: '(prefers-color-scheme: dark)'
  },
  i18n: {
    locales: ['de', 'en'] as const,
    defaultLocale: 'de',
    fallbackLocales: ['de'] as const
  },

  animations: {
    lenis: {
      lerp: 0.25
    } as LenisOptions
  },
  colors: colorsVars
}

export const CONFIG = config
export const DEBUG = config.debug
export const MEDIA = config.media
export const USE = config.use
export const I18N = config.i18n
export const COLORS = config.colors
export const URL = config.url
export const FORMS = config.forms
export type Locale = (typeof I18N.locales)[number]
