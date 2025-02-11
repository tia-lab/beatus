import localFont from 'next/font/local'

export const fontPrimary = localFont({
  src: [
    {
      path: './fonts/SaansBold.woff2',
      weight: '700',
      style: 'normal'
    },
    {
      path: './fonts/SaansRegular.woff2',
      weight: '400',
      style: 'normal'
    }
  ],
  variable: '--font-primary'
})

export const fontSecondary = localFont({
  src: [
    {
      path: './fonts/din.woff2',
      weight: '700',
      style: 'normal'
    }
  ],
  variable: '--font-secondary'
})

const fonts = {
  primary: fontPrimary,
  secondary: fontSecondary
}

export default fonts
