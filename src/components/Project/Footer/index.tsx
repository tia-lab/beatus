import Logo from '$/public/images/logo/logo_footer.svg'
import { LayoutFragment } from '@/app/[locale]/query'
import { Container, Div, Image, Section } from '@/components/Core'
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
  return (
    <Section as="footer" className={$.footer} {...props} mainWrapper={false}>
      <div className={clsx('main-wrapper', $.footer_wrapper)}>
        <Container>
          <div className={$.footer_wrap}>
            <div className={$.left_box}>
              <div className={$.logo}>
                <Logo />
              </div>
              <p>{data?.footerDescription}</p>
              <Button data={data?.newsletterLink} transitionType="slide" />
            </div>
            <div className={$.right_box}>
              <div className={$.footer_links}>
                {data?.footerLinks.map((link, index) => (
                  <div className={$.footer_link_wrap} key={index}>
                    <Button
                      data={link}
                      variant="text"
                      className={$.footer_link}
                      transitionType={link.isExternal ? undefined : 'slide'}
                    />
                    {index !== data.footerLinks.length - 1 && (
                      <div className={$.link_spacer} />
                    )}
                  </div>
                ))}
              </div>
              <div className={$.footer_contact}>
                <div className={$.footer_contact_list_wrap}>
                  <p className="font-weight-700">
                    {t('footer_contact_address')}
                  </p>
                  <div className={$.footer_contact_list}>
                    <p>{data?.contactAddress}</p>
                    <Button
                      variant="text"
                      href={`tel:${data?.contactPhone}`}
                      className={$.tel}
                    >
                      {data?.contactPhone}
                    </Button>
                    <Button
                      variant="text"
                      href={`mailto:${data?.contactEmail}`}
                      className="text-primary-300 font-weight-400"
                    >
                      {data?.contactEmail}
                    </Button>
                  </div>
                </div>
                <div className={$.socials_links}>
                  {data?.instagramLink && (
                    <IconButton
                      icon="cib:instagram"
                      isNext={false}
                      target="_blank"
                      href={data?.instagramLink as string}
                      aria-label="Instagram"
                      size="large"
                      variant="ghost"
                      className={$.social_icon}
                    />
                  )}
                  {data?.facebookLink && (
                    <IconButton
                      icon="cib:facebook"
                      isNext={false}
                      target="_blank"
                      href={data?.facebookLink as string}
                      size="large"
                      variant="ghost"
                      aria-label="Facebook"
                      className={$.social_icon}
                    />
                  )}
                  {data?.youtubeLink && (
                    <IconButton
                      icon="cib:youtube"
                      isNext={false}
                      target="_blank"
                      href={data?.youtubeLink as string}
                      size="large"
                      variant="ghost"
                      aria-label="Youtube"
                      className={$.social_icon}
                    />
                  )}
                  {data?.viemoLink && (
                    <IconButton
                      icon="cib:vimeo"
                      isNext={false}
                      target="_blank"
                      href={data?.viemoLink as string}
                      size="large"
                      variant="ghost"
                      aria-label="Vimeo"
                      className={$.social_icon}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
        <Container>
          <div className={$.partners}>
            <p className="font-weight-700">{t('footer_partners')}</p>
            <div className={$.partners_logos}>
              {data?.partners.map((partner, index) => (
                <Div
                  aria-label={partner.image.asset.responsiveImage.alt}
                  as={partner.link ? 'a' : 'div'}
                  className={clsx($.partner, partner.link && $.partner_link)}
                  key={index}
                  // @ts-ignore
                  href={partner.link || undefined}
                  target={partner.link ? '_blank' : undefined}
                >
                  <Image
                    isClient
                    data={partner.image}
                    imgClassName={$.partner_logo}
                  />
                </Div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </Section>
  )
}

export default Footer
