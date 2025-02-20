import * as components from './components'
import animateCursorDefault from './components/cursor/hover-default'
import css from './lib/css'
import fadeIn from './lib/fade-in'
import animParallax from './lib/parallax'
import sectionFadeIn from './lib/section-fade-in'
import text from './lib/text'
import title from './lib/title'
import { animSectionHero } from './sections'
import { AnimBase, AnimBaseProps } from './types'
import VARS from './vars'

const animBaseTypes: Record<AnimBase, (_props: AnimBaseProps) => void> = {
  'fade-in': (props: AnimBaseProps) => fadeIn(props),
  text: (props: AnimBaseProps) => fadeIn(props),
  title: (props: AnimBaseProps) => text(props),
  css: (props: AnimBaseProps) => css(props),
  'section-hero': (props: AnimBaseProps) => animSectionHero(props),
  'section-fade-in': (props: AnimBaseProps) => sectionFadeIn(props)
}

export {
  animateCursorDefault,
  animBaseTypes,
  animParallax,
  components,
  fadeIn,
  text,
  title,
  VARS
}
