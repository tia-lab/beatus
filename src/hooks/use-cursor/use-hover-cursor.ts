/**
 * Custom hook that handles the hover cursor functionality.
 *
 * @param cursorRef - Reference to the cursor element.
 */
import { animateCursorDefault } from '@/animations'
import { useStoreCursor } from '@/store'
import { DEBUG, MEDIA, USE } from '@config'
import { gsap } from '@gsap'
import { useEffect, useRef } from 'react'

const useHoverCursor = (cursorRef: any) => {
  /* eslint-disable no-undef */
  const tl_default = useRef<gsap.core.Timeline | null>(null)
  const tl_theme = useRef<gsap.core.Timeline | null>(null)
  const tl_cardWork = useRef<gsap.core.Timeline | null>(null)
  const tl_homeServices = useRef<gsap.core.Timeline | null>(null)

  /* eslint-enable no-undef */

  //Access Stores
  const hoverDefault = useStoreCursor.use.hoverDefault()
  const hoverTheme = useStoreCursor.use.hoverTheme()
  const hoverCardWork = useStoreCursor.use.hoverCardWork()
  const hoverHomeServices = useStoreCursor.use.hoverHomeServices()
  //const theme = useStoreTheme.use.theme()

  // Declare context
  DEBUG.cursor && console.log('Cursor Store', useStoreCursor.getState())

  //Declare anim Hovers
  // eslint-disable-next-line
  const anim_hovers = (c: gsap.Context) => {
    animateCursorDefault({
      context: c,
      comp: cursorRef,
      tl: tl_default
      //theme: theme
    })
    //add more
  }
  let ctx = gsap.matchMedia(cursorRef.current)
  useEffect(() => {
    if (USE.cursor === false || !cursorRef) return

    ctx.add(MEDIA.desktop, (c) => {
      anim_hovers(c)
    })

    return () => ctx.revert()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursorRef])

  useEffect(() => {
    if (USE.cursor === false || !cursorRef.current) return
    ctx.add(MEDIA.desktop, anim_hovers)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursorRef])

  const playOrReverseAnimation = (
    debugMessage: string,
    // eslint-disable-next-line
    timeline: React.RefObject<gsap.core.Timeline>,
    shouldPlay: boolean
  ) => {
    DEBUG.cursor && console.log(debugMessage, timeline.current)
    if (!timeline.current) return
    shouldPlay ? timeline.current.play() : timeline.current.reverse()
  }

  useEffect(() => {
    playOrReverseAnimation(
      'Cursor Store Hover Timeline Default',
      tl_default,
      hoverDefault
    )
  }, [hoverDefault])

  useEffect(() => {
    playOrReverseAnimation(
      'Cursor Store Hover Timeline Theme',
      tl_theme,
      hoverTheme
    )
  }, [hoverTheme])

  useEffect(() => {
    playOrReverseAnimation(
      'Cursor Store Hover CardWork',
      tl_cardWork,
      hoverCardWork
    )
  }, [hoverCardWork])

  useEffect(() => {
    playOrReverseAnimation(
      'Cursor Store Hover Home Services',
      tl_homeServices,
      hoverHomeServices
    )
  }, [hoverHomeServices])
}

export default useHoverCursor
