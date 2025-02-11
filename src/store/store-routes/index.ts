import { create } from 'zustand'
import createSelectors from '../utils/createSelectors'

interface State {
  currentRoute: string
  previousRoute: string
}

interface Action {
  setCurrentRoute: (_currentRoute: State['currentRoute']) => void
  setPreviousRoute: (_previousRoute: State['previousRoute']) => void
}

const baseStoreRoutes = create<State & Action>((set) => ({
  currentRoute: '',
  previousRoute: '',
  setCurrentRoute: (currentRoute) =>
    set((state) => ({ ...state, currentRoute })),
  setPreviousRoute: (previousRoute) =>
    set((state) => ({ ...state, previousRoute }))
}))

const useStoreRoutes = createSelectors(baseStoreRoutes)

export default useStoreRoutes
