import clsx from 'clsx'
import { readFragment } from 'gql.tada'
import React, { HtmlHTMLAttributes } from 'react'
import { SectionHeroProps } from '../..'
import SectionHeroFragment from '../../query'
import $ from './style.module.scss'
interface HeroTitleProps extends HtmlHTMLAttributes<HTMLDivElement> {
  data: SectionHeroProps['data']
  variant: 'default' | 'home'
}

const HeroTitle = ({ data, variant, ...props }: HeroTitleProps) => {
  const d = readFragment(SectionHeroFragment, data)

  const titleClasses = clsx(variant === 'home' && 'title-display')

  const highlightText = (text: string) => {
    return text.split(' ').map((word, index) =>
      word.toLowerCase() === 'red' ? (
        <span key={index} className="text-primary-300">
          {word}
        </span>
      ) : (
        <React.Fragment key={index}>{word} </React.Fragment>
      )
    )
  }

  return (
    <h1
      className={clsx($.hero_title, variant === 'default' && $.is_default)}
      {...props}
    >
      <span className={clsx(titleClasses, 'text-align-left')}>
        {highlightText(d.title)}
      </span>
      {d?.title2 && (
        <span className={clsx(titleClasses, 'text-align-right')}>
          {highlightText(d.title2)}
        </span>
      )}
      {d?.title3 && (
        <span className={clsx(titleClasses, 'text-align-center')}>
          {highlightText(d.title3)}
        </span>
      )}
    </h1>
  )
}

export default HeroTitle
