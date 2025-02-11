'use client'

import { useStoreI18 } from '@/store'
import { I18N } from '@config'
import { useTranslations } from 'next-intl'
import { memo, useEffect } from 'react'
import $ from './style.module.scss'
const LangSwitch = () => {
  const { locale, langSwitchSlugs } = useStoreI18()
  const t = useTranslations()

  useEffect(() => {
    console
  }, [langSwitchSlugs])

  return (
    <div className={$.switch}>
      <p className="text-large text-neutral-400 font-weight-700">language</p>
      <p className="text-large text-primary-300 text-style-uppercase font-weight-700">
        {locale}
      </p>
      <div>
        {langSwitchSlugs.length
          ? langSwitchSlugs.map((item, i) => (
              <a key={i} href={item.slug}>
                <p className="text-large text-style-uppercase font-weight-700">
                  {item.locale}
                </p>
              </a>
            ))
          : I18N.locales
              .filter((item) => item !== locale)
              .map((item, i) => (
                <a key={i} href={`/${item}`}>
                  <p className="text-large text-style-uppercase font-weight-700">
                    {item}
                  </p>
                </a>
              ))}
      </div>
    </div>
  )
}

export default memo(LangSwitch)
