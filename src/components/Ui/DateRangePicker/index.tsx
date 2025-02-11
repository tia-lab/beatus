'use client'

import clsx from 'clsx'
import { forwardRef, memo, useImperativeHandle, useRef, useState } from 'react'
import {
  Button as AriaButton,
  DateRangePicker as AriaDatePicker,
  DateRangePickerProps as AriaDatePickerProps,
  DateInput,
  DateRange,
  DateSegment,
  DateValue,
  Dialog,
  FieldError,
  Group,
  Label,
  Popover,
  ValidationResult
} from 'react-aria-components'
import CalendarRange from '../CalendarRange'
import IconButton from '../IconButton'
import $ from './style.module.scss'

interface DateRangeValue extends Omit<DateRange, 'start' | 'end'> {
  start: DateValue | null
  end: DateValue | null
}
export interface DateRangePickerProps<T extends DateValue>
  extends Omit<AriaDatePickerProps<T>, 'value'> {
  label?: string
  value?: DateRangeValue | null
  description?: string
  errorMessage?: string | ((_validation: ValidationResult) => string)
  initialStartValue?: DateValue
  initialEndValue?: DateValue
}

export interface DateRangePickerRefProps {
  comp: HTMLDivElement | null
  value: DateRangeValue | null
  setValue: (_value: DateRange) => void
  onChange: (_value: DateRange) => void
}

const DateRangePicker = forwardRef<
  DateRangePickerRefProps,
  DateRangePickerProps<DateValue>
>(
  (
    {
      label,
      description,
      errorMessage,
      initialStartValue,
      initialEndValue,
      onChange,
      ...props
    },
    ref
  ) => {
    //Refs
    const comp = useRef<HTMLDivElement>(null)

    //states

    const [value, setValue] = useState<DateRangeValue | null>({
      start: initialStartValue || null,
      end: initialEndValue || null
    })

    //Api
    useImperativeHandle(ref, () => ({
      comp: comp.current,
      value: value,
      setValue: (value) => setValue(value as any),
      onChange: (value) => onChange && onChange(value as any)
    }))

    const isSetRange = (value: DateRangeValue | null): boolean => {
      if (value?.start && value?.end) {
        return true
      }
      return false
    }

    //Handlers
    const handleReset = () => {
      setValue({ start: null, end: null })
    }

    return (
      <AriaDatePicker
        {...props}
        ref={comp}
        className={$.date_picker}
        value={value as DateRange}
        onChange={(value) => {
          setValue(value)
          onChange && onChange(value)
        }}
      >
        <div className={$.input_wrap}>
          <Label>{label}</Label>
          <Group className={$.input}>
            <DateInput
              slot="start"
              className={clsx(
                $.input_date,
                value?.start && $.input_date_active
              )}
            >
              {(segment) => <DateSegment segment={segment} />}
            </DateInput>
            <span aria-hidden="true">–</span>
            <DateInput
              slot="end"
              className={clsx($.input_date, value?.end && $.input_date_active)}
            >
              {(segment) => <DateSegment segment={segment} />}
            </DateInput>
            <div className="flex">
              <AriaButton>
                <IconButton icon="lucide:calendar" className={$.icon_button} />
              </AriaButton>
              {isSetRange(value) && (
                <IconButton
                  icon="lucide:x"
                  className={$.icon_button}
                  onClick={handleReset}
                  iconAnimation="rotate"
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
            <CalendarRange />
          </Dialog>
        </Popover>
      </AriaDatePicker>
    )
  }
)

DateRangePicker.displayName = 'DateRangePicker'

export default memo(DateRangePicker)
