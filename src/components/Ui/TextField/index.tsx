'use client'

import { Icon as IconifyIcon } from '@iconify-icon/react'
import clsx from 'clsx'
import React, {
  forwardRef,
  memo,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import type {
  TextFieldProps as AriaTextFieldProps,
  ValidationResult
} from 'react-aria-components'
import {
  TextField as AriaTextField,
  FieldError,
  Input,
  Label,
  Text,
  TextArea
} from 'react-aria-components'
import $ from './style.module.scss'

export interface TextFieldProps extends AriaTextFieldProps {
  textarea?: boolean
  label?: string
  description?: string
  errorMessage?: string | ((_validation: ValidationResult) => string)
  placeholder?: string
  iconLeading?: string | React.ReactNode
  iconTrailing?: string | React.ReactNode
}

export interface TextFieldRefProps {
  comp: AriaTextFieldProps | null
  value: string
  setValue: (_value: string) => void
}

const TextField = forwardRef<TextFieldRefProps, TextFieldProps>(
  (
    {
      label,
      description,
      errorMessage,
      textarea,
      placeholder,
      iconLeading,
      iconTrailing,
      isRequired,
      type,
      ...props
    },
    ref
  ) => {
    // Refs
    const comp = useRef<any>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    // States
    const [value, setValue] = useState<string>('')
    const [focused, setFocused] = useState<boolean>(false)

    // API
    useImperativeHandle(ref, () => ({
      comp: comp.current,
      value: value,
      setValue: (value: string) => setValue(value)
    }))

    // Dynamic height adjustment for TextArea
    const handleTextareaInput = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto' // Reset height
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px` // Adjust to content
      }
    }

    // Composers
    const textFieldClass = clsx($.text_field, {
      [$.focused]: focused,
      [$.has_value]: value.length > 0
    })

    const inputWrapClass = clsx($.input_wrap, {
      [$.input_wrap_textarea]: textarea
    })

    const inputClass = clsx($.input, {
      [$.input_textarea]: textarea
    })

    return (
      <AriaTextField
        {...props}
        ref={comp}
        onChange={setValue}
        className={textFieldClass}
        onFocusChange={setFocused}
        value={value}
        type={type}
        isRequired={isRequired}
      >
        {description && (
          <Text slot="description" className={$.description}>
            {description}
            {isRequired && <span className="text-primary-300">*</span>}
          </Text>
        )}
        <div className={inputWrapClass}>
          {iconLeading && <Icon icon={iconLeading} />}
          <div className={$.input_container}>
            <Label className={$.label}>{label}</Label>
            {textarea ? (
              <TextArea
                ref={textareaRef}
                className={inputClass}
                placeholder={placeholder}
                onInput={handleTextareaInput}
              />
            ) : (
              <Input className={inputClass} placeholder={placeholder} />
            )}
          </div>
          {iconTrailing && <Icon icon={iconTrailing} />}
        </div>

        <FieldError className={$.error}>{errorMessage}</FieldError>
      </AriaTextField>
    )
  }
)
TextField.displayName = 'TextField'

export default memo(TextField)

const Icon = ({ icon }: { icon: string | React.ReactNode }) => {
  if (!icon) return null
  return (
    <div className={$.icon}>
      {typeof icon === 'string' ? (
        <IconifyIcon icon={icon} width="100%" />
      ) : (
        icon
      )}
    </div>
  )
}
