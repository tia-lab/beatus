import { AnimBaseProps } from '@/animations/types'
import { contextScrollVars } from '@/lib/animations'
import { ScrollTrigger, gsap } from '@gsap'

const css = ({ ...props }: AnimBaseProps) => {
  gsap.registerPlugin(ScrollTrigger)
  if (!props.ref.current) return

  ScrollTrigger.create({
    trigger: props.ref.current,
    start: 'top 90%',
    onEnter: () => {
      props.ref.current.classList.add('_animate')
    },
    ...contextScrollVars(props.ctx, props.animScrollVars)
  })
}

export default css
