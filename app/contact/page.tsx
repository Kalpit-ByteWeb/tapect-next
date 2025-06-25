import { description } from '@/libs/Assets/helper';
import HeroBanner from '@/components/layouts/HeroBanner';
import ContactForm from '@/components/layouts/ContactForm';
import OurLocations from '@/components/layouts/OurLocations';
import {
  fetchPages,
  fetchFeatures,
  fetchOurLocation,
} from '@/components/api/ContentAPI';

export default async function ContactUsPage() {
  let pageData: any = null;
  let featureItems: any[] = [];
  let locationSections: any[] = [];
  let error: string | null = null;

  try {
    const [pagesRes, featuresRes, locationsRes] = await Promise.all([
      fetchPages(),
      fetchFeatures(),
      fetchOurLocation(),
    ]);

    const getPage = (res: any) =>
      res.data.find((p: any) => p.PageName === 'Contact');

    pageData = getPage(pagesRes);

    featureItems =
      getPage(featuresRes)
        ?.PageSections?.filter((s: any) => s.__component === 'layout.features')
        ?.flatMap((s: any) => s.FeatureStructure || []) || [];

    locationSections =
      getPage(locationsRes)?.PageSections?.filter(
        (s: any) => s.__component === 'layout.our-location',
      ) || [];
  } catch (e: any) {
    error = e.message || 'An error occurred while fetching content.';
  }

  if (error) return <div>{error}</div>;
  if (!pageData) return <div>No data found.</div>;

  const hero = pageData.PageSections?.find(
    (s: any) => s.__component === 'layout.hero-banner',
  );

  const contactInfo = featureItems.map((item: any) => ({
    icon: item?.FeatureImage?.[0]?.url,
    alt: item?.FeatureTitle,
    title: item?.FeatureTitle,
    description: description(item?.FeatureDescription),
    link: item?.FeatureButtonUrl,
    label: item?.FeatureButtonText,
  }));

  const mappedLocations = locationSections.flatMap(
    (section: any) =>
      section?.OurLocation?.map((loc: any) => ({
        LocationName: loc.Country,
        LocationFlagImage: loc.Flag?.url,
        Address: loc.Address,
        PhoneIcon: loc.PhoneIcon?.url,
        PhoneNumber: loc.PhoneNumber,
        EmailIcon: loc.EmailIcon?.url,
        EmailId: loc.EmailAddress,
      })) || [],
  );

  return (
    <>
      {hero && (
        <HeroBanner
          classname="HeroBanner"
          Title={hero.Title}
          TitleHighlight={hero.TitleHighlight}
          Description={description(hero.Description)}
          BannerImageUrl="#"
          BannerImageAlt=""
          BannerHeight="herobannermax:h-[581px] justify-center pb-4"
          BannerFullWidth
          BannerSize="hidden"
          BannerBackgroundImageUrl="#"
        />
      )}

      <ContactForm ContactInfo={contactInfo} />

      <OurLocations
        Title="Our"
        TitleHightlight="Locations"
        Locations={mappedLocations}
      />
    </>
  );
}
