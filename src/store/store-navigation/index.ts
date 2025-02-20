import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import createSelectors from '../utils/createSelectors'

export interface State {
  navOpen: boolean
  headerHidden: boolean
  headerColor: 'dark' | 'light'
  notificationActive: boolean | null
  bookingModalOpen: boolean
  bookingKey: string
  openDropdown: string | null
  allDropdonwsClosed: boolean
  //tlNav: GSAPTimeline | null
}

/* eslint-disable no-unused-vars */
interface Action {
  setNavOpen: (navOpen: State['navOpen']) => void
  setHeaderHidden: (headerHidden: State['headerHidden']) => void
  setNotificationActive: (
    notificationActive: State['notificationActive']
  ) => void
  setHeaderColor: (headerColor: State['headerColor']) => void
  setBookingModalOpen: (bookingModalOpen: State['bookingModalOpen']) => void
  setBookingKey: (bookingKey: State['bookingKey']) => void
  setOpenDropdown: (id: string | null) => void

  //setTlNav: (tlNav: State['tlNav']) => void
}
/* eslint-enable no-unused-vars */

const _useStoreNavigation = create<State & Action>()(
  persist(
    (set) => ({
      navOpen: false,
      //tlNav: null,
      bookingKey: '0',
      headerHidden: false,
      notificationActive: null,
      headerColor: 'dark',
      bookingModalOpen: false,
      openDropdown: null,
      allDropdonwsClosed: true,
      setBookingKey: (bookingKey) => set({ bookingKey }),
      setNavOpen: (navOpen) => set({ navOpen }),
      setNotificationActive: (notificationActive) =>
        set({ notificationActive }),
      setHeaderHidden: (headerHidden) => set({ headerHidden }),
      setHeaderColor: (headerColor) => set({ headerColor }),
      setBookingModalOpen: (bookingModalOpen) => set({ bookingModalOpen }),
      setOpenDropdown: (id) =>
        set({ openDropdown: id, allDropdonwsClosed: id === null })
      //setTlNav: (tlNav) => set({ tlNav })
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

const useStoreNavigation = createSelectors(_useStoreNavigation)

export default useStoreNavigation
