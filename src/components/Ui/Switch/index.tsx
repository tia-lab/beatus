'use client'

import clsx from 'clsx'
import { forwardRef, memo, useEffect, useImperativeHandle, useRef } from 'react'
import {
  Switch as AriaSwicth,
  SwitchProps as AriaSwicthProps
} from 'react-aria-components'
import { useToggle } from 'usehooks-ts'
import $ from './style.module.scss'

export interface SwitchProps extends Omit<AriaSwicthProps, 'children'> {
  onActive?: () => void
  onInactive?: () => void
  label?: React.ReactNode | string
}

export interface SwitchRefProps {
  active: boolean
  toggleActive: () => void
  comp: HTMLDivElement
}

const Swicth = forwardRef<SwitchRefProps, SwitchProps>(
  ({ className, onActive, onInactive, label, ...props }, ref) => {
    //Ref
    const comp = useRef<any>(null)

    //Hooks
    const [active, toggleActive, setActive] = useToggle()

    useEffect(() => {
      active ? onActive?.() : onInactive?.()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active])

    //API
    useImperativeHandle(ref, () => ({
      comp: comp.current,
      active,
      toggleActive
    }))

    //Composer
    const switchClass = clsx($.switch, { [$.active]: active }, className)

    return (
      <div className={$.switch_wrap}>
        <AriaSwicth
          aria-label="switch"
          ref={comp}
          className={switchClass}
          {...props}
          isSelected={active}
          onChange={setActive}
        >
          <div className={$.dot} />
        </AriaSwicth>
        {label && typeof label === 'string' ? (
          <div className={$.label}>{label}</div>
        ) : (
          label
        )}
      </div>
    )
  }
)

Swicth.displayName = 'Swicth'
export default memo(Swicth)
