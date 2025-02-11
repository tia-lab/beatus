'use client'

import { Icon as IconifyIcon } from '@iconify-icon/react'
import clsx from 'clsx'
import React, { useState } from 'react'
import type {
  ListBoxItemProps,
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
  SelectValue,
  Text
} from 'react-aria-components'
import $ from './style.module.scss'

export interface SelectFieldProps<T extends object>
  extends Omit<SelectProps<T>, 'children'> {
  label?: string
  description?: string
  errorMessage?: string | ((_validation: ValidationResult) => string)
  items?: Iterable<T>
  children: React.ReactNode | ((_item: T) => React.ReactNode)
  iconLeading?: string | React.ReactNode
  iconTrailing?: string | React.ReactNode
  placeholder?: string
}

export function SelectField<T extends object>({
  label,
  description,
  errorMessage,
  items,
  children,
  iconLeading,
  isRequired,
  iconTrailing,
  placeholder,
  ...props
}: SelectFieldProps<T>) {
  const [value, setValue] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  return (
    <Select
      {...props}
      className={$.select_field}
      onSelectionChange={(key) => setValue(String(key))}
      isOpen={open}
      onOpenChange={setOpen}
    >
      <Label className={$.label}>{label}</Label>
      {description && (
        <Text slot="description" className={$.description}>
          {description}
          {isRequired && <span className="text-primary-300">*</span>}
        </Text>
      )}
      <Button className={$.select_trigger}>
        {iconLeading && <Icon icon={iconLeading} />}
        {!value && placeholder && (
          <span className={$.placeholder}>{placeholder}</span>
        )}
        <SelectValue>
          {({ defaultChildren, isPlaceholder }) => {
            return isPlaceholder ? '' : defaultChildren
          }}
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
      <Popover className={$.popover}>
        <ListBox items={items} className={$.listbox}>
          {children}
        </ListBox>
      </Popover>
    </Select>
  )
}

export function SelectFieldItem(props: ListBoxItemProps) {
  return (
    <ListBoxItem
      {...props}
      className={({ isFocused, isSelected }) =>
        clsx($.option, {
          [$.focused]: isFocused,
          [$.selected]: isSelected
        })
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
