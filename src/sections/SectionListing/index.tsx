'use client'

import { DUR, EASE } from '@/animations/vars'
import { BaseLink, Container, Image, Section } from '@/components/Core'
import { useGSAPContext } from '@/hooks'
import { routing } from '@/i18n/routing'
import { getParentSlug } from '@/lib/slugs'
import { Lib } from '@/types'
import { gsap } from '@gsap'
import clsx from 'clsx'
import { readFragment } from 'gql.tada'
import { memo, useRef } from 'react'
import SectionListingFragment from './query'
import $ from './style.module.scss'

export interface SectionListingProps {
  data: Lib.FragmentOf<typeof SectionListingFragment>
  params?: {
    locale: (typeof routing.locales)[number]
    slug: string[]
  }
}

const SectionListing = ({ data }: SectionListingProps) => {
  const d = readFragment(SectionListingFragment, data)
  const comp = useRef<HTMLDivElement>(null)
  const sliderWrapperRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const indexRef = useRef<number>(0)

  const stepsSize = -100 / d.links.length

  const gsapDefaults: GSAPTweenVars = {
    ease: EASE.inOut,
    duration: DUR.default / 2
  }

  useGSAPContext({
    scope: comp,
    deps: [],
    callback: () => {
      gsap.set(sliderRef.current, { autoAlpha: 0, x: 0, y: 0 }) // Start hidden and centered
    }
  })

  const handleMouseEnter = (k: number) => {
    if (indexRef.current !== k) {
      indexRef.current = k
      gsap.to(sliderRef.current, {
        yPercent: stepsSize * k,
        ...gsapDefaults
      })
    }
  }

  const handleContainerHover = (isHovered: boolean) => {
    gsap.to(sliderRef.current, {
      autoAlpha: isHovered ? 1 : 0,
      duration: DUR.default / 2,
      ease: EASE.inOut
    })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return

    const { clientX, clientY } = e
    const { width, height, left, top } =
      comp.current?.getBoundingClientRect() || {
        width: 0,
        height: 0,
        left: 0,
        top: 0
      }

    // Normalize the cursor position relative to the container
    const xPercent = ((clientX - left) / width - 0.5) * 300 // Adjust intensity
    const yPercent = ((clientY - top) / height - 0.5) * 300 // Adjust intensity

    gsap.to(sliderWrapperRef.current, {
      x: xPercent,
      y: yPercent,
      duration: 0.5,
      ease: 'power3.out'
    })
  }

  return (
    <Section className={$.section} mainWrapper={false} ref={comp}>
      <div className={$.slider} ref={sliderWrapperRef}>
        <div className={$.slider_container} ref={sliderRef}>
          <div className={$.slider_container_overlay} />
          {d.links.map((slide, k) => (
            <Image
              ar="4x3"
              key={k}
              data={slide.image}
              className={$.image}
              fitWrap
              wrap={{
                className: clsx($.image)
              }}
            />
          ))}
        </div>
      </div>
      <div
        className={clsx('main-wrapper', $.main_wrapper)}
        onMouseEnter={() => handleContainerHover(true)}
        onMouseLeave={() => handleContainerHover(false)}
        onMouseMove={handleMouseMove} // ✅ Track cursor
      >
        <Container className={$.container}>
          <div className={$.links}>
            {d.links.map((link, k) => (
              <BaseLink
                key={k}
                href={getParentSlug(link)}
                transitionType="fade"
                className={$.link}
                onMouseEnter={() => handleMouseEnter(k)}
              >
                {link.pageTitle}
              </BaseLink>
            ))}
          </div>
        </Container>
      </div>
    </Section>
  )
}

export default memo(SectionListing)
