'use client'

import { usePathname } from '@/i18n/routing'
import { useStoreCursor, useStoreRoutes } from '@/store'
import { DEBUG } from '@config'
import { useEffect } from 'react'

const StoreRoutes = () => {
  const pathName = usePathname()

  // Store
  const { setCurrentRoute, setPreviousRoute, currentRoute, previousRoute } =
    useStoreRoutes()

  const { setHoverDefault } = useStoreCursor()

  useEffect(() => {
    // Update previous route before setting the current route
    setPreviousRoute(currentRoute)
    setCurrentRoute(pathName)

    //reset cursor state on page change
    setHoverDefault(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName])

  useEffect(() => {
    if (DEBUG.routes) {
      console.log('currentRoute', currentRoute)
      console.log('previousRoute', previousRoute)
    }
  }, [currentRoute, previousRoute])

  return null
}

export default StoreRoutes
