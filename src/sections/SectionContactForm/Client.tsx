'use client'

import { Container, Section } from '@/components/Core'
import {
  Button,
  Checkbox,
  SelectField,
  SelectFieldItem,
  TextField
} from '@/components/Ui'
import { ValidationError, useForm } from '@formspree/react'
import {
  GoogleReCaptchaCheckbox,
  GoogleReCaptchaProvider
} from '@google-recaptcha/react'
import { readFragment } from 'gql.tada'
import { useLocale, useTranslations } from 'next-intl'
import { memo } from 'react'
import { SectionContactFormProps } from '.'
import SectionContactFormFragment from './query'
import $ from './style.module.scss'
interface Props extends SectionContactFormProps {
  successMessage?: string | null
  processingMessage?: string | null
  privacyMessage?: string | null
}

const SectionContactFormClient = ({
  data,
  successMessage,
  processingMessage,
  privacyMessage
}: Props) => {
  const d = readFragment(SectionContactFormFragment, data)
  const t = useTranslations()
  const locale = useLocale()

  const [state, handleSubmit] = useForm(
    locale === 'de' ? 'xeoqnrqe' : 'xovqgvek'
  )

  if (state.succeeded || state.submitting) {
    return (
      <Section
        id={d.sectionId || undefined}
        padding={d.sectionPadding}
        className={$.section}
        anim="section-fade-in"
      >
        <Container>
          <div className={$.success_wrap}>
            {state.succeeded && successMessage && (
              <div
                className="rich-text"
                dangerouslySetInnerHTML={{ __html: successMessage }}
              />
            )}
            {state.submitting && processingMessage && (
              <div
                className="rich-text"
                dangerouslySetInnerHTML={{ __html: processingMessage }}
              />
            )}
          </div>
        </Container>
      </Section>
    )
  }
  return (
    <Section
      id={d.sectionId || undefined}
      padding={d.sectionPadding}
      className={$.section}
      anim="section-fade-in"
    >
      <Container>
        <form onSubmit={handleSubmit} className={$.form}>
          <SelectField
            className={$.col_2}
            id="gendre"
            name="gendre"
            description={t('contact_form_anrede')}
            placeholder={t('contact_form_anrede')}
          >
            <SelectFieldItem id={t('contact_form_anrede_men')}>
              {t('contact_form_anrede_men')}
            </SelectFieldItem>
            <SelectFieldItem id={t('contact_form_anrede_woman')}>
              {t('contact_form_anrede_woman')}
            </SelectFieldItem>
            <SelectFieldItem id={t('contact_form_anrede_family')}>
              {t('contact_form_anrede_family')}
            </SelectFieldItem>
          </SelectField>
          <div className={$.col_3}></div>
          <div className={$.col_3}>
            <TextField
              id="firstName"
              name="firstName"
              description={t('contact_form_first_name')}
              placeholder={t('contact_form_first_name')}
              type="text"
              isRequired
            />
            <ValidationError
              prefix={t('contact_form_first_name')}
              field="firstName"
              errors={state.errors}
            />
          </div>
          <div className={$.col_3}>
            <TextField
              id="lastName"
              name="lastName"
              description={t('contact_form_last_name')}
              placeholder={t('contact_form_last_name')}
              type="text"
              isRequired
            />
            <ValidationError
              prefix={t('contact_form_last_name')}
              field="lastName"
              errors={state.errors}
            />
          </div>
          <div className={$.col_3}>
            <TextField
              id="email"
              name="email"
              description={t('contact_form_email')}
              placeholder={t('contact_form_email')}
              type="email"
              isRequired
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
          </div>
          <div className={$.col_3}>
            <TextField
              id="company"
              name="company"
              description={t('contact_form_company')}
              placeholder={t('contact_form_company')}
              type="text"
            />
            <ValidationError
              prefix={t('contact_form_company')}
              field="company"
              errors={state.errors}
            />
          </div>
          <div className={$.col_6}>
            <TextField
              id="message"
              name="message"
              description={t('contact_form_message')}
              placeholder={t('contact_form_message')}
              type="text"
              textarea
              isRequired
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
          </div>
          <div className={$.col_6}>
            <div className={$.privacy}>
              <Checkbox isRequired id="privacy" name="privacy" />
              {privacyMessage && (
                <div
                  className="rich-text"
                  dangerouslySetInnerHTML={{ __html: privacyMessage }}
                />
              )}
            </div>
          </div>
          <div className={$.col_6}>
            <GoogleReCaptchaProvider
              type="v2-checkbox"
              siteKey="6LdTqZgqAAAAAB4Wi9ckZ6uVQPPBWZY2pwXFtGkB"
            >
              <GoogleReCaptchaCheckbox />
            </GoogleReCaptchaProvider>
          </div>
          <div className={$.col_2}>
            <Button
              //@ts-ignore
              type="submit"
              disabled={state.submitting}
              as="button"
              isNext={false}
            >
              {t('contact_form_submit')}
            </Button>
          </div>
        </form>
      </Container>
    </Section>
  )
}

export default memo(SectionContactFormClient)
