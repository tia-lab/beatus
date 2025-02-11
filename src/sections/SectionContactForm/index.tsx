import { executeQuery } from '@/lib/query'
import { Lib } from '@/types'
import { getLocale } from 'next-intl/server'
import { memo } from 'react'
import SectionContactFormClient from './Client'
import SectionContactFormFragment, { queryFormMessage } from './query'
export interface SectionContactFormProps {
  data: Lib.FragmentOf<typeof SectionContactFormFragment>
}

export type SectionContactFormData = Lib.FragmentOf<
  typeof SectionContactFormFragment
> & {
  _modelApiKey: 'section_contact_form'
  __typename: 'SectionContactFormRecord'
  id: string
}

const SectionContactForm = async ({ data }: SectionContactFormProps) => {
  const locale = await getLocale()
  const { setting } = await executeQuery(queryFormMessage, {
    variables: { locale: locale as any }
  })

  return (
    <SectionContactFormClient
      data={data}
      successMessage={setting?.contactFormSuccessMessage}
      processingMessage={setting?.contactFormProcessingMessage}
      privacyMessage={setting?.contactFormPrivacy}
    />
  )
}

export default memo(SectionContactForm)
