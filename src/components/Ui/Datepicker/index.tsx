'use client'

import clsx from 'clsx'
import { forwardRef, memo, useImperativeHandle, useRef, useState } from 'react'
import {
  Button as AriaButton,
  DatePicker as AriaDatePicker,
  DatePickerProps as AriaDatePickerProps,
  DateInput,
  DateSegment,
  DateValue,
  Dialog,
  FieldError,
  Group,
  Label,
  Popover,
  ValidationResult
} from 'react-aria-components'
import Calendar from '../Calendar'
import IconButton from '../IconButton'
import $ from './style.module.scss'

export interface DatePickerPros<T extends DateValue>
  extends AriaDatePickerProps<T> {
  label?: string
  description?: string
  errorMessage?: string | ((_validation: ValidationResult) => string)
  initialValue?: DateValue
  onChange?: (_value: DateValue) => void
}

export interface DatePickerRefProps {
  comp: HTMLDivElement | null
  value: DateValue | null
  setValue: (_value: DateValue) => void
  onChange: (_value: DateValue) => void
}

const DatePicker = forwardRef<DatePickerRefProps, DatePickerPros<DateValue>>(
  (
    {
      label,
      description,
      errorMessage,
      initialValue,
      onChange,
      isRequired,
      ...props
    },
    ref
  ) => {
    //Refs
    const comp = useRef<HTMLDivElement>(null)

    //states
    const [value, setValue] = useState<DateValue | null>(initialValue || null)

    //Api
    useImperativeHandle(ref, () => ({
      comp: comp.current,
      value: value,
      setValue: (value) => setValue(value as any),
      onChange: (value) => onChange && onChange(value as any)
    }))

    //Handlers
    const handleReset = () => {
      setValue(null)
    }

    return (
      <AriaDatePicker
        {...props}
        ref={comp}
        isRequired={isRequired}
        className={$.date_picker}
        value={value}
        onChange={(value) => {
          setValue(value)
          onChange && onChange(value)
        }}
      >
        <div className={$.input_wrap}>
          <Group className={$.input}>
            <AriaButton>
              <div className={$.input_group}>
                <Label className={$.label}>{label}</Label>
                <DateInput
                  className={clsx($.input_date, value && $.input_date_active)}
                >
                  {(segment) => <DateSegment segment={segment} />}
                </DateInput>
              </div>
            </AriaButton>
            <div className="flex">
              {value && (
                <IconButton
                  icon="lucide:x"
                  className={$.icon_button}
                  onClick={handleReset}
                  iconAnimation="rotate"
                  variant="ghost"
                />
              )}
            </div>
          </Group>

          <FieldError>{errorMessage}</FieldError>
          {description && (
            <div slot="description" className={$.decsription}>
              {description}
            </div>
          )}
        </div>
        <Popover className={$.popover}>
          <Dialog>
            <Calendar />
          </Dialog>
        </Popover>
      </AriaDatePicker>
    )
  }
)

DatePicker.displayName = 'DatePicker'

export default memo(DatePicker)
