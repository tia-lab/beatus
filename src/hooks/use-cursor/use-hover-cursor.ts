/**
 * Custom hook that handles the hover cursor functionality.
 *
 * @param cursorRef - Reference to the cursor element.
 */
import { animateCursorDefault } from '@/animations'
import { useStoreCursor } from '@/store'
import { DEBUG, MEDIA, USE } from '@config'
import { gsap } from '@gsap'
import { useCallback, useEffect, useRef } from 'react'

const useHoverCursor = (cursorRef: any) => {
  /* eslint-disable no-undef */
  const tl_default = useRef<gsap.core.Timeline | null>(null)
  const tl_cardPackage = useRef<gsap.core.Timeline | null>(null)

  /* eslint-enable no-undef */

  //Access Stores
  const hoverDefault = useStoreCursor.use.hoverDefault()
  const hoverCardPackage = useStoreCursor.use.hoverCardPackage()
  const type = useStoreCursor.use.type()
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

  const playOrReverseAnimation = useCallback(
    (
      debugMessage: string,
      // eslint-disable-next-line
      timeline: React.RefObject<gsap.core.Timeline>,
      shouldPlay: boolean
    ) => {
      DEBUG.cursor && console.log(debugMessage, timeline.current)
      if (!timeline.current || type === 'none') return
      shouldPlay ? timeline.current.play() : timeline.current.reverse()
    },
    [type]
  )

  useEffect(() => {
    playOrReverseAnimation(
      'Cursor Store Hover Timeline Default',
      tl_default,
      hoverDefault
    )
  }, [hoverDefault, playOrReverseAnimation])

  useEffect(() => {
    playOrReverseAnimation(
      'Cursor Store Hover Timeline CardPackage',
      tl_cardPackage,
      hoverCardPackage
    )
  }, [hoverCardPackage, playOrReverseAnimation])
}

export default useHoverCursor
