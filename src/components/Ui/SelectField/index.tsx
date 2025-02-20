'use client'

import { Icon as IconifyIcon } from '@iconify-icon/react'
import clsx from 'clsx'
import React, { useState } from 'react'
import type {
  ListBoxItemProps as AriaListBoxItemProps,
  SelectProps,
  ValidationResult
} from 'react-aria-components'
import {
  Button,
  FieldError,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue
} from 'react-aria-components'
import $ from './style.module.scss'

export interface SelectFieldProps<T extends object>
  extends Omit<SelectProps<T>, 'children' | 'value' | 'onSelectionChange'> {
  label?: string
  description?: string
  errorMessage?: string | ((_validation: ValidationResult) => string)
  items?: Iterable<T>
  children: React.ReactNode | ((_item: T) => React.ReactNode)
  iconLeading?: string | React.ReactNode
  iconTrailing?: string | React.ReactNode
  placeholder?: string
  popoverClassName?: string
  selectFieldClassName?: string

  uncontrolled?: boolean // ✅ Controlled by default
  value?: string // ✅ Used when controlled
  defaultValue?: string // ✅ Used for initial value in uncontrolled mode
  onChange?: (_value: string) => void // ✅ Controlled change handler
}

export function SelectField<T extends object>({
  uncontrolled = false, // ✅ Controlled by default
  label,
  errorMessage,
  items,
  children,
  iconLeading,
  isRequired,
  iconTrailing,
  placeholder,
  popoverClassName,
  selectFieldClassName,
  value, // ✅ Controlled value
  defaultValue, // ✅ Uncontrolled initial value
  onChange, // ✅ Controlled change handler
  ...props
}: SelectFieldProps<T>) {
  const [internalValue, setInternalValue] = useState<string | null>(
    uncontrolled ? (defaultValue ?? null) : null
  ) // ✅ State for uncontrolled mode

  const [open, setOpen] = useState(false)

  const handleSelection = (v: string | number) => {
    const newValue = String(v)

    if (uncontrolled) {
      setInternalValue(newValue) // ✅ Update internal state in uncontrolled mode
    }

    if (onChange) {
      onChange(newValue) // ✅ Update external state in controlled mode
    }
  }

  return (
    <Select
      {...props}
      className={clsx($.select_field, selectFieldClassName)}
      onSelectionChange={handleSelection}
      isOpen={open}
      onOpenChange={setOpen}
      selectedKey={uncontrolled ? internalValue : value} // ✅ Correct controlled vs uncontrolled behavior
    >
      <Button className={$.select_trigger}>
        {label && (
          <Label
            className={$.label}
          >{`${label}${isRequired ? ' *' : ''}`}</Label>
        )}
        {iconLeading && <Icon icon={iconLeading} />}
        <SelectValue>
          {({ defaultChildren, isPlaceholder }) =>
            isPlaceholder && placeholder ? (
              <span className={$.placeholder}>{placeholder}</span>
            ) : (
              defaultChildren
            )
          }
        </SelectValue>

        <div className={$.icon_trailing}>
          {iconTrailing ? (
            <Icon icon={iconTrailing} />
          ) : (
            <div className={clsx($.icon_state, open && $.is_open)}>
              <IconifyIcon icon="lucide:chevron-down" width="100%" />
            </div>
          )}
        </div>
      </Button>

      <FieldError className={$.error}>{errorMessage}</FieldError>

      <Popover className={clsx($.popover, popoverClassName)}>
        <ListBox items={items} className={$.listbox}>
          {children}
        </ListBox>
      </Popover>
    </Select>
  )
}

interface ListBoxItemProps extends AriaListBoxItemProps {
  inert?: boolean
}

export function SelectFieldItem({ className, ...props }: ListBoxItemProps) {
  return (
    <ListBoxItem
      {...props}
      className={({ isFocused, isSelected }) =>
        clsx(
          $.option,
          {
            [$.focused]: isFocused,
            [$.selected]: isSelected
          },
          className
        )
      }
    />
  )
}

export function Icon({ icon }: { icon: string | React.ReactNode }) {
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
