import { AnimTransitionProps } from '@/animations/types/animations'
import { DUR, EASE } from '@/animations/vars'
import { gsap } from '@gsap'

const animTransFadeOut = ({ tl, name }: AnimTransitionProps) => {
  const el = `[data-transition='${name}']`
  tl = gsap.timeline({
    defaults: { duration: DUR.default * (2 / 3), ease: EASE.out }
  })
  tl.to(el, { opacity: 1 })
}

export default animTransFadeOut
