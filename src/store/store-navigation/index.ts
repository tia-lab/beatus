import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface State {
  navOpen: boolean
  headerHidden: boolean
  notificationActive: boolean | null
}

/* eslint-disable no-unused-vars */
interface Action {
  setNavOpen: (navOpen: State['navOpen']) => void
  setHeaderHidden: (headerHidden: State['headerHidden']) => void
  setNotificationActive: (
    notificationActive: State['notificationActive']
  ) => void
}
/* eslint-enable no-unused-vars */

const useStoreNavigation = create<State & Action>()(
  persist(
    (set) => ({
      navOpen: false,
      headerHidden: false,
      notificationActive: null,
      setNavOpen: (navOpen) => set({ navOpen }),
      setNotificationActive: (notificationActive) =>
        set({ notificationActive }),
      setHeaderHidden: (headerHidden) => set({ headerHidden })
    }),
    {
      name: 'navigation',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        notificationActive: state.notificationActive
      })
    }
  )
)

export default useStoreNavigation
