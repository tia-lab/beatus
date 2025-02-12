import { DUR, EASE } from '@/animations/vars'
import { gsap } from '@gsap'

const animateNav = (comp: any, tl: any) => {
  tl.current = gsap.timeline({
    paused: true,
    defaults: {
      duration: DUR.default * 1.5,
      ease: EASE.inOut
    }
  })
  const body = document.querySelector('body')
  const mainWrap = document.querySelector('[data-main]')

  gsap.set(comp.current, { display: 'none', xPercent: -100 })
  tl.current
    .to(body, { overflow: 'hidden', duration: 0 })
    .to(comp.current, { display: 'flex', duration: 0 }, '<')
    .to(comp.current, { xPercent: 0 })
    .to(mainWrap, { xPercent: 100 }, '<')
}

export default animateNav
