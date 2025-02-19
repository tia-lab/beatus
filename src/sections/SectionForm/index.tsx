import { Container, Section } from '@/components/Core'
import { FormBuilder } from '@/components/Project'
import { routing } from '@/i18n/routing'
import { Lib } from '@/types'
import { memo } from 'react'
import SectionFormFragment from './query'
import $ from './style.module.scss'
export interface SectionFormProps {
  data: Lib.FragmentOf<typeof SectionFormFragment>
  params?: {
    locale: (typeof routing.locales)[number]
    slug: string[]
  }
}

const SectionForm = ({ data }: SectionFormProps) => {
  return (
    <Section className={$.section} padding={data.sectionPadding}>
      <Container anim="fade-in">
        <FormBuilder data={data.form} className={$.form} />
      </Container>
    </Section>
  )
}

export default memo(SectionForm)
