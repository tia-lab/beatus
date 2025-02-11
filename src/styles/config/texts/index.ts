import { MEDIA } from '@config'
import SCSSVars from '../types'

export const textVars = {
  text: {
    large: { default: '1.5rem', [MEDIA.tablet]: '1.5rem' },
    main: '1rem',
    small: '0.875rem',
    heading: {
      display: { default: '6rem', [MEDIA.tablet]: '2.75rem' },
      h1: { default: '6rem', [MEDIA.tablet]: '2.75rem' },
      h2: { default: '5rem', [MEDIA.tablet]: '2.5rem' },
      h3: { default: '4rem', [MEDIA.tablet]: '2rem' },
      h4: { default: '2.25rem', [MEDIA.tablet]: '1.75rem' },
      h5: { default: '1.5rem', [MEDIA.tablet]: '1.5rem' }
    }
  }
}

export const texts: SCSSVars = [textVars, []]
