import { Container, Section } from '@/components/Core'
import { AccordionItem, Button } from '@/components/Ui'
import { FaqFragment } from '@/lib/fragments'
import { executeQuery, graphql } from '@/lib/query'
import { Lib } from '@/types'
import { Locale } from '@config'
import clsx from 'clsx'
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
}

export type SectionFaqData = Lib.FragmentOf<typeof SectionFaqFragment> & {
  _modelApiKey: 'section_faq'
  __typename: 'SectionFaqRecord'
  id: string
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
          filter: { categories: { anyIn: $anyIn } }
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
      id={d.sectionId || undefined}
      anim="section-fade-in"
    >
      <Container>
        <div className={$.wrap}>
          {getTitle() && (
            <h1 className="title-display text-neutral-100">{getTitle()}</h1>
          )}
          <Accordion defaultOpenIndexes={[0]}>
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                index={index}
                title={faq.title}
                variant="faq"
              >
                <>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: faq.description as string
                    }}
                  ></p>
                  {faq.button && (
                    <Button
                      variant="outline"
                      data={faq.button}
                      transitionType={
                        faq.button.isExternal ? undefined : 'slide'
                      }
                    />
                  )}
                </>
              </AccordionItem>
            ))}
          </Accordion>
          {d.bottomText && (
            <div className={$.bottom}>
              <p className={clsx('title-h4', $.bottomText)}>{d.bottomText}</p>
              {d.bottomButton && (
                <Button
                  data={d.bottomButton}
                  transitionType={
                    d.bottomButton.isExternal ? undefined : 'slide'
                  }
                />
              )}
            </div>
          )}
        </div>
      </Container>
    </Section>
  )
}

export default memo(SectionFaq)
