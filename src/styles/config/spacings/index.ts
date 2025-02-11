import { MEDIA } from '@config'
import SCSSVars from '../types'

export const spacingVars = {
  space: {
    none: '0',
    '2xs': '0.125rem',
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
    '5xl': '8rem'
  }
}

export const sectionSpacingVars = {
  space: {
    section: {
      none: '0',
      sm: '2rem',
      md: '4rem',
      lg: '8rem'
    }
  }
}

export const layoutSpacingVars = {
  base: '16',

  containerGutter: { default: '1.5rem', [MEDIA.tablet]: '1rem' },
  pageWidth: '2200px',
  padding: {
    global: { default: '1.5rem', [MEDIA.tablet]: '1rem' },
    vertical: {
      small: { default: '2rem', [MEDIA.tablet]: '1.5rem' },
      main: '4rem',
      large: '8rem'
    }
  }
}

export const spacings: SCSSVars = [spacingVars, [{ mb: 'margin-bottom' }]]
export const layoutSpacings: SCSSVars = [layoutSpacingVars, []]
export const sectionSpacings: SCSSVars = [
  sectionSpacingVars,
  [{ pt: 'padding-top' }, { pb: 'padding-bottom' }]
]
