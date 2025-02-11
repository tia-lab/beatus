'use client'
import { Container, Section } from '@/components/Core'
import { Lib } from '@/types'
import { readFragment } from 'gql.tada'
import { memo, useEffect, useRef } from 'react'
import SectionNewsletterFormFragment from './query'
import $ from './style.module.scss'

export interface SectionNewsletterFormProps {
  data: Lib.FragmentOf<typeof SectionNewsletterFormFragment>
}

export type SectionNewsletterFormData = Lib.FragmentOf<
  typeof SectionNewsletterFormFragment
> & {
  _modelApiKey: 'section_newsletter_form'
  __typename: 'SectionNewsletterFormRecord'
  id: string
}

const SectionNewsletterForm = ({ data }: SectionNewsletterFormProps) => {
  const d = readFragment(SectionNewsletterFormFragment, data)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Ensure the message comes from the iframe's origin
      if (event.origin !== 'https://skischule.numbirds.com') return

      // Update iframe height if height data is received
      if (event.data && event.data.height && iframeRef.current) {
        iframeRef.current.style.height = `${event.data.height}px`
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
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
        <div className={$.wrap}>
          <iframe
            ref={iframeRef}
            src="https://skischule.numbirds.com/newsletter-anmeldung?agency=68"
            title="Newsletter Signup Form"
            style={{
              width: '100%',
              border: 'none',
              height: '600px' // Default height before dynamic adjustment
            }}
            allow="fullscreen"
          ></iframe>
        </div>
      </Container>
    </Section>
  )
}

export default memo(SectionNewsletterForm)
