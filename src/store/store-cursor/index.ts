import { create } from 'zustand'
import createSelectors from '../utils/createSelectors'

interface State {
  hasMoved: boolean
  hoverDefault: boolean
  hoverTheme: boolean
  hoverCardWork: boolean
  hoverHomeServices: boolean
}
interface Action {
  /* eslint-disable no-unused-vars */
  setHasMoved: (hasMoved: State['hasMoved']) => void
  setHoverDefault: (hoverDefault: State['hoverDefault']) => void
  setHoverTheme: (hoverTheme: State['hoverTheme']) => void
  setHoverCardWork: (hoverCardWork: State['hoverCardWork']) => void
  setHoverHomeServices: (hoverHomeServices: State['hoverHomeServices']) => void
}
/* eslint-enable */

const baseStoreCursor = create<State & Action>((set) => ({
  hasMoved: false,
  hoverDefault: false,
  hoverTheme: false,
  hoverCardWork: false,
  hoverHomeServices: false,
  setHasMoved: (hasMoved) => set(() => ({ hasMoved: hasMoved })),
  setHoverDefault: (hoverDefault) =>
    set(() => ({ hoverDefault: hoverDefault })),
  setHoverTheme: (hoverTheme) => set(() => ({ hoverTheme: hoverTheme })),
  setHoverCardWork: (hoverCardWork) =>
    set(() => ({ hoverCardWork: hoverCardWork })),
  setHoverHomeServices: (hoverHomeServices) =>
    set(() => ({ hoverHomeServices: hoverHomeServices }))
}))

const useStoreCursor = createSelectors(baseStoreCursor)

export default useStoreCursor
