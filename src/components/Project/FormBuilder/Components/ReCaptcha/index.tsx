import ReacpcthaFieldFragment from '@/lib/fragments/forms/fields/recaptcha'
import { Lib } from '@/types'
import {
  GoogleReCaptchaCheckbox,
  GoogleReCaptchaProvider,
  GoogleReCaptchaProviderProps
} from '@google-recaptcha/react'

interface ReCaptchaProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Lib.FragmentOf<typeof ReacpcthaFieldFragment>
}

const ReCaptcha = ({ ...props }: ReCaptchaProps) => {
  const { data, className, ...rest } = props

  const version: GoogleReCaptchaProviderProps['type'] = (() => {
    if (data.version === 'v3') return 'v3'
    else {
      return data.invisible ? 'v2-invisible' : 'v2-checkbox'
    }
  })()

  return (
    <div className={className} {...rest}>
      <GoogleReCaptchaProvider type={version} siteKey={data.siteKey}>
        {version === 'v2-checkbox' && <GoogleReCaptchaCheckbox />}
      </GoogleReCaptchaProvider>
    </div>
  )
}

export default ReCaptcha
