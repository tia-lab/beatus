import gsap from 'gsap'

import { Flip } from 'gsap/dist/Flip'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { SplitText } from 'gsap/dist/SplitText'

// Configuring GSAP
gsap.config({
  autoSleep: 120,
  nullTargetWarn: process.env.NODE_ENV === 'development' ? true : false
})

gsap.ticker.fps(100)

//Moved in the useGsapConfig hook
const SCROLLTRIGGER_CONFIG: ScrollTrigger.ConfigVars = {
  //autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
  syncInterval: 100,
  limitCallbacks: true
}
const SCROLLTRIGGER_NORMALIZE = true
const SCROLLTRIGGER_DEFAULTS: ScrollTrigger.Vars = {}

export {
  Flip,
  gsap,
  ScrollTrigger,
  SCROLLTRIGGER_CONFIG,
  SCROLLTRIGGER_DEFAULTS,
  SCROLLTRIGGER_NORMALIZE,
  SplitText
}
