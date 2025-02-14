'use client'

import { VARS } from '@/animations'
import { useHoverCursor, useMoveCursor } from '@/hooks'
import { useStoreCursor } from '@/store'
import { USE } from '@config'
import { gsap } from '@gsap'
import clsx from 'clsx'
import { MoveHorizontal } from 'lucide-react'
import { forwardRef, memo, useEffect, useImperativeHandle, useRef } from 'react'
import $ from './style.module.scss'

const CursorRef = forwardRef((props, ref) => {
  /* ---------------------------------- refs ---------------------------------- */

  const el = useRef<any>()
  const cursorAnimRef = useRef<any>()

  /* --------------------------------- Stores --------------------------------- */

  const hasMOved = useStoreCursor.use.hasMoved()
  const hoverDefault = useStoreCursor.use.hoverDefault()
  const type = useStoreCursor.use.type()
  const setHoverDefault = useStoreCursor.use.setHoverDefault()
  const setHoverCardPackage = useStoreCursor.use.setHoverCardPackage()
  const hoverCardPackage = useStoreCursor.use.hoverCardPackage()

  //const theme = useStore(useStoreTheme, (state) => state.theme)

  /* --------------------------- //API - move cursor -------------------------- */

  useImperativeHandle(ref, () => {
    if (USE.cursor === false) return
    // return our API
    const xTo = gsap.quickTo(el.current, 'x', {
      duration: 0.66,
      ease: VARS.ease.out,
      delay: 0.1
    })
    const yTo = gsap.quickTo(el.current, 'y', {
      duration: 0.66,
      ease: VARS.ease.out,
      delay: 0.1
    })

    return {
      moveTo(x: number, y: number) {
        xTo(x)
        yTo(y)
      }
    }
  }, [])

  /* ---------------------------------- Hooks --------------------------------- */

  //Cursor
  useHoverCursor(cursorAnimRef)
  /* -------------------------------- Composers ------------------------------- */
  const dataHover = clsx(
    hoverDefault && 'default',
    hoverCardPackage && 'card-package'
  )

  return (
    USE.cursor && (
      <div
        className={clsx($.cursor, hasMOved && $.active)}
        ref={el}
        data-type={type}
        {...props}
        //data-theme={theme}
      >
        <div ref={cursorAnimRef} data-hover={dataHover}>
          <div className={$.default} data-cursor-default />
          <div className={$.cursor_slider_cards}>
            <div className={$.cursor_slider_cards_inner} />
            <div className={$.cursor_slider_cards_icon}>
              <MoveHorizontal width="100%" height="100%" strokeWidth={0.5} />
            </div>
          </div>
          {/* <div className={$.theme} data-cursor-theme>
            <Sun size={'100%'} fill="currentColor" data-sun />
            <Moon size={'100%'} fill="currentColor" data-moon />
          </div> */}
        </div>
      </div>
    )
  )
})

CursorRef.displayName = 'Cursor'

interface CursorProps extends React.HTMLAttributes<HTMLDivElement> {}

const Cursor = ({ ...props }: CursorProps) => {
  const ref = useRef<any>()

  const hasMoved = useStoreCursor.use.hasMoved()
  const setHasMoved = useStoreCursor.use.setHasMoved()

  //Hooks

  //Move
  useEffect(() => {
    if (USE.cursor === false) return
    const { innerWidth, innerHeight } = window
    ref.current.moveTo(innerWidth / 2, innerHeight / 2)
  }, [])
  useMoveCursor((x: number, y: number) => {
    hasMoved === false && setHasMoved(true)
    ref.current.moveTo(x, y)
  })

  return USE.cursor ? <CursorRef ref={ref} {...props} /> : null
}
export default memo(Cursor)
