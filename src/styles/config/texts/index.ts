import { MEDIA } from '@config'
import SCSSVars from '../types'

export const textVars = {
  text: {
    large: { default: '1.5rem', [MEDIA.tablet]: '1.25rem' },
    main: '1rem',
    small: '0.875rem',
    heading: {
      display: { default: '12.5rem', [MEDIA.tablet]: '4.25rem' },
      h1: { default: '8.75rem', [MEDIA.tablet]: '3.25rem' },
      h2: { default: '2.75rem', [MEDIA.tablet]: '1.5rem' },
      h3: { default: '2rem', [MEDIA.tablet]: '1.5rem' },
      h4: { default: '1.75rem', [MEDIA.tablet]: '1.25rem' },
      h5: { default: '1.25rem', [MEDIA.tablet]: '1.125rem' }
    }
  }
}

export const texts: SCSSVars = [textVars, []]
