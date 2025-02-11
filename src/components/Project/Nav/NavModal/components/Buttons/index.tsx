import clsx from 'clsx'
import { memo } from 'react'
import $ from './style.module.scss'

const Buttons = () => {
  return (
    <div className={$.buttons}>
      <div className={clsx($.button)}>Delete All</div>
      <div className={clsx($.button, $.fill)}>Apply</div>
    </div>
  )
}

export default memo(Buttons)
