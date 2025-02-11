import { RedirectLinkFragment } from '@/lib/fragments'
import { getLinkUrl } from '@/lib/slugs'
import { Lib } from '@/types'
import { readFragment } from 'gql.tada'
import { redirect } from 'next/navigation'

interface RedirectProps {
  data?: Lib.FragmentOf<typeof RedirectLinkFragment> | null
}

const Redirect = ({ data }: RedirectProps) => {
  if (!data) return null
  const d = readFragment(RedirectLinkFragment, data)
  if (!d) return null
  const internalUrl = getLinkUrl({ data: d })
  const externalUrl = d.externalUrl
  const url = d.isExternal ? externalUrl : internalUrl

  url && redirect(url)
}

export default Redirect
