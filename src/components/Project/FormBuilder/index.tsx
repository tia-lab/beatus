'use client'

import { Parse, Redirect } from '@/components/Core'
import {
  Button,
  Checkbox,
  Radio,
  RadioGroup,
  SelectField,
  SelectFieldItem,
  TextField
} from '@/components/Ui'
import FormFragment from '@/lib/fragments/forms/form'
import { useStoreTransition } from '@/store'
import { Lib } from '@/types'
import { useForm } from '@formspree/react'
import clsx from 'clsx'
import React, { useMemo } from 'react'
import $ from './style.module.scss'
interface FormBuilderProps extends React.HTMLAttributes<HTMLFormElement> {
  data: Lib.FragmentOf<typeof FormFragment>
  messagesClassName?: string
}

const FormBuilder = ({ ...props }: FormBuilderProps) => {
  const { data, className, messagesClassName, ...rest } = props
  const { formBuilder } = data
  const [state, handleSubmit] = useForm(data.formspreeId)

  const setIsTransitionOut = useStoreTransition.use.setIsTransitionOut()
  const setTranistionType = useStoreTransition.use.setTransitionType()

  const renderedForm = useMemo(() => {
    if (!formBuilder || !formBuilder.length) return null
    return formBuilder.map((field, k) => {
      switch (field.__typename) {
        case 'TextFieldRecord':
          return (
            <TextField
              id={field.fieldId}
              name={field.fieldId}
              key={k}
              placeholder={field.placeholder || undefined}
              label={field.label}
              isRequired={field.required}
              textarea={field.variant === 'text-area'}
              type={field.variant === 'email' ? 'email' : 'text'}
              className={clsx($.field, field.halfSize && $.half)}
            />
          )
        case 'FormFieldSelectRecord':
          return (
            <SelectField
              isRequired={field.required}
              name={field.fieldId}
              id={field.fieldId}
              key={k}
              label={field.label}
              placeholder={field.placeholder || undefined}
              selectFieldClassName={clsx($.field, field.halfSize && $.half)}
            >
              {field.items.map((item) => (
                <SelectFieldItem id={item.value} key={item.value}>
                  {item.title}
                </SelectFieldItem>
              ))}
            </SelectField>
          )
        case 'FormFieldRadioGroupRecord':
          return (
            <RadioGroup
              key={k}
              {...field}
              isRequired={field.required}
              className={clsx($.field, field.halfSize && $.half)}
              name={field.fieldId}
              label={field.label}
            >
              {field.items.map((item) => (
                <Radio key={item.value} id={item.value} value={item.value}>
                  {item.title}
                </Radio>
              ))}
            </RadioGroup>
          )
        case 'FormFieldSepratorRecord':
          return (
            <div
              key={k}
              className={clsx($.separator, field.halfSize && $.half)}
            />
          )
        case 'FormFieldCheckboxRecord':
          return (
            <Checkbox
              key={k}
              id={field.fieldId}
              name={field.fieldId}
              isRequired={field.required}
              className={clsx($.field, field.halfSize && $.half)}
              isSelected={field.checked}
            >
              <Parse html={field.label} />
            </Checkbox>
          )
        case 'FormFieldSubmitRecord':
          return (
            <Button
              key={k}
              type="submit"
              as="button"
              disabled={state.submitting}
              isNext={false}
              className={$.button}
            >
              {field.buttonText}
            </Button>
          )

        default:
          return null
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formBuilder])

  if (state.succeeded && data.redirect) {
    setTranistionType('fade')
    setIsTransitionOut(true)
    return <Redirect data={data.redirectLink} />
  }

  if ((state.succeeded && !data.redirect) || state.submitting) {
    return (
      <div className={clsx($.form_messages, messagesClassName)}>
        {state.succeeded ? (
          <Parse html={data.successMessage} />
        ) : (
          <Parse html={data.pendingMessage} />
        )}
      </div>
    )
  }

  return (
    <form className={clsx($.form, className)} onSubmit={handleSubmit} {...rest}>
      {renderedForm}
    </form>
  )
}

export default FormBuilder
