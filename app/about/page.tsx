import { headers } from "next/headers";
import Countersection from "@/components/layouts/AboutUs/Countersection";
import CurrenctOpeningCTA from "@/components/layouts/AboutUs/CurrenctOpeningCTA";
import HeroBanner from "@/components/layouts/HeroBanner";
import TapectLayout from "@/components/layouts/TapectLayout";
import ShimmerCartPage from "@/components/layouts/Shimmar/ShimmerHomePage";
import { fetchCounter, fetchCounterIconBox, fetchFeatures, fetchPages } from "@/components/api/ContentAPI";
import { description } from "@/libs/Assets/helper";
import { getDomain } from "@/libs/Assets/DomainWiseData";

export default async function AboutPage() {
  const host = (await headers()).get("host") ?? "tapect.com";
  const domain = getDomain(host);

  try {
    const [pagesRes, featuresRes, counterRes, counterIconRes] = await Promise.all([
      fetchPages(domain),
      fetchFeatures(domain),
      fetchCounter(domain),
      fetchCounterIconBox(domain),
    ]);

    const getPage = (res: any) => res.data.find((p: any) => p.PageName === "About Us");

    const page = getPage(pagesRes);

    const featureItems =
      getPage(featuresRes)?.PageSections?.filter((s: any) => s.__component === "layout.features")
        ?.flatMap((s: any) => s.FeatureStructure || []) || [];

    const counterData =
      getPage(counterRes)?.PageSections?.filter((s: any) => s.__component === "layout.coutner") || [];

    const counterItems =
      getPage(counterIconRes)?.PageSections?.filter((s: any) => s.__component === "layout.coutner") || [];

    const hero = page?.PageSections?.find((s: any) => s.__component === "layout.hero-banner");
    const jobCTA = page?.PageSections?.find((s: any) => s.__component === "layout.job-openings-cta");

    const counterMapped = counterItems.flatMap((item: any) =>
      item?.IconBox?.map((icon: any) => ({
        ImageUrl: icon?.IconUrl?.url,
        CounterNumber: icon?.IconBoxTitle,
        CounterTitle: description(icon?.IconBoxDescription),
      })) || []
    );

    return (
      <>
        {hero && (
          <HeroBanner
            classname="HeroBanner-light flex justify-center"
            Title={hero.Title}
            TitleHighlight={hero.TitleHighlight}
            BannerHeight="lg:h-[581px]"
            TextContainerWidth="lg:w-[60%] w-full"
            BannerImageHorizontalAlign="herobannermax:right-[-5%]"
            BannerImageUrl={hero.BannerImage?.url}
            BannerImageAlt={hero.Title}
            BannerFullWidth={true}
            BannerSize="w-[65%] mx-auto lg:mx-0"
          />
        )}

        <div className="container mx-auto mt-120 mb-60">
          {featureItems.map((item, index) => (
            <TapectLayout
              key={index}
              ImageUrl={item?.FeatureImage?.[0]?.url}
              ImageAlt={item?.FeatureTitle}
              Title={item?.FeatureTitle}
              Description={description(item?.FeatureDescription)}
            />
          ))}
        </div>

        {counterData.length > 0 && (
          <Countersection
            Title={counterData[0]?.Title}
            Description={description(counterData[0]?.Description)}
            CounterData={counterMapped}
            bgImage={counterData[0]?.Image?.url}
          />
        )}

        {jobCTA && (
          <CurrenctOpeningCTA
            Title={jobCTA.Title}
            TitleHighlight={jobCTA.TitleHighlight}
            ButtonLabel={jobCTA.ButtonText}
            ButtonURL={jobCTA.ButtonUrl}
          />
        )}
      </>
    );
  } catch (err) {
    console.error("Error loading About page:", err);
    return <ShimmerCartPage />;
  }
}
