import { AnimTransitionProps } from '@/animations/types/animations'
import { DUR, EASE } from '@/animations/vars'
import { gsap } from '@gsap'

const animTransSlideOut = ({ tl, name }: AnimTransitionProps) => {
  const slideOut = `[data-transition='${name}']`
  tl = gsap.timeline({ defaults: { duration: DUR.default, ease: EASE.out } })
  tl.to(slideOut, { width: '100%' })
}

export default animTransSlideOut
