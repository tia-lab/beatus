import localFont from 'next/font/local'

export const fontPrimary = localFont({
  src: [
    {
      path: './fonts/OverusedGrotesk-Roman.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: './fonts/OverusedGrotesk-Italic.woff2',
      weight: '400',
      style: 'italic'
    },
    {
      path: './fonts/OverusedGrotesk-Medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: './fonts/OverusedGrotesk-MediumItalic.woff2',
      weight: '500',
      style: 'italic'
    },

    {
      path: './fonts/OverusedGrotesk-Bold.woff2',
      weight: '800',
      style: 'normal'
    },
    {
      path: './fonts/OverusedGrotesk-BoldItalic.woff2',
      weight: '800',
      style: 'italic'
    }
  ],
  variable: '--font-primary'
})

export const fontSecondary = localFont({
  src: [
    {
      path: './fonts/AdobeGaramondProRegular.woff2',
      weight: '400',
      style: 'normal'
    }
  ],
  variable: '--font-secondary'
})

export const fontThird = localFont({
  src: [
    {
      path: './fonts/England.woff2',
      weight: '400',
      style: 'normal'
    }
  ],
  variable: '--font-third'
})

const fonts = {
  primary: fontPrimary,
  secondary: fontSecondary,
  third: fontThird
}

export default fonts
