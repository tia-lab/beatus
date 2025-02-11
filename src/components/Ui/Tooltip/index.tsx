'use client'

import { forwardRef, memo, useImperativeHandle, useRef, useState } from 'react'
import {
  Tooltip as AriaTooltip,
  TooltipProps as AriaTooltipProps,
  OverlayArrow,
  TooltipTrigger,
  TooltipTriggerComponentProps
} from 'react-aria-components'
import $ from './style.module.scss'

export interface TooltipTriggerProps extends TooltipTriggerComponentProps {
  children: React.ReactNode
  tooltipProps?: AriaTooltipProps
  tooltip?: React.ReactNode
  // Removed 'ref' from here
}

export interface TooltipProps extends Omit<AriaTooltipProps, 'children'> {}

export interface TooltipRefProps {
  comp?: TooltipProps
  open?: boolean
  setOpen?: (_open: boolean) => void
}

const Tooltip = forwardRef<TooltipRefProps, TooltipTriggerProps>(
  ({ tooltipProps, tooltip, children, ...props }, ref) => {
    // Refs
    const comp = useRef<any>()

    // States
    const [open, setOpen] = useState(false)

    // API
    useImperativeHandle(ref, () => ({
      comp: comp.current,
      open,
      setOpen
    }))

    return (
      <TooltipTrigger {...props} isOpen={open} onOpenChange={setOpen}>
        {children}
        <AriaTooltip {...tooltipProps} className={$.tooltip} ref={comp}>
          <OverlayArrow>
            <svg width={8} height={8} viewBox="0 0 8 8" className={$.svg_arrow}>
              <path d="M0 0 L4 4 L8 0" />
            </svg>
          </OverlayArrow>
          {tooltip}
        </AriaTooltip>
      </TooltipTrigger>
    )
  }
)

Tooltip.displayName = 'Tooltip'
export default memo(Tooltip)
