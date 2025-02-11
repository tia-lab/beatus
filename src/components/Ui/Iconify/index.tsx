'use client'

import { Icon, IconifyIconProperties } from '@iconify-icon/react'
import { memo } from 'react'
import { LucideIconName } from './types/lucide'
import { RadixIconName } from './types/radix'

export type IconFamilyName = 'lucide' | 'radix'

type FamilyToIconMap = {
  lucide: LucideIconName
  radix: RadixIconName
}

export type IconName<F extends IconFamilyName> = F extends keyof FamilyToIconMap
  ? FamilyToIconMap[F]
  : never

// Component props: family defines the icon options
interface IconifyProps<F extends IconFamilyName> extends IconifyIconProperties {
  family: F
  icon: IconName<F> // Dynamically restrict icons based on family
}

const Iconify = <F extends IconFamilyName>({
  family,
  icon,
  ...props
}: IconifyProps<F>) => {
  // You could use family to determine the icon prefix or just pass icon directly
  return <Icon icon={`${family || 'lucide'}:${icon}`} {...props} />
}

export default memo(Iconify)
