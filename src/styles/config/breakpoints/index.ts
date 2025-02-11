import { CONFIG } from '@config'
import SCSSVars from '../types'

const breakpointsVars = {
  mobile: `${CONFIG.breakpoints.mobile}px`,
  tablet: `${CONFIG.breakpoints.tablet}px`
}

export const breakpoints: SCSSVars = [breakpointsVars, []]
