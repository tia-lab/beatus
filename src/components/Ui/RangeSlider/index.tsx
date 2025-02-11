'use client'

import { forwardRef, memo, useImperativeHandle, useRef, useState } from 'react'
import {
  Label,
  Slider,
  SliderOutput,
  SliderProps,
  SliderThumb,
  SliderTrack
} from 'react-aria-components'
import $ from './style.module.scss'

export interface RangeSliderProps<T> extends SliderProps<T> {
  label?: string
  thumbLabels?: string[]
}

export interface RangeSliderRefProps {
  comp: HTMLDivElement | null
  setValue: (_value: number | number[]) => void
}

const RangeSlider = forwardRef<
  RangeSliderRefProps,
  RangeSliderProps<number | number[]>
>(({ label, thumbLabels, ...props }, ref) => {
  //Refs
  const comp = useRef<HTMLDivElement>(null)

  //States
  const [value, setValue] = useState<number | number[]>(props.defaultValue || 0)

  //Api
  useImperativeHandle(ref, () => ({
    comp: comp.current,
    setValue: (value) => setValue(value as number | number[])
  }))

  return (
    <Slider
      aria-label="Range slider"
      {...props}
      ref={comp}
      value={value}
      onChange={(value) => setValue(value)}
      className={$.range_slider}
    >
      {label && <Label className={$.label}>{label}</Label>}

      <SliderTrack className={$.track}>
        {({ state }) =>
          state.values.map((_, i) => (
            <SliderThumb
              className={$.thumb}
              key={i}
              index={i}
              aria-label={thumbLabels?.[i]}
            />
          ))
        }
      </SliderTrack>
      <SliderOutput className={$.output}>
        {({ state }) =>
          state.values.map((_, i) => state.getThumbValueLabel(i)).join(' – ')
        }
      </SliderOutput>
    </Slider>
  )
})

RangeSlider.displayName = 'RangeSlider'

export default memo(RangeSlider)
