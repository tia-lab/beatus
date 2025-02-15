import { DataContextProvider } from '@/components/Context'
import { StoreRoutes } from '@/components/Core'
import { Lenis, Preload, TransitionOut } from '@/components/Layout'
import Cursor from '@/components/Layout/Cursor'
import {
  BookingModal,
  Footer,
  Header,
  Nav,
  Privacy
} from '@/components/Project'
import { routing } from '@/i18n/routing'
import fonts from '@/lib/fonts'
import { TagFragment } from '@/lib/fragments'
import { executeQuery, graphql } from '@/lib/query'
import '@/styles/globals.scss'
import { I18N, Locale, USE } from '@config'
import clsx from 'clsx'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { toNextMetadata } from 'react-datocms'
import queryLayout from './query'

export interface LayoutProps {
  children: React.ReactNode
  params: {
    locale: Locale
  }
}

const query = graphql(
  /* GraphQL */ `
    query query {
      _site {
        faviconMetaTags {
          ...TagFragment
        }
      }
    }
  `,
  [TagFragment]
)

export async function generateMetadata() {
  const { isEnabled: isDraftModeEnabled } = draftMode()
  const data = await executeQuery(query, { includeDrafts: isDraftModeEnabled })
  return toNextMetadata(data._site.faviconMetaTags)
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function RootLayout({ children, params }: LayoutProps) {
  if (!routing.locales.includes(params.locale as any)) {
    notFound()
  }

  const { layout } = await executeQuery(queryLayout, {
    variables: {
      locale: params.locale,
      fallbackLocales: I18N.fallbackLocales as any
    }
  })

  setRequestLocale(params.locale)

  const messages = await getMessages()

  return (
    <html lang={params.locale}>
      <body
        className={clsx(
          fonts.primary.variable,
          fonts.secondary.variable,
          fonts.third.variable
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <DataContextProvider>
            <Lenis>
              <Preload data={layout}>
                <Header data={layout} />
                <div className="page-wrapper" data-main>
                  <main>{children}</main>
                  <Footer data={layout} />
                </div>
              </Preload>
            </Lenis>
            <Cursor />
            <StoreRoutes />
            <Nav data={layout} />
            <BookingModal />
            <TransitionOut />
          </DataContextProvider>
        </NextIntlClientProvider>
        {USE.privacy && <Privacy />}
      </body>
    </html>
  )
}
