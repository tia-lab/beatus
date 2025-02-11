'use client'

import { Container } from '@/components/Core'
import { CardTeam } from '@/components/Project'
import { Button } from '@/components/Ui' // Assuming you have a Loader component
import { useStoreTeam } from '@/store'
import { Lib } from '@/types'
import { URL } from '@config'
import { ScrollTrigger, gsap } from '@gsap'
import { useLocale, useTranslations } from 'next-intl'
import { memo, useEffect, useState } from 'react'
import { TeamMember } from '../..'
import TopBar from '../../Components/TopBar'
import SectionTeamFragment, { queryCategories } from '../../query'
import $ from '../../style.module.scss'

interface VariantTeamProps {
  data: Lib.FragmentOf<typeof SectionTeamFragment>
  categories: Lib.ResultOf<typeof queryCategories>
}

const ITEMS_PER_PAGE = 20 // Number of items to show per load

const VariantAllTeam = ({ categories }: VariantTeamProps) => {
  const [teams, setTeams] = useState<TeamMember[]>([])
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE) // Tracks number of visible items
  const [loading, setLoading] = useState(false) // Tracks loading state
  const { fetchUrl, initializeUrl } = useStoreTeam()

  const currentLocale = useLocale() // Dynamically get the locale
  const t = useTranslations()

  // Initialize the fetchUrl on mount, only if it hasn't been set
  useEffect(() => {
    if (!fetchUrl) {
      initializeUrl(URL, currentLocale) // Set initial fetchUrl with locale
    }
  }, [initializeUrl, currentLocale, fetchUrl])

  // Fetch data whenever fetchUrl changes
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const fetchTeams = async () => {
      if (!fetchUrl) return

      setLoading(true) // Start loading
      try {
        const response = await fetch(fetchUrl)
        if (!response.ok) {
          console.error(
            `Failed to fetch: ${response.status} ${response.statusText}`
          )
          return
        }

        const allTeams = await response.json()
        setTeams(allTeams.data)
        setVisibleCount(ITEMS_PER_PAGE) // Reset visible count to initial batch
      } catch (error) {
        console.error('Error fetching teams:', error)
      } finally {
        setLoading(false) // End loading
        ScrollTrigger.refresh() // Refresh ScrollTrigger
      }
    }

    fetchTeams()
  }, [fetchUrl]) // Fetch only when fetchUrl changes

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + ITEMS_PER_PAGE)
  }

  return (
    <Container>
      <TopBar teams={teams as any} categories={categories} loading={loading} />
      {loading ? (
        <div className={$.loaderContainer}>
          <div className={$.loading}>
            <h3>{t('loading')}</h3>
          </div>
        </div>
      ) : (
        <>
          <div className={$.cards}>
            {teams.slice(0, visibleCount).map((team, i) => (
              <CardTeam key={i} data={team as any} />
            ))}
          </div>
          {visibleCount < teams.length && (
            <div className={$.load_more}>
              <Button
                as="div"
                aria-label="load more"
                onClick={handleLoadMore}
                className={$.loadMoreButton}
                isNext={false}
              >
                {t('load_more')}
              </Button>
            </div>
          )}
        </>
      )}
    </Container>
  )
}

export default memo(VariantAllTeam)
