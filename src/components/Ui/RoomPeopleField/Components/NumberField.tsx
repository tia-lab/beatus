import clsx from 'clsx'
import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import {
  NumberField as AriaNumberField,
  NumberFieldProps as AriaNumberFieldProps,
  Button,
  Group,
  Input,
  Label
} from 'react-aria-components'
import $ from '../style.module.scss'

interface NumberFieldProps extends AriaNumberFieldProps {
  label?: string
}

const NumberField = ({
  onChange,
  className,
  label,
  ...props
}: NumberFieldProps) => {
  const [_value, _setValue] = useState<number>()

  return (
    <AriaNumberField
      defaultValue={props.defaultValue !== undefined ? props.defaultValue : 0}
      minValue={props.minValue || 0}
      onChange={(value) => {
        _setValue(value)
        onChange && onChange(value)
      }}
      className={clsx($.number_field, className)}
    >
      {label && <Label className={$.label}>{label}</Label>}
      <Group className={$.group}>
        <Button slot="decrement" className={$.button}>
          <Minus width="100%" height="100%" />
        </Button>
        <Input className={$.input} />
        <Button slot="increment" className={$.button}>
          <Plus width="100%" height="100%" />
        </Button>
      </Group>
    </AriaNumberField>
  )
}

export default NumberField
