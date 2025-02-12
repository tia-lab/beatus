'use client'

import { BaseLink } from '@/components/Core'
import { BaseLinkProps } from '@/components/Core/types'
import { LinkFragment } from '@/lib/fragments'
import { getLinkTitle, getLinkUrl } from '@/lib/slugs'
import { Lib } from '@/types'
import { Icon } from '@iconify-icon/react'
import clsx from 'clsx'
import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import { Button as AriaButton } from 'react-aria-components'
import $ from './style.module.scss'

export interface ButtonProps extends BaseLinkProps {
  children?: React.ReactNode
  variant?: 'fill' | 'outline' | 'ghost' | 'text'
  size?: 'base' | 'small'
  disabled?: boolean
  icon?: string
  iconPosition?: 'left' | 'right'
  iconAnimation?: 'rotate' | 'move-left' | 'move-right'
  activeState?: boolean
  ariaWrapper?: boolean
  preventSameUrlClass?: string
  data?: Lib.FragmentOf<typeof LinkFragment> | null
}

export const buttonVariants = ['fill', 'outline', 'ghost', 'text']

const Button = forwardRef<HTMLAnchorElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = 'fill',
      size = 'base',
      icon,
      iconPosition = 'right',
      iconAnimation = 'move-right',
      activeState,
      ariaWrapper,
      data,
      preventSameUrlClass,
      ...props
    },
    ref
  ) => {
    // Refs
    const comp = useRef<any>(null)
    //states
    const [sameUrl, setSameUrl] = useState(false)

    // API
    useImperativeHandle(ref, () => comp.current as HTMLAnchorElement)

    // Data
    const url = getLinkUrl({ data })
    const title = getLinkTitle({ data })

    // Hooks
    const pathname = usePathname()
    const locale = useLocale()
    useEffect(() => {
      if (!preventSameUrlClass || !url || !pathname) return

      // Construct full URL once for comparison
      const fullUrl = `/${locale}${url}`
      setSameUrl(pathname === fullUrl)
    }, [pathname, url, locale, preventSameUrlClass])

    // Classes
    const classNames = clsx(
      $.button,
      {
        [$.variant_fill]: variant === 'fill',
        [$.variant_outline]: variant === 'outline',
        [$.variant_ghost]: variant === 'ghost',
        [$.variant_text]: variant === 'text',
        [$.size_base]: size === 'base',
        [$.size_small]: size === 'small',
        [$.disabled]: props.disabled,
        [$.icon_animation_rotate]: iconAnimation === 'rotate',
        [$.icon_animation_move_left]: iconAnimation === 'move-left',
        [$.icon_animation_move_right]: iconAnimation === 'move-right',
        [$.active]: activeState
      },
      className,
      sameUrl && preventSameUrlClass
    )
    const iconClasses = clsx($.icon, {
      [$.left]: iconPosition === 'left',
      [$.right]: iconPosition === 'right'
    })

    const getHref = () => {
      if (data?.isExternal) return data?.externalUrl
      else if (url) return url
      else return props.href
    }

    const Component = () => (
      <BaseLink
        ref={comp}
        {...props}
        className={classNames}
        isNext={data?.isExternal || props.isNext}
        target={
          data?.targetBlank ? '_blank' : props.target ? props.target : undefined
        }
        href={getHref() || undefined}
      >
        {icon && (
          <Icon
            width="100%"
            height="100%"
            icon={icon}
            className={iconClasses}
          />
        )}
        {
          (data?.titleText && title
            ? title
            : data?.text || children) as React.ReactNode
        }
        {variant === 'text' && <aside className={$.line} />}
      </BaseLink>
    )

    return ariaWrapper ? (
      <AriaButton>
        <Component />
      </AriaButton>
    ) : (
      <Component />
    )
  }
)

Button.displayName = 'Button'

export default memo(Button)
