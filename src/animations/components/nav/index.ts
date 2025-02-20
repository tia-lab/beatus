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
  const _mainWrap = document.querySelector('[data-main]')
  const line = '[data-line]'
  const item = '[data-item]'
  gsap.set(line, { width: 0 })
  gsap.set(item, { y: 16, autoAlpha: 0 })
  gsap.set(comp.current, { display: 'none', xPercent: -100 })
  tl.current
    .to(body, { overflow: 'hidden', duration: 0 })
    .to(comp.current, { display: 'flex', duration: 0 }, '<')
    .to(comp.current, { xPercent: 0 })
    //.to(mainWrap, { xPercent: 100 }, '<')
    .to(line, { width: '100%' }, '<+=0.25')
    .to(item, { y: 0, autoAlpha: 1, stagger: 0.1 }, '<')
}

export default animateNav
