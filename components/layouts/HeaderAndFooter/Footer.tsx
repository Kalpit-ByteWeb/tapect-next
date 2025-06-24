'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../../../libs/Index';
import {
  fetchCTAdata,
  fetchFooterNavLinksdata,
  fetchSocailMediadata,
} from '@/components/api/ContentAPI';
import ShimmerCartPage from '@/components/layouts/Shimmar/ShimmerHomePage';
import DomainSwitcher from './DomainSwitcher';

const Footer = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ctaData, setCTAdata] = useState<any>({});
  const [navLinksData, setNavLinksData] = useState<any>({
    FooterNavLinks: [],
  });
  const [socialMediaData, setSocialMediaData] = useState<any>({
    SocailMedia: [],
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [CTAresponse, NavLinksResponse, SocialMediaResponse] =
          await Promise.all([
            fetchCTAdata(),
            fetchFooterNavLinksdata(),
            fetchSocailMediadata(),
          ]);

        setCTAdata(CTAresponse.data);
        setNavLinksData(NavLinksResponse.data);
        setSocialMediaData(SocialMediaResponse.data);
      } catch (err) {
        setError('An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const beforeFooter = useMemo(() => {
    if (
      !ctaData.CTATitle ||
      !ctaData.CTAImage?.url ||
      !ctaData.CTASubtitle ||
      !ctaData.CTADescription ||
      !ctaData.CTAButtonTitle ||
      !ctaData.CTAButtonURL
    )
      return null;

    return (
      <section className="flex justify-between flex-col 2xl:w-[1280px] mx-auto lg:flex-row bg-[#260063] gap-8 px-6 md:px-12 pt-[14px] mb-12 rounded-20 items-center text-center lg:text-left">
        <div className="lg:w-[35%]">
          <h2 className="TitleHeading">{ctaData.CTATitle}</h2>
        </div>
        <div>
          <Image
            src={ctaData.CTAImage.url}
            alt={ctaData.CTAImage.alternativeText ?? 'CTA Image'}
            width={300}
            height={200}
            className="w-full h-auto"
          />
        </div>
        <div className="space-y-6 mb-6">
          <div className="space-y-4">
            <h2 className="Heading-20 mb-2">{ctaData.CTASubtitle}</h2>
            <p className="text-sm leading-30 font-secondary font-medium mb-1">
              {ctaData.CTADescription}
            </p>
          </div>
          <Button type="button">
            <a href={ctaData.CTAButtonURL} className="btn-primary px-8 py-4">
              {ctaData.CTAButtonTitle}
            </a>
          </Button>
        </div>
      </section>
    );
  }, [ctaData]);

  const getDescriptionText = (description: any) => {
    return description?.[0]?.children?.[0]?.text ?? '';
  };

  const footerContent = useMemo(() => {
    return (
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-3 lg:flex lg:justify-between gap-8">
        <div className="col-span-2 md:col-span-1 lg:w-[30%]">
          <div className="text-left mb-4">
            {ctaData.Logo?.url && (
              <Image src={ctaData.Logo.url} alt="Company logo" width={110} height={50} />
            )}
          </div>
          <p className="Description-18 text-white mb-6">
            {getDescriptionText(ctaData.Description)}
          </p>
          <div className="flex items-center justify-center md:justify-start space-x-2">
            {ctaData.PaymentAcceptedImage?.map((payment: any, index: any) => (
              <div key={index}>
                <Image
                  src={payment.url}
                  alt={payment.name ?? `Payment Method ${index + 1}`}
                  width={40}
                  height={28}
                />
              </div>
            ))}
          </div>
        </div>

        {navLinksData.FooterNavLinks.map((section: any) => (
          <div key={section.id} className="w-full md:w-fit">
            <h4 className="Heading-20 mb-4">{section.NavlinksTitle}</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              {section.NavLinks.map((link: any) => (
                <li key={link.id}>
                  <Link href={link.NavLinksURL} className="Description">
                    {link.NavLinksPagesName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }, [ctaData, navLinksData]);

  const copyrightAndSocial = useMemo(() => {
    return (
      <div className="container mx-auto border-t border-t-[#FFFFFF1A] py-4 mt-6 flex flex-col md:flex-row flex-wrap lg:gap-0 gap-4 items-center justify-between text-center md:text-left">
        <p className="mb-2 md:mb-0 font-secondary text-sm leading-24 text-[#7C878E] font-normal">
          {ctaData.Copyright}
        </p>

        <DomainSwitcher />

        <div className="flex space-x-4">
          {socialMediaData.SocailMedia.map((social: any, index: any) => (
            <Link
              key={index}
              href={social.SocailMediaURL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary rounded-[8px]">
              <Image
                src={social.SocailMediaIcons?.url}
                alt={
                  social.SocailMediaIcons?.name ?? `Social Media ${index + 1}`
                }
                width={40}
                height={40}
                className="w-10 h-10"
              />
            </Link>
          ))}
        </div>
      </div>
    );
  }, [ctaData, socialMediaData]);

  if (loading) return <ShimmerCartPage />;
  if (error) return <div>{error}</div>;

  return (
    <footer className="HeroBanner text-white lg:p-8 p-0 rounded-t-48">
      {beforeFooter}
      {footerContent}
      {copyrightAndSocial}
    </footer>
  );
};

export default Footer;
