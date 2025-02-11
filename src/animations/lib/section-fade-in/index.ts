import { AnimBaseProps } from '@/animations/types'
import { DUR, EASE } from '@/animations/vars'
import { contextScrollVars, contextVars } from '@/lib/animations'
import { ScrollTrigger, gsap } from '@gsap'

const sectionFadeIn = ({ ...props }: AnimBaseProps) => {
  gsap.registerPlugin(ScrollTrigger)
  if (!props.ref.current) return
  gsap.set(props.ref.current, { autoAlpha: 0, y: '2rem' })
  props.tl = gsap.to(props.ref.current, {
    autoAlpha: 1,
    duration: DUR.default,
    ease: EASE.out,
    clearProps: 'y',
    y: 0,
    ...contextVars(props.ctx, props.animVars),
    scrollTrigger: {
      trigger: props.ref.current,
      start: 'top 80%',
      ...contextScrollVars(props.ctx, props.animScrollVars)
    }
  })
}

export default sectionFadeIn
