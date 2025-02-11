import { AnimBaseProps } from '@/animations/types'
import { gsap } from '@gsap'

const animSectionHero = ({ ref, tl }: AnimBaseProps) => {
  if (!ref.current) return
  tl = gsap.timeline({
    paused: true,
    defaults: { duration: 1, ease: 'power2.out' }
  })
  gsap.set(ref.current, { autoAlpha: 0, y: '2rem' })
  tl.to(ref.current, { autoAlpha: 1, y: '0', backgroundColor: 'red' })
}

export default animSectionHero
