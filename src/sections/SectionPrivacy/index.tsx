'use client'

import { Container, Section } from '@/components/Core'
import { Lib } from '@/types'
import { readFragment } from 'gql.tada'
import SectionPrivacyFragment from './query'
import $ from './style.module.scss'

export interface SectionPrivacyProps {
  data: Lib.FragmentOf<typeof SectionPrivacyFragment>
}

export type SectionPrivacyData = Lib.FragmentOf<
  typeof SectionPrivacyFragment
> & {
  _modelApiKey: 'section_privacy'
  __typename: 'SectionPrivacyRecord'
  id: string
}

import clsx from 'clsx'
import { useEffect } from 'react'

const SectionPrivacy = ({ data }: SectionPrivacyProps) => {
  const d = readFragment(SectionPrivacyFragment, data)

  useEffect(() => {
    const scriptId = 'kekschecker-script'

    // Remove the script if it exists
    const removeExistingScript = () => {
      const existingScript = document.getElementById(scriptId)
      if (existingScript) {
        existingScript.remove()
        /* console.log('Script removed') */
      }
    }

    // Add the script
    const addScript = () => {
      const script = document.createElement('script')
      script.id = scriptId
      script.src = 'https://legal.spotwerbung.ch/datenschutz/v2/kekschecker.js'
      script.async = true
      /* script.onload = () => console.log('Script loaded successfully')
      script.onerror = (e) => console.error('Failed to load the script', e) */
      document.body.appendChild(script)
    }

    // Handle script management
    removeExistingScript()
    addScript()

    // Cleanup when the component unmounts
    return () => {
      removeExistingScript()
    }
  }, [])

  return (
    <Section
      id={d.sectionId || undefined}
      padding={d.sectionPadding}
      className={$.section}
      anim="section-fade-in"
    >
      <Container>
        <div id="disclaimershow" className={clsx($.text, 'rich-text')}></div>
      </Container>
    </Section>
  )
}

export default SectionPrivacy
