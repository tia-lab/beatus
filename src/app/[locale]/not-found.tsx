import Logo from '$/public/images/logo/LogoHeader.svg'
import { Container, Section } from '@/components/Core'
import { Button } from '@/components/Ui'
import { executeQuery, graphql } from '@/lib/query'
import { Locale } from '@config'
import { getLocale } from 'next-intl/server'
import $ from './not-found.module.scss'

const query = graphql(/* GraphQL */ `
  query MyQuery($locale: SiteLocale = de) {
    setting(fallbackLocales: de, locale: $locale) {
      title404
      text404
      linkText404
    }
  }
`)

export default async function NotFound() {
  const locale = (await getLocale()) as Locale
  const { setting } = await executeQuery(query, { variables: { locale } })
  const d = setting

  return (
    <Section className={$.section} anim="section-fade-in">
      <Container className={$.banner}>
        <div className={$.logo}>
          <Logo />
        </div>
        <h1 className="title-h2">{d?.title404}</h1>
        <div className={$.text}>{d?.text404}</div>
        <Button href={`/${locale}`} className={$.button} transitionType="slide">
          {d?.linkText404}
        </Button>
      </Container>
    </Section>
  )
}
