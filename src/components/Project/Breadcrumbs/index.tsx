import { Button } from '@/components/Ui'
import { Lib } from '@/types'
import clsx from 'clsx'
import React from 'react'
import queryBreadcrumbs from './query'
import $ from './style.module.scss'

interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  data: Lib.ResultOf<typeof queryBreadcrumbs>['page']
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  data,
  className,
  ...props
}) => {
  // Recursive function to build breadcrumb trail
  const buildBreadcrumb = (
    currentPage: Lib.ResultOf<typeof queryBreadcrumbs>['page'] | null,
    trail: { slug: string; dataTitle: string | null }[] = []
  ): { slug: string; dataTitle: string | null }[] => {
    if (!currentPage) return trail

    // Add the current page to the trail, and process parent recursively
    const newTrail = [
      {
        slug: `/${currentPage.slug}`,
        dataTitle: currentPage.pageTitle
      },
      ...trail
    ]

    return currentPage.parent
      ? //@ts-ignore
        buildBreadcrumb(currentPage.parent, newTrail) // Pass trail up the tree
      : newTrail
  }

  const breadcrumbTrail = buildBreadcrumb(data)

  // Build the full path for each breadcrumb
  let cumulativeSlug = '' // Tracks the cumulative path
  const breadcrumbWithPaths = breadcrumbTrail.map((item) => {
    cumulativeSlug += item.slug // Append the current slug to the cumulative path
    return { ...item, fullPath: `${cumulativeSlug}` } // Prepend the locale
  })

  // Get the direct parent of the current page
  const parentPage =
    breadcrumbWithPaths.length > 1
      ? breadcrumbWithPaths[breadcrumbWithPaths.length - 2]
      : null

  return (
    <nav className={clsx($.breadcrumbs, className)} {...props}>
      {/* Desktop View */}
      {breadcrumbWithPaths.map((item, index) => (
        <Button
          transitionType="slide"
          variant="text"
          icon={index === 0 ? undefined : 'lucide:chevron-left'}
          iconPosition="left"
          key={index}
          href={item.fullPath}
          className={clsx(
            $.desktop,
            index === breadcrumbWithPaths.length - 1 && $.current
          )}
        >
          {item.dataTitle || 'Untitled'} {/* Handle null dataTitle */}
        </Button>
      ))}

      {/* Mobile View */}
      {parentPage && (
        <Button
          transitionType="slide"
          variant="text"
          icon="lucide:chevron-left"
          iconPosition="left"
          href={parentPage.fullPath}
          className={clsx($.mobile)}
        >
          {parentPage.dataTitle || 'Untitled'} {/* Handle null dataTitle */}
        </Button>
      )}
    </nav>
  )
}

export default Breadcrumb
