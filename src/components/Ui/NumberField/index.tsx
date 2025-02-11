'use client'
import { Icon as IconifyIcon } from '@iconify-icon/react'
import clsx from 'clsx'
import { forwardRef, memo, useImperativeHandle, useRef, useState } from 'react'
import {
  Button as AriaButton,
  NumberField as AriaNumberField,
  NumberFieldProps as AriaNumberFieldProps,
  FieldError,
  Group,
  Input,
  Label,
  Text,
  ValidationResult
} from 'react-aria-components'
import IconButton from '../IconButton'
import Iconify from '../Iconify'
import $ from './style.module.scss'

export interface NumberFieldProps extends AriaNumberFieldProps {
  label?: string
  description?: string
  errorMessage?: string | ((_validation: ValidationResult) => string)
  placeholder?: string
  iconLeading?: string | React.ReactNode
}

export interface NumberFieldRefProps {
  comp: NumberFieldProps | null
  value?: number
  setValue: (_value: number) => void
  submitValue?: number
  setSubmitValue: (_value: number) => void
}

const NumberField = forwardRef<NumberFieldRefProps, NumberFieldProps>(
  (
    {
      label,
      description,
      errorMessage,
      placeholder,
      iconLeading,
      isRequired,
      ...props
    },
    ref
  ) => {
    //refs
    const comp = useRef<any>(null)

    //states
    const [value, setValue] = useState<number>()
    const [submitValue, setSubmitValue] = useState<number>()

    const [focused, setFocused] = useState<boolean>(false)

    //Api
    useImperativeHandle(ref, () => ({
      comp: comp.current,
      value,
      setValue,
      submitValue,
      setSubmitValue
    }))

    //Composers
    const numberFieldClass = clsx($.number_field, {
      [$.focused]: focused,
      [$.has_value]: value
    })

    return (
      <AriaNumberField
        {...props}
        ref={comp}
        className={numberFieldClass}
        onFocusChange={setFocused}
        onChange={setValue}
        value={value}
      >
        {description && (
          <Text slot="description" className={$.description}>
            {description}
          </Text>
        )}
        <div className={$.input_wrap}>
          {isRequired && (
            <div className={$.required}>
              <Iconify icon="asterisk" family="lucide" width="100%" />
            </div>
          )}
          {iconLeading && <Icon icon={iconLeading} />}
          <Group>
            <div className={$.input_container}>
              <Label className={$.label}>{label}</Label>
              <Input className={$.input} placeholder={placeholder} />
            </div>
            <div className={$.buttons}>
              <AriaButton className={$.button_action} slot="decrement">
                <IconButton
                  className={clsx($.button_icon, $.decrement)}
                  icon="lucide:minus"
                  size="small"
                />
              </AriaButton>

              <AriaButton className={$.button_action} slot="increment">
                <IconButton
                  className={clsx($.button_icon, $.increment)}
                  icon="lucide:plus"
                  size="small"
                />
              </AriaButton>
            </div>
          </Group>
        </div>

        <FieldError className={$.error}>{errorMessage}</FieldError>
      </AriaNumberField>
    )
  }
)

NumberField.displayName = 'NumberField'

export default memo(NumberField)

const Icon = ({ icon }: { icon: string | React.ReactNode }) => {
  if (!icon) return null
  return (
    icon && (
      <div className={$.icon}>
        {typeof icon === 'string' ? (
          <IconifyIcon icon={icon} width="100%" />
        ) : (
          icon
        )}
      </div>
    )
  )
}
