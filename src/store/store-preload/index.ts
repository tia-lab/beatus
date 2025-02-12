import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import createSelectors from '../utils/createSelectors'

export interface StorePreloadState {
  isPreloaded: boolean
  startAnimations: boolean
}

/* eslint-disable no-unused-vars */
export interface StorePreloadAction {
  setIsPreloaded: (isPreloaded: StorePreloadState['isPreloaded']) => void
  setStartAnimations: (
    startAnimations: StorePreloadState['startAnimations']
  ) => void
}
/* eslint-enable no-unused-vars */

// Create the Zustand store with a hook
const _useStorePreload = create<StorePreloadState & StorePreloadAction>()(
  persist(
    (set) => ({
      isPreloaded: false,
      startAnimations: false,
      setIsPreloaded: (isPreloaded) => set({ isPreloaded }),
      setStartAnimations: (startAnimations) => set({ startAnimations })
    }),
    {
      name: 'preload',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        isPreloaded: state.isPreloaded,
        startAnimations: state.startAnimations
      })
    }
  )
)

const useStorePreload = createSelectors(_useStorePreload)

export default useStorePreload
