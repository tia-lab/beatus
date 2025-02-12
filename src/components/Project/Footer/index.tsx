import { LayoutFragment } from '@/app/[locale]/query'
import { Container, Section } from '@/components/Core'
import { SectionProps } from '@/components/Core/Section'
import { Lib } from '@/types'
import clsx from 'clsx'
import { getTranslations } from 'next-intl/server'
import $ from './style.module.scss'
export interface FooterProps extends SectionProps {
  data: Lib.FragmentOf<typeof LayoutFragment> | null
}

const Footer = async ({ data, ...props }: FooterProps) => {
  const t = await getTranslations()
  return (
    <Section as="footer" className={$.footer} {...props} mainWrapper={false}>
      <div className={clsx('main-wrapper')}>
        <Container>footer</Container>
      </div>
    </Section>
  )
}

export default Footer
