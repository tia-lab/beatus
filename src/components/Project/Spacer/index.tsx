import SpacerFragment from '@/lib/fragments/spacer'
import { Lib } from '@/types'
import clsx from 'clsx'

interface SpacerProps {
  data: Lib.FragmentOf<typeof SpacerFragment>
}

const Spacer = ({ ...props }: SpacerProps) => {
  const spaceClasses = clsx({
    'h-space-sm': props.data.space === 'sm',
    'h-space-md': props.data.space === 'md',
    'h-space-lg': props.data.space === 'lg',
    'h-space-2xl': props.data.space === 'xl'
  })

  return <div className={spaceClasses} />
}

export default Spacer
