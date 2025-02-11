import { TransitionTypes } from '@/components/Layout/types'
import { create } from 'zustand'

export interface State {
  isTransitionIn: boolean
  isTransitionOut: boolean
  transitionType?: TransitionTypes
  isTransitioning: boolean
}

/* eslint-disable no-unused-vars */
export interface Action {
  setIsTransitioning: (isTransitioning: boolean) => void
  setIsTransitionIn: (isTransitionIn: boolean) => void
  setIsTransitionOut: (isTransitionOut: boolean) => void
  setTransitionType: (transitionType: TransitionTypes) => void
  resetTransition: () => void
}
/* eslint-enable no-unused-vars */

// Create the Zustand store with a hook
const useStoreTransition = create<State & Action>((set) => ({
  isTransitionIn: false,
  isTransitionOut: false,
  transitionType: undefined,
  isTransitioning: false,
  setIsTransitionIn: (isTransitionIn) => set({ isTransitionIn }),
  setIsTransitionOut: (isTransitionOut) => set({ isTransitionOut }),
  setTransitionType: (transitionType) => set({ transitionType }),
  setIsTransitioning: (isTransitioning) => set({ isTransitioning }),
  resetTransition: () =>
    set({
      isTransitioning: false,
      isTransitionIn: false,
      isTransitionOut: false,
      transitionType: undefined
    })
}))

export default useStoreTransition
