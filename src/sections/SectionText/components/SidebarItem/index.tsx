import { Button } from '@/components/Ui'
import { SectionTextSideBlockFragment } from '@/lib/fragments'
import { Lib } from '@/types'
import $ from './style.module.scss'
interface SidebarItemProps {
  data: Lib.FragmentOf<typeof SectionTextSideBlockFragment> | null
  isDivider?: boolean
}

const SideBarItem = ({ data, isDivider = true }: SidebarItemProps) => {
  if (!data) return null
  return (
    <>
      <div className={$.item}>
        <h3>{data.title}</h3>
        {!data.isContact && <p>{data.text}</p>}
        {!data.isContact && (
          <Button
            data={data.button}
            icon="lucide:shopping-cart"
            iconPosition="left"
          />
        )}
        {data.isContact && (
          <div className={$.contact_buttons}>
            {data.contactPhone && (
              <Button
                href={`tel:${data.contactPhone}`}
                variant="text"
                icon="lucide:phone"
                iconPosition="left"
                iconAnimation="move-right"
              >
                {data.contactPhone}
              </Button>
            )}
            {data.contactEmail && (
              <Button
                href={`mailto:${data.contactEmail}`}
                variant="text"
                icon="lucide:mail"
                iconPosition="left"
                iconAnimation="move-right"
              >
                {data.contactEmail}
              </Button>
            )}
          </div>
        )}
      </div>
      {isDivider && <div className={$.divider} />}
    </>
  )
}

export default SideBarItem
