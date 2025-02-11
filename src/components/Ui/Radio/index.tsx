//https://react-spectrum.adobe.com/react-aria/Checkbox.html

'use client'

import clsx from 'clsx'
import { forwardRef, memo, useImperativeHandle, useRef } from 'react'
import type { RadioProps as AriaRadioProps } from 'react-aria-components'
import { Radio as AriaRadio } from 'react-aria-components'
import $ from './style.module.scss'

export interface RadioProps extends AriaRadioProps {}
export interface RadioRefProps extends RadioProps {}

const Radio = forwardRef<RadioRefProps, RadioProps>(
  ({ children, className, ...props }, ref) => {
    //Refs
    const comp = useRef<any>(null)

    //API
    useImperativeHandle(ref, () => comp.current)

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

Radio.displayName = 'Radio'

export default memo(Radio)
