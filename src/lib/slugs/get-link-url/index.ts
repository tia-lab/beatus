import { LinkFragment, RedirectLinkFragment } from '@/lib/fragments'
import { Lib } from '@/types'
import getParentSlug from '../get-parent-slug'

interface Props {
  data?:
    | Lib.FragmentOf<typeof LinkFragment>
    | Lib.FragmentOf<typeof RedirectLinkFragment>
    | null
}

const isModelApiKeyAvailable = (url: any): url is { _modelApiKey: string } => {
  return '_modelApiKey' in url
}

const getLinkUrl = ({ data }: Props) => {
  if (!data?.url) {
    return null
  } else if (data.isExternal) {
    return data.externalUrl
  }

  const params = 'urlParams' in data ? data.urlParams : ''

  const url = () => {
    if (!isModelApiKeyAvailable(data.url)) return
    switch (data.url?._modelApiKey) {
      case 'page':
        if ('slug' in data.url && 'parent' in data.url) {
          const path = getParentSlug(data.url.parent)
          return `${path}/${data.url?.slug}/${params}`
        }
        break
      case 'room':
        if ('slug' in data.url) {
          return `/rooms/${data.url?.slug}/${params}`
        }
        break
      default:
        return `/${params}`
    }
  }
  return url()
}

export default getLinkUrl
