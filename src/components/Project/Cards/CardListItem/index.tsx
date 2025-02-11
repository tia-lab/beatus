'use client'

import Arrow from '$/public/icons/arrow/arrow.svg'
import { DUR, EASE } from '@/animations/vars'
import { Image, Link } from '@/components/Core'
import { LinkProps } from '@/components/Core/types'
import { useGSAPMedia } from '@/hooks'
import { PageCardPreviewFragment } from '@/lib/fragments'
import { Lib } from '@/types'
import { COLORS, MEDIA } from '@config'
import { gsap } from '@gsap'
import clsx from 'clsx'
import { memo, useEffect, useRef, useState } from 'react'
import $ from './style.module.scss'
export interface CardListItemProps extends Omit<LinkProps, 'data'> {
  data: Lib.FragmentOf<typeof PageCardPreviewFragment>
  variant?: 'default' | 'image'
}

const CardListItem = ({
  data,
  variant,

  className,
  ...props
}: CardListItemProps) => {
  const comp = useRef<any>(null)
  const content = useRef<any>(null)
  const tl = useRef<GSAPTimeline | null>(null)

  const [isHover, setIsHover] = useState(false)

  //hooks

  useGSAPMedia({
    media: MEDIA,
    scope: comp,
    type: 'effect',
    callback: (c) => {
      if (!c?.conditions?.desktop) return
      const icon = '[data-icon]'
      const iconInner = '[data-icon-inner]'

      gsap.set(icon, { xPercent: -100 })
      gsap.set(iconInner, { x: '-1.5rem' })

      tl.current = gsap.timeline({
        paused: true,
        defaults: { duration: DUR.default, ease: EASE.out }
      })
      tl.current
        .to(icon, { xPercent: 0, stagger: 0.1 })
        .to(iconInner, { x: '1.5rem' }, '<+=0.25')

      variant === 'default' &&
        tl.current
          .to(comp.current, { backgroundColor: COLORS.neutral300 }, 0)
          .to('[data-title-wrap]', { x: '1rem' }, 0)
    }
  })

  useEffect(() => {
    if (!tl.current) return
    isHover ? tl.current.play() : tl.current.reverse()
  }, [isHover])

  //Composers
  const cardClass = clsx(
    $.card,
    {
      [$.variant_image]: variant === 'image',
      [$.variant_default]: variant === 'default'
    },
    className
  )

  const dataLink = {
    url: {
      _modelApiKey: data._modelApiKey,
      slug: data.slug,
      parent: data.parent
    }
  }

  return (
    // @ts-ignore
    <Link
      ref={comp}
      className={cardClass}
      {...props}
      data={dataLink as any}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      transitionType="slide"
    >
      {variant === 'image' && (
        <Image
          data={data.image}
          wrap={{ className: $.image }}
          sizes={`${MEDIA.tablet} 100vw, 42rem`}
          fitWrap
          ar="16x9"
        />
      )}
      <div className={$.content} ref={content}>
        <div className={$.title_wrap} data-title-wrap>
          <p className="title-h2">{data.pageTitle}</p>
          {data.subtitle && variant === 'default' && (
            <p className="title-h3 text-neutral-400">{data.subtitle}</p>
          )}
        </div>
        <p className={clsx('title-h4', $.text_desktop)}>{data.excerpt}</p>
        <div className={$.icon_wrap}>
          <div className={$.icon} data-icon>
            <div className={$.icon_inner} data-icon-inner>
              <Arrow />
              <Arrow />
            </div>
          </div>
        </div>
      </div>
      <p className={clsx('title-h4', $.text_mobile)}>{data.excerpt}</p>
      <div className={$.divider} />
    </Link>
  )
}

export default memo(CardListItem)
