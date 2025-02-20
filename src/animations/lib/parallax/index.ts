import { AnimBaseProps } from '@/animations/types'
import { contextScrollVars, contextVars } from '@/lib/animations'
import { ScrollTrigger, gsap } from '@gsap'

interface AnimParallaxProps extends AnimBaseProps {
  parallax?: number | boolean // Number sets intensity, boolean enables default
}

const animateParallax = ({ ...props }: AnimParallaxProps) => {
  gsap.registerPlugin(ScrollTrigger)
  const { ctx, ref, parallax } = props
  if (!ctx?.conditions?.desktop || !ref.current || !parallax) return

  const intensity = typeof parallax === 'number' ? parallax : 1.5 // Default intensity

  gsap.set(ref.current, { y: `${2 * intensity}rem` })

  gsap.to(ref.current, {
    y: `-${2 * intensity}rem`, // Moves the element upwards slightly
    ease: 'power1.out',
    duration: 2,
    ...contextVars(props.ctx, props.animVars),
    scrollTrigger: {
      trigger: ref.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.5, // Smooth effect without abrupt movement
      ...contextScrollVars(props.ctx, props.animScrollVars)
    }
  })
}

export default animateParallax
