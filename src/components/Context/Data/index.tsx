// context/ServerDataProvider.tsx
import { executeQuery } from '@/lib/query'
import { querySeason } from '@/lib/query/queries'
import { Dato } from '@/types'
import { ClientDataProvider } from './ClientDataProvider'

interface ServerDataProviderProps {
  children: React.ReactNode
}

const DataContextProvider = async ({ children }: ServerDataProviderProps) => {
  const _season = await executeQuery(querySeason)
  const season = (_season?.setting?.season || 'sommer') as Dato.Season

  const initialData = {
    data: {
      season
    }
  }

  return (
    <ClientDataProvider initialData={initialData}>
      {children}
    </ClientDataProvider>
  )
}

export default DataContextProvider
