'use client'

import { useStoreCursor, useStoreNavigation } from '@/store'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { HTMLAttributes } from 'react'

interface OpenNavProps extends HTMLAttributes<HTMLDivElement> {}

const OpenNav = ({ className, ...props }: OpenNavProps) => {
  //Stores
  const { setHoverDefault } = useStoreCursor()
  const { navOpen, setNavOpen } = useStoreNavigation()

  //Translations
  const t = useTranslations()
  return (
    <div
      className={clsx('text-style-uppercase', 'font-weight-700', className)}
      onMouseEnter={() => setHoverDefault(true)}
      onMouseLeave={() => setHoverDefault(false)}
      onClick={() => !navOpen && setNavOpen(true)}
      {...props}
    >
      {t('menu')}
    </div>
  )
}

export default OpenNav
