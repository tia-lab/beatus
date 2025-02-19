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
  defaultValue?: string // Support uncontrolled mode
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
      errorMessage,
      textarea,
      placeholder,
      iconLeading,
      className,
      iconTrailing,
      isRequired,
      type,
      value: controlledValue, // Controlled mode
      defaultValue, // Uncontrolled mode
      onChange, // Change handler for controlled mode
      ...props
    },
    ref
  ) => {
    // Refs
    const comp = useRef<any>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    // Determine controlled or uncontrolled behavior
    const isControlled = controlledValue !== undefined

    // States (for uncontrolled mode only)
    const [internalValue, setInternalValue] = useState<string>(
      defaultValue || ''
    )
    const [focused, setFocused] = useState<boolean>(false)

    // Unified change handler
    const handleChange = (newValue: string) => {
      if (isControlled) {
        onChange?.(newValue) // External state updates
      } else {
        setInternalValue(newValue) // Internal state update
      }
    }

    // API
    useImperativeHandle(ref, () => ({
      comp: comp.current,
      value: isControlled ? controlledValue! : internalValue,
      setValue: (newValue: string) => handleChange(newValue)
    }))

    // Dynamic height adjustment for TextArea
    const handleTextareaInput = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto' // Reset height
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px` // Adjust to content
      }
    }

    // Composers
    const textFieldClass = clsx(
      $.text_field,
      {
        [$.focused]: focused,
        [$.has_value]:
          (isControlled ? controlledValue : internalValue).length > 0
      },
      className
    )

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
        onChange={handleChange}
        className={textFieldClass}
        onFocusChange={setFocused}
        value={isControlled ? controlledValue : internalValue}
        type={type}
        isRequired={isRequired}
      >
        <div className={inputWrapClass}>
          {iconLeading && <Icon icon={iconLeading} />}
          <div className={$.input_container}>
            <Label
              className={$.label}
            >{`${label}${isRequired ? ' *' : ''}`}</Label>
            {textarea ? (
              <TextArea
                ref={textareaRef}
                className={inputClass}
                placeholder={placeholder}
                onInput={handleTextareaInput}
              />
            ) : (
              <Input
                className={inputClass}
                placeholder={placeholder}
                value={isControlled ? controlledValue : internalValue}
                onChange={(e) => handleChange(e.target.value)}
              />
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
