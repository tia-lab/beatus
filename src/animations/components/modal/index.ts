import { DUR, EASE } from '@/animations/vars'
import { gsap } from '@gsap'

const animateModal = (comp: any, tl: any) => {
  const inner = '[data-inner]'
  tl.current = gsap.timeline({
    paused: true,
    defaults: {
      duration: DUR.default,
      ease: EASE.out
    }
  })
  gsap.set(comp.current, { autoAlpha: 0, display: 'none' })
  gsap.set(inner, { y: 100, autoAlpha: 0 })
  tl.current
    .to(comp.current, { display: 'flex', duration: 0 })
    .to(comp.current, { autoAlpha: 1 })
    .to(inner, { y: 0, autoAlpha: 1 }, '<')
}

export default animateModal
