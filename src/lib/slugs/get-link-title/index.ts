import { LinkFragment, RedirectLinkFragment } from '@/lib/fragments'
import { Lib } from '@/types'

interface Props {
  data?:
    | Lib.FragmentOf<typeof LinkFragment>
    | Lib.FragmentOf<typeof RedirectLinkFragment>
    | null
}

const isModelApiKeyAvailable = (url: any): url is { _modelApiKey: string } => {
  return '_modelApiKey' in url
}

const getLinkTitle = ({ data }: Props) => {
  if (!data?.url) return undefined
  const title = () => {
    if (!isModelApiKeyAvailable(data.url)) return
    switch (data.url?._modelApiKey) {
      case 'page':
        if ('slug' in data.url && 'parent' in data.url) {
          return data.url?.pageTitle
        }
        break
      case 'room':
        if ('slug' in data.url && 'title' in data.url) {
          return data.url?.title
        }
        break
      default:
        return undefined
    }
  }
  return title()
}

export default getLinkTitle
