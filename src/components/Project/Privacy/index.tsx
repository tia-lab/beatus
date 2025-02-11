'use client'

import { USE } from '@config'
import Script from 'next/script'

const Privacy = () => {
  if (USE.privacy === false) return null
  return (
    <>
      <div id="infotext" data-lenis-prevent></div>
      <div
        id="kekschecker"
        data-cid="760306124"
        data-key="GTM-57G57FP,GTM-PJZLV3C,GTM-PJZLV3C"
        className="hidden"
        style={{ display: 'none' }}
      ></div>
      <Script
        src="https://legal.spotwerbung.ch/datenschutz/v2/kekschecker.js"
        async
        //strategy="beforeInteractive"
      />
    </>
  )
}

export default Privacy
