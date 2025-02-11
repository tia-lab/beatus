import { routing } from '@/i18n/routing'

export interface PageProps {
  params: {
    locale: (typeof routing.locales)[number]
  }
}
