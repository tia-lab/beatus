'use client'

import { BaseLink } from '@/components/Core'
import { BaseLinkProps } from '@/components/Core/types'
import { Icon } from '@iconify-icon/react'
import clsx from 'clsx'
import { forwardRef, memo, useImperativeHandle, useRef, useState } from 'react'
import { useHover } from 'usehooks-ts'
import $ from './style.module.scss'
export interface ChipProps extends BaseLinkProps {
  children: React.ReactNode
  variant?: 'fill' | 'outline' | 'ghost'
  size?: 'base' | 'small'
  disabled?: boolean
  icon?: string
  iconPosition?: 'left' | 'right'
  iconAnimation?: 'rotate' | 'move-left' | 'move-right'
  hoverState?: boolean
  activeState?: boolean
}

export const chipVariants = ['fill', 'outline', 'ghost']

const Chip = forwardRef<HTMLAnchorElement, ChipProps>(
  (
    {
      className,
      children,
      variant = 'fill',
      size = 'base',
      icon,
      iconPosition = 'right',
      iconAnimation = 'move-right',
      hoverState,
      activeState,
      ...props
    },
    ref
  ) => {
    //Refs
    const comp = useRef<any>(null)

    //states
    const [isDisabled, _setIsDisabled] = useState(false)

    //Api
    useImperativeHandle(ref, () => comp.current as HTMLAnchorElement)

    //Hooks
    const _isHover = useHover(comp)

    //Classes
    const classNames = clsx(
      $.button,
      {
        [$.variant_fill]: variant === 'fill',
        [$.variant_outline]: variant === 'outline',
        [$.variant_ghost]: variant === 'ghost',
        [$.size_base]: size === 'base',
        [$.size_small]: size === 'small',
        [$.disabled]: isDisabled || props.disabled,
        [$.icon_animation_rotate]: iconAnimation === 'rotate',
        [$.icon_animation_move_left]: iconAnimation === 'move-left',
        [$.icon_animation_move_right]: iconAnimation === 'move-right',
        [$.hover]: hoverState && _isHover,
        [$.active]: activeState
      },
      className
    )
    const iconClasses = clsx($.icon, {
      [$.left]: iconPosition === 'left',
      [$.right]: iconPosition === 'right'
    })

    return (
      <BaseLink ref={comp} {...props} className={classNames}>
        {icon && (
          <Icon
            width="100%"
            height="100%"
            icon={icon}
            className={iconClasses}
          />
        )}
        {children}
      </BaseLink>
    )
  }
)

Chip.displayName = 'Chip'

export default memo(Chip)
