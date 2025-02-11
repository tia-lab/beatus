import { routing } from '@/i18n/routing'

export interface PageProps {
  params: {
    slug: string
    locale: (typeof routing.locales)[number]
  }
}
