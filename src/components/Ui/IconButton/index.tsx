'use client'

import { BaseLink } from '@/components/Core'
import { BaseLinkProps } from '@/components/Core/types'
import { Icon } from '@iconify-icon/react'
import clsx from 'clsx'
import { forwardRef, memo, useImperativeHandle, useRef, useState } from 'react'
import { Button } from 'react-aria-components'
import { useHover } from 'usehooks-ts'
import $ from './style.module.scss'
export interface IconButtonProps extends BaseLinkProps {
  variant?: 'fill' | 'outline' | 'ghost'
  size?: 'large' | 'medium' | 'small'
  disabled?: boolean
  icon: string | React.ReactNode
  iconAnimation?: 'rotate'
  activeState?: boolean
  hoverState?: boolean
  ariaWrapper?: boolean
  onImage?: boolean
}

export const iconButtonVariants = ['fill', 'outline', 'ghost']

const IconButton = forwardRef<HTMLAnchorElement, IconButtonProps>(
  (
    {
      className,
      isNext = false,
      variant = 'fill',
      size = 'medium',
      icon,
      iconAnimation,
      activeState,
      onImage,
      hoverState,
      ariaWrapper,
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
        [$.size_medium]: size === 'medium',
        [$.size_small]: size === 'small',
        [$.size_large]: size === 'large',
        [$.icon_animation_rotate]: iconAnimation === 'rotate',
        [$.disabled]: isDisabled || props.disabled,
        [$.active]: activeState,
        [$.on_image]: onImage,
        [$.hover]: hoverState || _isHover
      },
      className
    )

    return ariaWrapper ? (
      <Button>
        <BaseLink ref={comp} {...props} isNext={isNext} className={classNames}>
          {typeof icon == 'string' ? (
            <Icon
              icon={icon}
              inline
              width="100%"
              height="100%"
              className={$.icon}
            />
          ) : (
            <div className={$.icon}>{icon}</div>
          )}
        </BaseLink>
      </Button>
    ) : (
      <BaseLink ref={comp} {...props} isNext={isNext} className={classNames}>
        {typeof icon == 'string' ? (
          <Icon
            icon={icon}
            inline
            width="100%"
            height="100%"
            className={$.icon}
          />
        ) : (
          <div className={$.icon}>{icon}</div>
        )}
      </BaseLink>
    )
  }
)

IconButton.displayName = 'IconButton'

export default memo(IconButton)
