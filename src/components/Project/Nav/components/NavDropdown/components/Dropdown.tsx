'use client'

import clsx from 'clsx'
import { ReactNode, createContext, useContext, useState } from 'react'
import $ from '../style.module.scss'

interface DropdownContextValue {
  openItem: string | null
  toggleItem: (_id: string) => void
}

const DropdownContext = createContext<DropdownContextValue | undefined>(
  undefined
)

export const DropdownProvider = ({ children }: { children: ReactNode }) => {
  const [openItem, setOpenItem] = useState<string | null>(null)

  const toggleItem = (id: string) => {
    setOpenItem((prev) => (prev === id ? null : id)) // Toggle open/close
  }

  return (
    <DropdownContext.Provider value={{ openItem, toggleItem }}>
      {children}
    </DropdownContext.Provider>
  )
}

export const useDropdown = () => {
  const context = useContext(DropdownContext)
  if (!context) {
    throw new Error('useDropdown must be used within a DropdownProvider')
  }
  return context
}

interface NavDropdownProps {
  children: ReactNode
  className?: string
}

const NavDropdown = ({ children, className }: NavDropdownProps) => {
  return (
    <DropdownProvider>
      <div className={clsx($.dropdowns, className)} data-lenis-prevent>
        {children}
      </div>
    </DropdownProvider>
  )
}

export default NavDropdown
