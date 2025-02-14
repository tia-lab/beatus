import { create } from 'zustand'
import createSelectors from '../utils/createSelectors'

export type cursorTypes = 'none' | 'default' | 'card-package'

interface State {
  type: cursorTypes
  hasMoved: boolean
  hoverDefault: boolean
  hoverCardPackage: boolean
}
interface Action {
  /* eslint-disable no-unused-vars */
  setType: (type: State['type']) => void
  setHasMoved: (hasMoved: State['hasMoved']) => void
  setHoverDefault: (hoverDefault: State['hoverDefault']) => void
  setHoverCardPackage: (hoverCardPackage: State['hoverCardPackage']) => void
}
/* eslint-enable */

const baseStoreCursor = create<State & Action>((set) => ({
  type: 'default',
  hasMoved: false,
  hoverDefault: false,
  hoverCardPackage: false,
  setType: (type) => set(() => ({ type: type })),
  setHasMoved: (hasMoved) => set(() => ({ hasMoved: hasMoved })),
  setHoverDefault: (hoverDefault) =>
    set(() => ({ hoverDefault: hoverDefault })),
  setHoverCardPackage: (hoverCardPackage) =>
    set(() => ({ hoverCardPackage: hoverCardPackage }))
}))

const useStoreCursor = createSelectors(baseStoreCursor)

export default useStoreCursor
