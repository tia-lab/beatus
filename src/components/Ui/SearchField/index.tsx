'use client'
import { Icon as IconifyIcon } from '@iconify-icon/react'
import clsx from 'clsx'
import { forwardRef, memo, useImperativeHandle, useRef, useState } from 'react'
import {
  Button as AriaButton,
  SearchField as AriaSearchField,
  SearchFieldProps as AriaSearchFieldProps,
  FieldError,
  Input,
  Label,
  Text,
  ValidationResult
} from 'react-aria-components'
import IconButton from '../IconButton'
import $ from './style.module.scss'

export interface SearchFieldProps extends AriaSearchFieldProps {
  label?: string
  description?: string
  errorMessage?: string | ((_validation: ValidationResult) => string)
  placeholder?: string
  iconLeading?: string | React.ReactNode
}

export interface SearchFieldRefProps {
  comp: SearchFieldProps | null
  value: string
  setValue: (_value: string) => void
  submitValue: string
  setSubmitValue: (_value: string) => void
}

const SearchField = forwardRef<SearchFieldRefProps, SearchFieldProps>(
  (
    { label, description, errorMessage, placeholder, iconLeading, ...props },
    ref
  ) => {
    //refs
    const comp = useRef<any>(null)

    //states
    const [value, setValue] = useState<string>('')
    const [submitValue, setSubmitValue] = useState<string>('')

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
    const searchFieldClass = clsx($.search_field, {
      [$.focused]: focused,
      [$.has_value]: value.length > 0
    })

    return (
      <AriaSearchField
        {...props}
        ref={comp}
        className={searchFieldClass}
        onChange={setValue}
        onClear={() => setValue('')}
        onSubmit={setSubmitValue}
        onFocusChange={setFocused}
        value={value}
      >
        {description && (
          <Text slot="description" className={$.description}>
            {description}
          </Text>
        )}
        <div className={$.input_wrap}>
          {iconLeading && <Icon icon={iconLeading} />}
          <div className={$.input_container}>
            <Label className={$.label}>{label}</Label>
            <Input className={$.input} placeholder={placeholder} />
          </div>

          <AriaButton className={$.button_cancel}>
            <IconButton
              className={$.button_icon}
              icon="lucide:x"
              size="small"
              variant="outline"
              iconAnimation="rotate"
            />
          </AriaButton>
        </div>

        <FieldError className={$.error}>{errorMessage}</FieldError>
      </AriaSearchField>
    )
  }
)

SearchField.displayName = 'SearchField'

export default memo(SearchField)

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
