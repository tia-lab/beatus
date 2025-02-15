import { Container, Parse, Section } from '@/components/Core'
import { SectionBuilderProps } from '@/components/Core/SectionBuilder'
import { AccordionItem, Button } from '@/components/Ui'
import { FaqFragment } from '@/lib/fragments'
import { executeQuery, graphql } from '@/lib/query'
import { Lib } from '@/types'
import { Locale } from '@config'
import { readFragment } from 'gql.tada'
import { getLocale } from 'next-intl/server'
import dynamic from 'next/dynamic'
import { memo } from 'react'
import SectionFaqFragment from './query'
import $ from './style.module.scss'

const Accordion = dynamic(
  () => import('@/components/Ui/Accordion/Components/Accordion'),
  { ssr: false }
)

export interface SectionFaqProps {
  data: Lib.FragmentOf<typeof SectionFaqFragment>
  params?: SectionBuilderProps['params']
}

const SectionFaq = async ({ data }: SectionFaqProps) => {
  const d = readFragment(SectionFaqFragment, data)
  const locale = await getLocale()

  const query = graphql(
    `
      query MyQuery($locale: SiteLocale = de, $anyIn: [ItemId]) {
        allFaqs(
          fallbackLocales: de
          locale: $locale
          filter: { category: { anyIn: $anyIn } }
        ) {
          ...FaqFragment
        }
      }
    `,
    [FaqFragment]
  )

  const getFaqs = async () => {
    let faqs = []
    if (d.pickFromCategory) {
      const { allFaqs } = await executeQuery(query, {
        variables: {
          locale: locale as Locale,
          anyIn: d.categories.map((c) => c.id)
        }
      })
      faqs = allFaqs
    } else {
      faqs = d.faqs
    }
    return faqs
  }

  const faqs = await getFaqs()

  const getTitle = () => {
    if (d.useTitleFromCategory) {
      return d.categories.map((c) => c.title).join(', ')
    }
    return d.title
  }

  return (
    <Section
      padding={d.sectionPadding}
      className={$.section}
      anim="section-fade-in"
    >
      <Container>
        <div className={$.title}>
          {getTitle() && (
            <div className="title-h3 text-style-uppercase">{getTitle()}</div>
          )}
        </div>

        <Accordion defaultOpenIndexes={[0]} className={$.accordion}>
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              index={index}
              title={faq.title}
              variant="faq"
              titleClassName={$.accordion_title}
            >
              <div>
                <div className="rich-text">
                  <Parse html={faq.description} />
                </div>
                {faq.button && <Button data={faq.button} variant="text" />}
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Section>
  )
}

export default memo(SectionFaq)
