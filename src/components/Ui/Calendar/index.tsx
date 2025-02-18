'use client'

import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date'
import clsx from 'clsx'
import { forwardRef, memo, useImperativeHandle, useRef, useState } from 'react'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  Button as AriaButton,
  Calendar as AriaCalendar,
  CalendarProps as AriaCalendarProps,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  DateValue,
  Heading,
  Text
} from 'react-aria-components'
import IconButton from '../IconButton'
import $ from './style.module.scss'

export interface CalendarProps extends AriaCalendarProps<DateValue> {
  disablePast?: boolean
}

export interface CalendarRefProps {
  comp: HTMLDivElement | null
  // eslint-disable-next-line no-unused-vars
  setDate: (date: CalendarDate) => void
  date: CalendarDate
}

const Calendar = forwardRef<CalendarRefProps, CalendarProps>(
  ({ disablePast = true, ...props }, ref) => {
    //Refs
    const comp = useRef<HTMLDivElement>(null)

    //states
    let [date, setDate] = useState(today(getLocalTimeZone()))

    //API
    useImperativeHandle(ref, () => ({
      comp: comp.current,
      date: date,
      setDate: (date) => setDate(date as any)
    }))

    return (
      <AriaCalendar
        ref={comp}
        onChange={(date) => setDate(date as any)}
        className={$.calendar}
        minValue={disablePast ? today(getLocalTimeZone()) : undefined}
        data-date={date}
        {...props}
      >
        <div className={$.calendar_head}>
          <Heading level={4} className={clsx('text-main', $.title)} />
          <div className={$.calendar_buttons}>
            <AriaButton slot="previous">
              <IconButton
                icon={
                  <ChevronLeft width="100%" height="100%" strokeWidth={1} />
                }
                size="large"
                variant="outline"
              />
            </AriaButton>

            <AriaButton slot="next">
              <IconButton
                icon={
                  <ChevronRight width="100%" height="100%" strokeWidth={1} />
                }
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
      </AriaCalendar>
    )
  }
)

Calendar.displayName = 'Calendar'

export default memo(Calendar)
