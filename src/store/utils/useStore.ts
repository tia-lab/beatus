import { useEffect, useState } from 'react'
import { StoreApi } from 'zustand'

function useStoreSelector<T, F>(
  store: StoreApi<T>,
  selector: (_state: T) => F
): F | undefined {
  const [data, setData] = useState<F>(selector(store.getState()))

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const newData = selector(store.getState())
      setData(newData)
    })

    return () => unsubscribe()
  }, [store, selector])

  return data
}

export default useStoreSelector
