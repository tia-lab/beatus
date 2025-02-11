export type AnimBase =
  | 'fade-in'
  | 'title'
  | 'text'
  | 'css'
  | 'section-hero'
  | 'section-fade-in'

export interface AnimBaseProps {
  tl: any
  ref: any
  ctx?: gsap.Context
  animVars?: GSAPTweenVars
  animScrollVars?: ScrollTrigger.Vars
}

export interface AnimTransitionProps {
  tl: GSAPTimeline | null
  comp: any
  name: string
  ctx?: gsap.Context
  onComplete?: () => void
}
