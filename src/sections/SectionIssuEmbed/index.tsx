import { Container, Section } from '@/components/Core'
import { Lib } from '@/types'
import { readFragment } from 'gql.tada'
import { memo } from 'react'
import SectionIssuuFragment from './query'
import $ from './style.module.scss'

export interface SectionIssuuEmbedProps {
  data: Lib.FragmentOf<typeof SectionIssuuFragment>
}

export type SectioIssuuEmbedData = Lib.FragmentOf<
  typeof SectionIssuuFragment
> & {
  _modelApiKey: 'section_issuu'
  __typename: 'SectioIssuuRecord'
  id: string
}

const SectioIssuuEmbed = ({ data }: SectionIssuuEmbedProps) => {
  const d = readFragment(SectionIssuuFragment, data)

  const iframeStyle = {
    position: 'absolute',
    border: 'none',
    width: '100%',
    height: '100%',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
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
            allow="clipboard-write"
            sandbox="allow-top-navigation allow-top-navigation-by-user-activation allow-downloads allow-scripts allow-same-origin allow-popups allow-modals allow-popups-to-escape-sandbox allow-forms"
            allowFullScreen
            style={iframeStyle as any}
            src={d.src as string}
          />
        </div>
      </Container>
    </Section>
  )
}

export default memo(SectioIssuuEmbed)
