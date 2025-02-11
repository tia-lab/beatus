import { AnimTransitionProps } from '@/animations/types/animations'
import { DUR, EASE } from '@/animations/vars'
import { gsap } from '@gsap'

const animTransSlideIn = ({ tl, name, onComplete }: AnimTransitionProps) => {
  const slideIn = `[data-transition='${name}']`
  tl = gsap.timeline({ defaults: { duration: DUR.default, ease: EASE.in } })
  tl.to(slideIn, { width: 0, onComplete })
}

export default animTransSlideIn
