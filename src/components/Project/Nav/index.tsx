'use client'

import { LayoutFragment } from '@/app/[locale]/query'
import { Lib } from '@/types'
import NavModal from './NavModal'

export interface NavProps {
  data: Lib.FragmentOf<typeof LayoutFragment> | null
}

const Nav = ({ data }: NavProps) => {
  return <NavModal data={data} />
}

export default Nav
