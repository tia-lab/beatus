'use client'

import clsx from 'clsx'
import { forwardRef, memo, useImperativeHandle, useRef } from 'react'
import type {
  RadioGroupProps as AriaRadioGroupProps,
  RadioProps as AriaRadioProps
} from 'react-aria-components'
import {
  Radio as AriaRadio,
  RadioGroup as AriaRadioGroup,
  Label
} from 'react-aria-components'
import $ from './style.module.scss'

// ✅ RadioGroup Props
export interface RadioGroupProps
  extends Omit<AriaRadioGroupProps, 'value' | 'onChange'> {
  value?: string // Controlled value
  onChange?: (_value: string) => void // Controlled state update
  label?: string
}

// ✅ Radio Props (does NOT need state, controlled by `RadioGroup`)
export interface RadioProps extends AriaRadioProps {}

// ✅ RadioGroup Component
const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ value, onChange, children, className, ...props }, ref) => {
    const comp = useRef<HTMLDivElement>(null)

    useImperativeHandle(ref, () => comp.current!)

    return (
      <AriaRadioGroup
        ref={comp}
        {...props}
        className={clsx($.radio_group, className)}
        value={value} // ✅ Controlled by parent
        onChange={(event) => onChange?.(event as string)} // ✅ Ensure correct type
      >
        <>
          <Label className={$.label}>{props.label}</Label>

          <div className={$.group}>
            <>{children}</>
          </div>
        </>
      </AriaRadioGroup>
    )
  }
)

// ✅ Radio Component (No need for internal state)
const Radio = forwardRef<HTMLLabelElement, RadioProps>(
  ({ children, className, ...props }, ref) => {
    const comp = useRef<HTMLLabelElement>(null)

    useImperativeHandle(ref, () => comp.current!)

    return (
      <AriaRadio ref={comp} {...props} className={clsx($.radio, className)}>
        <div className={$.dot}>
          <div className={$.dot_inner} />
        </div>
        <>{children}</>
      </AriaRadio>
    )
  }
)

RadioGroup.displayName = 'RadioGroup'
Radio.displayName = 'Radio'

export { Radio, RadioGroup }
export default memo(RadioGroup)
