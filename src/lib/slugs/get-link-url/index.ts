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
  }
  const url = () => {
    if (!isModelApiKeyAvailable(data.url)) return
    switch (data.url?._modelApiKey) {
      case 'page':
        if ('slug' in data.url && 'parent' in data.url) {
          const path = getParentSlug(data.url.parent)
          return `${path}/${data.url?.slug}`
        }
        break
      default:
        return '/'
    }
  }
  return url()
}

export default getLinkUrl
