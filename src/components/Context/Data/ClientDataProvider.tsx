'use client'

import { useStoreData } from '@/store'
import { UseStoreDataState } from '@/store/store-data'
import { ReactNode, createContext, useContext, useEffect } from 'react'

// Define the type for the context value
interface DataContextType extends UseStoreDataState {}

// Create the context with a default value (null for now)
const DataContext = createContext<DataContextType | null>(null)

// Define props for ClientDataProvider
interface ClientDataProviderProps {
  initialData: DataContextType
  children: ReactNode
}

export function ClientDataProvider({
  initialData,
  children
}: ClientDataProviderProps) {
  const setData = useStoreData.use.setData()

  useEffect(() => {
    setData(initialData.data) // ✅ Pass only `data` (Fix Type Error)
  }, [initialData, setData])

  return (
    <DataContext.Provider value={initialData}>{children}</DataContext.Provider>
  )
}

// Hook to use DataContext
export function useData() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a ClientDataProvider')
  }
  return context
}
