import { Dato } from '@/types'
import { create } from 'zustand'
import createSelectors from '../utils/createSelectors' // Ensure this exists

export interface UseStoreDataState {
  data: {
    season: Dato.Season
  }
}

/* eslint-disable no-unused-vars */
interface Actions {
  setSeason: (season: UseStoreDataState['data']['season']) => void
  setData: (newData: Partial<UseStoreDataState['data']>) => void
  resyncData: (newData: UseStoreDataState['data']) => void // Completely replace `data`
}
/* eslint-enable no-unused-vars */

const _useStoreData = create<UseStoreDataState & Actions>((set) => ({
  data: {
    season: 'sommer' // Default value
  },

  setSeason: (season) =>
    set((state) => ({
      data: { ...state.data, season }
    })),

  setData: (newData) =>
    set((state) => ({
      data: { ...state.data, ...newData } // Merge new data while keeping season
    })),

  resyncData: (newData) =>
    set({
      data: newData // Fully replace the data object (useful for re-fetching)
    })
}))

const useStoreData = createSelectors(_useStoreData)

export default useStoreData
