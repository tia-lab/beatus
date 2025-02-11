import { AnimTransitionProps } from '@/animations/types/animations'
import { DUR, EASE } from '@/animations/vars'
import { gsap } from '@gsap'

const animTransFadeIn = ({ tl, name, onComplete }: AnimTransitionProps) => {
  const fadeIn = `[data-transition='${name}']`
  tl = gsap.timeline({
    defaults: { duration: DUR.default * (2 / 3), ease: EASE.in }
  })
  tl.to(fadeIn, { opacity: 0.5, onComplete })
}

export default animTransFadeIn
