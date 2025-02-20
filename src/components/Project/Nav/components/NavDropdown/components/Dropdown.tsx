import { useStoreNavigation } from '@/store'
import clsx from 'clsx'
import { useParams } from 'next/navigation'
import { ReactNode, createContext, useContext, useEffect } from 'react'
import $ from '../style.module.scss'

interface DropdownContextValue {
  openItem: string | null
  toggleItem: (_id: string) => void
  allClosed: boolean // Add allClosed to the context
}

const DropdownContext = createContext<DropdownContextValue | undefined>(
  undefined
)

export const DropdownProvider = ({
  children,
  menuItems
}: {
  children: ReactNode
  menuItems: { id: string; dropdownItems: { url?: { slug?: string } }[] }[]
}) => {
  const params = useParams()
  let currentSlug = params?.slug

  if (Array.isArray(currentSlug)) {
    currentSlug = currentSlug.join('/')
  }

  const openDropdown = useStoreNavigation.use.openDropdown()
  const setOpenDropdown = useStoreNavigation.use.setOpenDropdown()
  const allClosed = useStoreNavigation.use.allDropdonwsClosed() // Get the allClosed state

  useEffect(() => {
    if (!currentSlug || !menuItems.length) return

    console.log('Current Slug:', currentSlug)

    const matchingItem = menuItems.find((parent) =>
      parent.dropdownItems.some((item) => item.url?.slug === currentSlug)
    )

    if (matchingItem) {
      console.log('Auto-opening dropdown:', matchingItem.id)
      setOpenDropdown(matchingItem.id)
    }
  }, [currentSlug, menuItems, setOpenDropdown])

  const toggleItem = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id)
  }

  return (
    <DropdownContext.Provider
      value={{ openItem: openDropdown, toggleItem, allClosed }}
    >
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
  menuItems: { id: string; dropdownItems: { url?: { slug?: string } }[] }[]
}

const NavDropdown = ({ children, className, menuItems }: NavDropdownProps) => {
  return (
    <DropdownProvider menuItems={menuItems}>
      <div className={clsx($.dropdowns, className)} data-lenis-prevent>
        {children}
      </div>
    </DropdownProvider>
  )
}

export default NavDropdown
