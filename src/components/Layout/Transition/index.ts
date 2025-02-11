import { DUR } from '@/animations/vars'
import TransitionIn from './TransitionIn'
import TransitionOut from './TransitionOut'
import { TransitionTypes } from './types'

const transitionDurations: Record<TransitionTypes | string, number> = {
  slide: DUR.default,
  fade: DUR.default * (2 / 3)
}

export { transitionDurations, TransitionIn, TransitionOut }
