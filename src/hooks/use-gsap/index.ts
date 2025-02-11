import { MEDIA } from '@config'
import { gsap } from '@gsap'
import { useEffect, useLayoutEffect, useMemo } from 'react'
import { useIsomorphicLayoutEffect } from 'usehooks-ts'

interface UseGSAPContext {
  type?: 'effect' | 'layout' | 'isomorphic'
  scope?: any
  callback: (_c?: gsap.Context) => void
  deps?: any[]
  cleanup?: () => void
}

interface UseGSAPMedia {
  media: any
  type?: 'effect' | 'layout' | 'isomorphic'
  scope?: any
  callback: (_c?: gsap.Context) => void
  deps?: any[]
}

const useGSAPContext = ({
  callback,
  scope,
  type = 'effect',
  deps = [],
  cleanup
}: UseGSAPContext) => {
  const ctx = useMemo(() => gsap.context(() => {}), [])
  const effectHook =
    type === 'effect'
      ? useEffect
      : type === 'layout'
        ? useLayoutEffect
        : useIsomorphicLayoutEffect
  effectHook(() => {
    ctx.add(() => {
      callback()
    }, scope)

    return () => {
      cleanup && cleanup()
      ctx.revert()
    }
  }, deps)
}

const useGSAPMedia = ({
  callback,
  scope,
  type = 'effect',
  deps = [],
  media = MEDIA
}: UseGSAPMedia) => {
  const effectHook =
    type === 'effect'
      ? useEffect
      : type === 'isomorphic'
        ? useLayoutEffect
        : useIsomorphicLayoutEffect

  effectHook(() => {
    const ctx = gsap.matchMedia()
    ctx.add(
      media,
      (c) => {
        callback(c)
      },
      scope
    )
    return () => ctx.revert()
  }, deps)
}

export { useGSAPContext, useGSAPMedia }
