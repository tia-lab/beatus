import { I18N } from '@config'
import { create } from 'zustand'

type Locale = (typeof I18N.locales)[number]

interface State {
  locale: Locale
  currentSlug: string
  langSwitchSlugs: { locale: Locale; slug: string }[]
}

/* eslint-disable no-unused-vars */
interface Action {
  setLocale: (locale: State['locale']) => void
  setCurrentSlug: (slug: State['currentSlug']) => void
  setLangSwitchSlugs: (slugs: State['langSwitchSlugs']) => void
  switchLocale: (
    newLocale: State['locale'],
    newSlug: string,
    newSlugs: State['langSwitchSlugs']
  ) => void
}
/* eslint-enable no-unused-vars */

// Create the Zustand store with a hook
const useStoreI18 = create<State & Action>((set) => ({
  locale: I18N.defaultLocale as Locale,
  currentSlug: '/',
  langSwitchSlugs: [{ locale: I18N.defaultLocale as Locale, slug: '/' }],
  setLocale: (locale) => set({ locale }),
  setCurrentSlug: (slug) => set({ currentSlug: slug }),
  setLangSwitchSlugs: (slugs) => set({ langSwitchSlugs: slugs }),
  switchLocale: (newLocale, newSlug, newSlugs) =>
    set({ locale: newLocale, currentSlug: newSlug, langSwitchSlugs: newSlugs })
}))

export default useStoreI18
