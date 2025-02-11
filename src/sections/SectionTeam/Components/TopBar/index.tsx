'use client'

import { Modal } from '@/components/Layout'
import { Accordion, AccordionItem, Button, Checkbox } from '@/components/Ui'
import { useStoreTeam } from '@/store'
import { Lib } from '@/types'
import { URL } from '@config'
import { ScrollTrigger, gsap } from '@gsap'
import { useLocale, useTranslations } from 'next-intl'
import { memo, useEffect, useState } from 'react'
import { TeamMember } from '../..'
import { queryCategories } from '../../query'
import $ from '../../style.module.scss'
interface TopBarProps {
  teams: TeamMember
  categories: Lib.ResultOf<typeof queryCategories>
  loading: boolean
}

const TopBar = ({ teams, categories, loading }: TopBarProps) => {
  const translations = useTranslations()
  const { filters, setFilters, resetFilters, generateFetchUrl } = useStoreTeam()
  const locale = useLocale()
  const [isOpen, setIsOpen] = useState(false)

  // State to track the filters that are currently applied
  const [appliedFilters, setAppliedFilters] = useState(filters)

  // Calculate if there are filters pending application
  const hasPendingFilters =
    JSON.stringify(filters) !== JSON.stringify(appliedFilters)

  const handleCheckboxChange = (
    category: keyof typeof filters,
    value: string
  ) => {
    setFilters({
      [category]: filters[category].includes(value)
        ? filters[category].filter((v) => v !== value) // Remove filter
        : [...filters[category], value] // Add filter
    })
  }

  const handleApplyFilters = () => {
    generateFetchUrl(URL, locale) // Generate updated URL with current filters
    setAppliedFilters(filters) // Update applied filters
    setIsOpen(false) // Close modal
  }

  const handleResetFilters = () => {
    resetFilters(URL, locale) // Reset all filters and fetch full dataset
    setIsOpen(false) // Close modal
    setAppliedFilters({
      departements: [],
      disciplines: [],
      languages: [],
      nationalities: []
    }) // Reset applied filters
  }

  // Calculate the total number of applied filters
  const totalFiltersApplied = Object.values(filters).reduce(
    (total, current) => total + current.length,
    0
  )

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
  }, [])

  useEffect(() => {
    ScrollTrigger.refresh()
  }, [filters])

  return (
    <>
      <div className={$.top_bar}>
        <p>
          <span className="font-weight-700">{teams.length} </span>
          <span className="font-weight-700">
            {translations('team_topbar_worker')}
          </span>
          <span> </span>
          <span>{translations('team_topbar_worker_found')}</span>
        </p>
        <Button
          icon="lucide:filter"
          isNext={false}
          as="div"
          onClick={() => setIsOpen(true)}
        >
          {`${translations('team_topbar_filter_buttom')}${totalFiltersApplied ? ` ( ${totalFiltersApplied} )` : ''}`}
        </Button>
      </div>
      <Modal
        openState={isOpen}
        setOpenState={setIsOpen}
        title={translations('team_topbar_filter_buttom')}
        bottom={
          <div className={$.modal_bottom}>
            <Button
              variant="ghost"
              isNext={false}
              aria-label="Reset filters"
              as="div"
              onClick={handleResetFilters}
            >
              {translations('filter_button_delete')}
            </Button>
            <div className={$.button_apply} data-pending={hasPendingFilters}>
              <Button isNext={false} as="div" onClick={handleApplyFilters}>
                {`${translations('filter_button_apply')}${totalFiltersApplied ? ` ( ${totalFiltersApplied} )` : ''}`}
              </Button>
            </div>
          </div>
        }
        content={
          <Accordion allowMultiple defaultOpenIndexes={[1]}>
            <AccordionItem
              key={1}
              index={1}
              title={translations('team_card_departement')}
            >
              <div className={$.modal_cehckboxes}>
                {categories.allTeamDepartments.map((category, i) => (
                  <Checkbox
                    key={i}
                    isSelected={filters.departements.includes(category.id)}
                    onChange={() =>
                      handleCheckboxChange('departements', category.id)
                    }
                  >
                    {category.title}
                  </Checkbox>
                ))}
              </div>
            </AccordionItem>

            <AccordionItem
              key={3}
              index={3}
              title={translations('team_card_discipline')}
            >
              <div className={$.modal_cehckboxes}>
                {categories.allTeamDisciplines.map((category, i) => (
                  <Checkbox
                    key={i}
                    isSelected={filters.disciplines.includes(category.id)}
                    onChange={() =>
                      handleCheckboxChange('disciplines', category.id)
                    }
                  >
                    {category.title}
                  </Checkbox>
                ))}
              </div>
            </AccordionItem>
            <AccordionItem
              key={4}
              index={4}
              title={translations('team_card_language')}
            >
              <div className={$.modal_cehckboxes}>
                {categories.allTeamLanguages.map((category, i) => (
                  <Checkbox
                    key={i}
                    isSelected={filters.languages.includes(category.id)}
                    onChange={() =>
                      handleCheckboxChange('languages', category.id)
                    }
                  >
                    {category.language}
                  </Checkbox>
                ))}
              </div>
            </AccordionItem>
          </Accordion>
        }
      />
      {teams.length === 0 && !loading && (
        <div className={$.not_found}>
          <p className="title-h3">{translations('items_not_found_title')}</p>
          <p className="text-large">{translations('items_not_found_text')}</p>
          <Button
            isNext={false}
            as="div"
            aria-label="Reset filters"
            onClick={handleResetFilters}
          >
            {translations('items_not_found_button')}
          </Button>
        </div>
      )}
    </>
  )
}

export default memo(TopBar)
