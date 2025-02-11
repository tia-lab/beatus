const goldenRatio = (1 + Math.sqrt(5)) / 2

const VARS = {
  ease: {
    out: 'power2.out',
    in: 'power2.in',
    inOut: 'power2.inOut',
    none: 'none',
    expoIn: 'expo.in',
    expoOut: 'expo.out',
    expoInOut: 'expo.inOut',
    circIn: 'circ.in',
    circOut: 'circ.out',
    circInOut: 'circ.inOut'
  },
  duration: {
    default: 1 / goldenRatio,
    goldenRatio: goldenRatio,
    stagger: 1 / goldenRatio / 5
  }
}

export default VARS
export const EASE = VARS.ease
export const DUR = VARS.duration
