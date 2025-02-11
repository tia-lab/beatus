import { Container, Section } from '@/components/Core'
import { Button } from '@/components/Ui'
import { Lib } from '@/types'
import { readFragment } from 'gql.tada'
import { memo } from 'react'
import { default as SectionAnchorFragment } from './query'
import $ from './style.module.scss'
export interface SectionAnchorProps {
  data: Lib.FragmentOf<typeof SectionAnchorFragment>
}

export type SectionAnchorData = Lib.FragmentOf<typeof SectionAnchorFragment> & {
  _modelApiKey: 'section_anchor_link'
  __typename: 'SectionAnchorLinkRecord'
  id: string
}

const SectionAnchor = ({ data }: SectionAnchorProps) => {
  const d = readFragment(SectionAnchorFragment, data)

  return (
    <Section
      padding={d.sectionPadding}
      className={$.section}
      anim="section-fade-in"
    >
      <Container>
        <div className={$.links}>
          {d.anchorLinks.map((link, index) => (
            <Button
              key={index}
              isNext={false}
              as="div"
              variant="outline"
              className={$.button}
              lenisScroll={{
                target: link.anchorId,
                options: { duration: 2, offset: -150 }
              }}
            >
              {link.text}
            </Button>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export default memo(SectionAnchor)
