import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from './i18n/routing'
import redirects from './lib/redirects'

export async function middleware(request: NextRequest) {
  const getRedirects = await redirects()

  const matchedRedirect = getRedirects.find((redirect: any) =>
    new RegExp(`^${redirect.source}$`).test(request.nextUrl.pathname)
  )

  if (matchedRedirect) {
    // Perform a redirect if there's a match
    return NextResponse.redirect(
      new URL(matchedRedirect.destination, request.url),
      {
        status: matchedRedirect.permanent ? 308 : 307
      }
    )
  }

  // First, let the `next-intl` middleware determine the locale
  const intlMiddleware = createMiddleware(routing)

  const response = intlMiddleware(request)

  // Set the custom `x-locale` header with the current locale
  const locale = response.headers.get('x-middleware-request-x-next-intl-locale')
  response.headers.set('x-locale', locale || 'de')

  // Return the modified response
  return response
}

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(de|it)/:path*',

    // Match only internationalized pathnames, excluding API routes, admin, and static assets
    '/((?!api|admin|_next/static|robots|sitemap|_next/image|sanity-previews|favicon.ico|icon).*)'
  ]
}
