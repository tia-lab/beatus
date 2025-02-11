import { Container, Div, Image, Section } from '@/components/Core'
import { Lib } from '@/types'
import clsx from 'clsx'
import { readFragment } from 'gql.tada'
import { memo } from 'react'
import SectionPartnersFragment from './query'
import $ from './style.module.scss'

export interface SectionPartnersProps {
  data: Lib.FragmentOf<typeof SectionPartnersFragment>
}

export type SectionPartnersData = Lib.FragmentOf<
  typeof SectionPartnersFragment
> & {
  _modelApiKey: 'section_partner'
  __typename: 'SectionPartnerRecord'
  id: string
}

const SectionPartners = ({ data }: SectionPartnersProps) => {
  const d = readFragment(SectionPartnersFragment, data)

  return (
    <Section
      id={d.sectionId || undefined}
      padding={d.sectionPadding}
      className={$.section}
      anim="section-fade-in"
    >
      <Container>
        <h3 className={$.title}>{d.title}</h3>
        <div className={$.partners}>
          {d?.partners.map((partner, index) => (
            <Div
              as={partner.link ? 'a' : 'div'}
              className={clsx($.partner, partner.link && $.partner_link)}
              key={index}
              // @ts-ignore
              href={partner.link || undefined}
              target={partner.link ? '_blank' : undefined}
            >
              <Image
                isClient
                data={partner.image}
                imgClassName={$.partner_logo}
              />
            </Div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export default memo(SectionPartners)
