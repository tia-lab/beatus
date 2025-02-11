'use client'

import clsx from 'clsx'
import { forwardRef, memo, useImperativeHandle, useRef } from 'react'
import $ from './style.module.scss'

export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement> {
  isHeader?: boolean
  isLeftHeader?: boolean
  fullWidth?: boolean
  wrapClasses?: string
  data?: any
}

const Table = forwardRef<HTMLTableElement, TableProps>(
  (
    {
      data,
      isHeader,
      isLeftHeader,
      fullWidth,
      className,
      wrapClasses,
      ...props
    },
    ref
  ) => {
    //Ref
    const comp = useRef<any>(null)

    //API
    useImperativeHandle(ref, () => comp.current as HTMLTableElement)

    //Composers

    const tableClass = clsx(
      $.table,
      { [$.table_fullwidth]: fullWidth },
      className
    )

    const rowClass = clsx($.row, {
      [$.row_fullwidth]: fullWidth
    })

    const cellClass = (i: number, isHeader: boolean) =>
      clsx($.cell, {
        [$.cell_first]: i === 0,
        [$.cell_left_header]: i === 0 && isLeftHeader,
        [$.cell_header]: isHeader
      })

    const processTable = (table?: any) => {
      const header = table?.rows && table?.rows[0] // First row as the header
      const body = table?.rows?.slice(1) // All other rows as body

      return { header, body }
    }

    const { header, body } = processTable(data)

    return (
      <div className={clsx($.wrap, wrapClasses)}>
        <table ref={comp} {...props} className={tableClass}>
          {isHeader && (
            <thead className={$.header}>
              <tr className={rowClass}>
                {header &&
                  header?.cells?.map((cell: any, i: any) => (
                    <th className={cellClass(i, true)} key={i}>
                      {cell}
                    </th>
                  ))}
              </tr>
            </thead>
          )}
          <tbody>
            {isHeader
              ? body?.map((row: any, i: any) => (
                  <tr className={rowClass} key={i}>
                    {row?.cells?.map((cell: any, i: any) => (
                      <td className={cellClass(i, false)} key={i}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))
              : data?.rows?.map((row: any, i: any) => (
                  <tr className={rowClass} key={i}>
                    {row?.cells?.map((cell: any, i: any) => (
                      <td className={cellClass(i, false)} key={i}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    )
  }
)

Table.displayName = 'Table'
export default memo(Table)
