import { AnimBaseProps } from '@/animations/types'
import { DUR, EASE } from '@/animations/vars'
import { contextScrollVars } from '@/lib/animations/'
import { ScrollTrigger, SplitText, gsap } from '@gsap'

const title = ({ ...props }: AnimBaseProps) => {
  gsap.registerPlugin(ScrollTrigger, SplitText)
  const split = new SplitText(props.ref.current, {
    type: 'words, chars',
    charsClass: 'anim_title_char',
    wordsClass: 'anim_title_word'
  })
  gsap.set(props.ref.current, { autoAlpha: 0 })
  gsap.set(split.chars, { autoAlpha: 0, y: '2rem' })
  gsap.set(split.words, { overflow: 'hidden' })

  props.tl = gsap.timeline({
    scrollTrigger: {
      trigger: props.ref.current,
      start: 'top 90%',
      ...contextScrollVars(props.ctx, props.animScrollVars)
    }
  })

  props.tl
    .to(props.ref.current, {
      autoAlpha: 1,
      duration: DUR.default / 5,
      ease: EASE.out
    })
    .to(split.chars, {
      autoAlpha: 1,
      y: 0,
      duration: DUR.default / 2,
      ease: EASE.out,
      stagger: { amount: DUR.default / 4 }
    })
}

export default title
