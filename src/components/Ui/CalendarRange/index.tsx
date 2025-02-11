'use client'

import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date'
import clsx from 'clsx'
import { forwardRef, memo, useImperativeHandle, useRef, useState } from 'react'

import {
  Button as AriaButton,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  DateValue,
  Heading,
  RangeCalendar,
  RangeCalendarProps,
  Text
} from 'react-aria-components'
import IconButton from '../IconButton'
import $ from './style.module.scss'

export interface CalendarRangeProps extends RangeCalendarProps<DateValue> {
  disablePast?: boolean
}

export interface CalendarRangeRefProps {
  comp: HTMLDivElement | null
  // eslint-disable-next-line no-unused-vars
  setRange: (range: { start: CalendarDate; end: CalendarDate }) => void
  start: CalendarDate
  end: CalendarDate
}

const CalendarRange = forwardRef<CalendarRangeRefProps, CalendarRangeProps>(
  ({ disablePast = true, ...props }, ref) => {
    //Refs
    const comp = useRef<HTMLDivElement>(null)

    //states
    let [range, setRange] = useState({
      start: today(getLocalTimeZone()),
      end: today(getLocalTimeZone())
    })

    //API
    useImperativeHandle(ref, () => ({
      comp: comp.current,
      setRange: (range) => setRange(range as any),
      start: range.start,
      end: range.end
    }))

    return (
      <RangeCalendar
        ref={comp}
        onChange={(range) => setRange(range as any)}
        className={$.calendar}
        minValue={disablePast ? today(getLocalTimeZone()) : undefined}
        data-start-date={range.start}
        data-end-date={range.end}
        {...props}
      >
        <div className={$.calendar_head}>
          <Heading level={4} className={clsx('text-main', $.title)} />
          <div className={$.calendar_buttons}>
            <AriaButton slot="previous">
              <IconButton
                icon="lucide:chevron-left"
                size="large"
                variant="outline"
              />
            </AriaButton>

            <AriaButton slot="next">
              <IconButton
                icon="lucide:chevron-right"
                size="large"
                variant="outline"
              />
            </AriaButton>
          </div>
        </div>
        <div className={$.calendar_grid_wrap}>
          <CalendarGrid className={$.calendar_grid}>
            <CalendarGridHeader className={$.calendar_grid_head}>
              {(day) => (
                <CalendarHeaderCell className={$.cell_head}>
                  {day}
                </CalendarHeaderCell>
              )}
            </CalendarGridHeader>

            <CalendarGridBody className={$.calendar_grid_body}>
              {(date) => <CalendarCell date={date} className={$.cell} />}
            </CalendarGridBody>
          </CalendarGrid>
        </div>
        <Text slot="errorMessage" />
      </RangeCalendar>
    )
  }
)

CalendarRange.displayName = 'CalendarRange'

export default memo(CalendarRange)
