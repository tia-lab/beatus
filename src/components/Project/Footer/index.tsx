import Logo from '$/public/beatus/logo/footerlogo.svg'
import { LayoutFragment } from '@/app/[locale]/query'
import { BaseLink, Container, Image, Parse, Section } from '@/components/Core'
import { SectionProps } from '@/components/Core/Section'
import { Button, IconButton } from '@/components/Ui'
import { Lib } from '@/types'
import clsx from 'clsx'
import { getTranslations } from 'next-intl/server'
import $ from './style.module.scss'
export interface FooterProps extends SectionProps {
  data: Lib.FragmentOf<typeof LayoutFragment> | null
}

const Footer = async ({ data, ...props }: FooterProps) => {
  const t = await getTranslations()

  const partnerHighlight = data?.partners && data.partners[0]

  return (
    <>
      <Section as="footer" className={$.footer} {...props} mainWrapper={false}>
        <div className={clsx('main-wrapper')}>
          <Container anim="fade-in">
            <div className={$.logo}>
              <Logo />
            </div>
          </Container>
          <Container anim="fade-in">
            <div className={$.contact}>
              <p className={$.label}>{t('footer_contact')}</p>
              <div className="mb-space-md"></div>
              <div className="rich-text">
                <Parse html={data?.footerContact} />
              </div>
            </div>
            <div className={$.links}>
              <p className={$.label}>{t('footer_links')}</p>
              <div className={$.links_list_wrap}>
                <div className={$.links_list}>
                  {data?.footerLinks.map((link, index) => (
                    <Button
                      key={index}
                      data={link}
                      variant="text"
                      className={$.button}
                      transitionType="fade"
                    />
                  ))}
                </div>
                <div className={$.links_list}>
                  {data?.footerLinksCol2.map((link, index) => (
                    <Button
                      className={$.button}
                      key={index}
                      data={link}
                      variant="text"
                      transitionType="fade"
                    />
                  ))}
                </div>
              </div>
            </div>
          </Container>
          <Container className={$.footer_bottom} anim="fade-in">
            <div className={$.copy}>{`${data?.footerCopyright}`}</div>

            <div className={$.socials}>
              <div className={$.socials_list}>
                {data?.socialLinks.map((link, index) => (
                  <IconButton
                    key={index}
                    target="_blank"
                    href={link.link}
                    isNext={false}
                    icon={link.icon}
                    className={$.social}
                    onImage
                  />
                ))}
              </div>
            </div>
          </Container>
        </div>
      </Section>
      <Section className={$.partners} anim="fade-in">
        <Container>
          <p className={$.label}>Ebenfalls in Familienbesitz</p>
          <div className={$.partner_wrap}>
            <div className={$.partner_highlight}>
              <BaseLink
                className={$.partner_highlight}
                href={partnerHighlight?.link || ''}
                target="_blank"
              >
                <Image
                  data={partnerHighlight?.image}
                  isClient
                  layout="responsive"
                />
              </BaseLink>
            </div>

            <div className={$.partners}>
              {data?.partners.slice(1).map((partner, index) => (
                <BaseLink
                  key={index}
                  className={$.partner}
                  href={partner.link || ''}
                  target="_blank"
                >
                  <Image data={partner.image} />
                </BaseLink>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

export default Footer
