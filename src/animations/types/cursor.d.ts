export interface AnimCursorProps {
  context: gsap.Context //here i pass only the desktop
  comp: any
  //eslint-disable-next-line no-undef
  tl: MutableRefObject<GSAPTimeline | null>
  theme?: 'dark' | 'light' | 'auto'
}
