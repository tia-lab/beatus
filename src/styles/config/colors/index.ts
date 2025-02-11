import { Env } from '@/types'
import SCSSVars from '../types'

export const colorsVarsBeatus = {
  white: '#fff',
  black: '#000',
  neutral100: '#F6F0EC',
  neutral200: '#E8E2DF',
  neutral300: '#DAD0C9',
  neutral400: '#766A62',
  neutral500: '#29211C',
  neutral600: '#1F130B',
  primary100: '#CCE1E8',
  primary200: '#A8CBD7',
  primary300: '#36606E',
  primary400: '#284853'
}

export const colorsVarsHermitage = {
  white: '#fff',
  black: '#000',
  neutral100: '#F6F0EC',
  neutral200: '#E8E2DF',
  neutral300: '#DAD0C9',
  neutral400: '#766A62',
  neutral500: '#29211C',
  neutral600: '#1F130B',
  primary100: '#E2D4D4',
  primary200: '#CDB7B7',
  primary300: '#6C2A2A',
  primary400: '#562222'
}

const getColors = () => {
  switch (process.env.NEXT_PUBLIC_PROJECT as Env.ProjectEnv) {
    case 'beatus':
      return colorsVarsBeatus
    case 'hermitage':
      return colorsVarsHermitage
    default:
      return colorsVarsBeatus
  }
}

export const colors: SCSSVars = [
  getColors(),
  [{ 'background-color': 'background-color' }, { text: 'color' }]
]
