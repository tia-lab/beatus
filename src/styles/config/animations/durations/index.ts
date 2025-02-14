import SCSSVars from '../../types'

export const durationsVars = {
  duration: {
    golden: '1.618s',
    base: `${1 / 1.618}s`,
    fast: `${1.618 / 2.5}s`
  }
}

export const durations: SCSSVars = [durationsVars, []]
