import { DUR, EASE } from '@/animations/vars'
import { Store } from '@/types'
import { COLORS } from '@config'
import { gsap } from '@gsap'

const animatePreload = (
  comp: any,
  tl: any,
  setIsPreloaded: Store.StorePreloadAction['setIsPreloaded'],
  setStartAnimations: Store.StorePreloadAction['setStartAnimations']
) => {
  const logo = '[data-logo]'
  gsap.set(logo, { autoAlpha: 0, y: '2rem' })
  tl.current = gsap.timeline({
    paused: true,
    defaults: {
      duration: DUR.default,
      ease: EASE.out
    },
    onComplete: () => {
      setIsPreloaded(true)
      setStartAnimations(true)
    }
  })
  tl.current
    .to(comp.current, {
      backgroundColor: COLORS.primary300,
      delay: DUR.default * 0.25
    })
    .to(logo, { autoAlpha: 1, y: 0 }, '<+=0.1')
    .to(comp.current, { height: 0, delay: DUR.default * (2 / 3) })
    .to(logo, { autoAlpha: 0, y: '-2rem' }, '<')
    .to(comp.current, { autoAlpha: 0, delay: DUR.default * (1 / 3) })
}

export default animatePreload
