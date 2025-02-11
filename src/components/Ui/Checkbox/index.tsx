//https://react-spectrum.adobe.com/react-aria/Checkbox.html

'use client'

import clsx from 'clsx'
import { forwardRef, memo, useImperativeHandle, useRef } from 'react'
import type { CheckboxProps as AriaCheckboxProps } from 'react-aria-components'
import { Checkbox as AriaCheckbox } from 'react-aria-components'
import Iconify from '../Iconify'
import $ from './style.module.scss'

export interface CheckboxProps extends AriaCheckboxProps {}

export interface CheckboxRefProps extends CheckboxProps {}

const Checkbox = forwardRef<CheckboxRefProps, CheckboxProps>(
  ({ children, className, ...props }, ref) => {
    //Refs
    const comp = useRef<any>(null)

    //API
    useImperativeHandle(ref, () => comp.current)

    return (
      <AriaCheckbox
        ref={comp}
        {...props}
        className={clsx($.checkbox_wrap, className)}
      >
        {({ isIndeterminate }) => (
          <>
            <div className={$.checkbox}>
              {isIndeterminate ? (
                <div className={$.icon}>
                  <Iconify family="lucide" icon="minus" width="100%" />
                </div>
              ) : (
                <div className={$.icon}>
                  <Iconify family="lucide" icon="check" width="100%" />
                </div>
              )}
            </div>
            {children}
          </>
        )}
      </AriaCheckbox>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export default memo(Checkbox)
