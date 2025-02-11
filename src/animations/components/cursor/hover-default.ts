/**
 * Animates the default cursor on hover.
 *
 * @param context - The gsap context.
 * @param comp - The component reference.
 * @param tl - The mutable ref object for the gsap timeline.
 * @param theme - The theme of the cursor ('auto', 'dark', or 'light').
 */

import { VARS } from '@/animations'
import { AnimCursorProps } from '@/animations/types'
import { COLORS } from '@config'
import { gsap } from '@gsap'

const cursor = '[data-cursor-default]'

const animateCursorDefault = ({ context, comp, tl }: AnimCursorProps) => {
  if (!context || !comp.current) return
  tl.current = gsap.timeline({ paused: true, id: 'cursor-default-hover' })
  tl.current.to(cursor, {
    scale: 1.5,
    backgroundColor: COLORS.primary100,
    duration: VARS.duration.default,
    ease: VARS.ease.out
  })
}

export default animateCursorDefault
