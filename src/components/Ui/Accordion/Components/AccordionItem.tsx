'use client'

import { DUR } from '@/animations/vars'
import Title, { TitleTags } from '@/components/Core/Title'
import { useStoreCursor } from '@/store'
import { ScrollTrigger, gsap } from '@gsap'
import { Icon } from '@iconify-icon/react'
import { useLenis } from '@studio-freight/react-lenis'
import clsx from 'clsx'
import React, {
  KeyboardEvent,
  ReactNode,
  memo,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import $ from '../style.module.scss'
import { AccordionContext } from './Accordion'
export interface AccordionItemProps {
  variant?: 'default' | 'faq'
  index: number
  title: ReactNode | string
  children: ReactNode
  titleTag?: TitleTags
  titleClassName?: string
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  index,
  title,
  titleTag = 'h5',
  titleClassName,
  children,
  variant = 'default'
}) => {
  // Refs
  const contentRef = useRef<HTMLDivElement>(null)
  const comp = useRef<HTMLDivElement>(null)
  //Context
  const context = useContext(AccordionContext)

  if (!context) {
    throw new Error('AccordionItem must be used within an Accordion')
  }

  const { openIndexes, toggleItem, lenisScroll, lenisScrollOptions } = context

  //states
  const isOpen = openIndexes.includes(index)
  const [height, setHeight] = useState<string>('0px')
  const [isHover, setIsHover] = useState(false)

  //stores
  const { setHoverDefault } = useStoreCursor()

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
  }, [])

  //Hooks
  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        setHeight(`${contentRef.current.scrollHeight}px`)
      } else {
        setHeight('0px')
      }
    }

    ScrollTrigger.refresh()
  }, [isOpen])

  const lenis = useLenis()

  useEffect(() => {
    if (lenisScroll && lenis && isOpen) {
      lenis.scrollTo(comp.current as HTMLDivElement, {
        duration: DUR.goldenRatio * 2,
        ...lenisScrollOptions
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lenisScroll, lenis, isOpen])

  useEffect(() => {
    isHover ? setHoverDefault(true) : setHoverDefault(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHover])

  //handlers
  const handleToggle = () => {
    toggleItem(index)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape' || event.key === ' ') {
      event.preventDefault()
      handleToggle()
    }
  }

  const handleHover = () => {
    setIsHover(true)
  }

  const handleHoverEnd = () => {
    setIsHover(false)
  }

  const accordionClass = clsx($.accordion_item, {
    [$.expanded]: isOpen,
    [$.variant_faq]: variant === 'faq',
    [$.variant_default]: variant === 'default'
  })

  return (
    <div className={accordionClass} data-expanded={isOpen} ref={comp}>
      <div
        className={$.head}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-controls={`accordion-body-${index}`}
        id={`accordion-header-${index}`}
        onMouseEnter={handleHover}
        onMouseLeave={handleHoverEnd}
      >
        <div className={$.icon} data-expanded={isOpen}>
          {variant === 'default' && (
            <Icon icon="lucide:chevron-down" width="100%" />
          )}
          {variant === 'faq' && (
            <>
              <div className={$.plus} />
              <div className={clsx($.plus, $.is_2)} />
            </>
          )}
        </div>
        {typeof title === 'string' ? (
          <Title
            as={variant === 'faq' ? 'h2' : titleTag}
            className={titleClassName}
          >
            {title}
          </Title>
        ) : (
          title
        )}
      </div>
      <div
        data-expanded={isOpen}
        className={$.body}
        ref={contentRef}
        id={`accordion-body-${index}`}
        role="region"
        aria-labelledby={`accordion-header-${index}`}
        style={{
          maxHeight: height
        }}
      >
        <div className={$.body_inner}>{children}</div>
      </div>
    </div>
  )
}

export default memo(AccordionItem)
