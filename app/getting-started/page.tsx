import StructuredData from '@/components/seo/StructuredData';
import { getSEOData } from '@/libs/Assets/seo';
import { Image } from '@/libs/Index';
import { Metadata } from 'next';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const pathname = "/getting-started";
  const seoData = await getSEOData(pathname);

  if (!seoData) {
    return {
      title: "Default Title",
      description: "Default Description",
    };
  }

  return {
    title: seoData.metaTitle,
    description: seoData.metaDescription,
    robots: seoData.metaRobots,
    alternates: {
      canonical: seoData.canonicalURL,
    },
    openGraph: {
      title: seoData.openGraph?.ogTitle || seoData.metaTitle,
      description: seoData.openGraph?.ogDescription || seoData.metaDescription,
      url: seoData.openGraph?.ogUrl || "",
      siteName: seoData.openGraph?.ogSiteName || "",
      images: seoData.openGraph?.ogImage?.url ? [seoData.openGraph.ogImage.url] : [],
      locale: seoData.openGraph?.ogLocale,
      type: seoData.openGraph?.ogType as any,
    },
    twitter: {
      card: seoData.twitter?.twitterCard as any,
      title: seoData.twitter?.twitterTitle || seoData.metaTitle,
      description: seoData.twitter?.twitterDescription || seoData.metaDescription,
      site: seoData.twitter?.twitterSite || "",
      creator: seoData.twitter?.twitterCreator || "",
      images: seoData.twitter?.twitterImage?.url ? [seoData.twitter.twitterImage.url] : [],
    },
    other: seoData.extraMeta || {},
  };
}

const HowToUseSteps = [
  {
    step: 'Step 1',
    title: 'Register in the Tapect Console',
    description:
      "If you've purchased a Tapect card, your account is already created! Simply log in to the Tapect Console using the details provided. For new users, registration is quick and easy - just follow the prompts to create your account.",
    imageUrl: '/how-to-us/Register-in-the-Tapect-Console.webp',
  },
  {
    step: 'Step 2',
    title: 'Create Your Digital Profile Card',
    description:
      "Once you're in the console, it's time to create your digital profile card. Add your contact details, social media links, and anything else you’d like to share with your network.",
    imageUrl: '/how-to-us/Create-Your-Digital-Profile-Card.webp',
  },
  {
    step: 'Step 3',
    title: 'Customize Your Digital Card',
    description:
      'Make your card uniquely yours by customizing the design. Adjust the color scheme, add your logo, and personalize the look and feel of your card to match your brand or style.',
    imageUrl: '/how-to-us/Customize-Your-Digital-Card.webp',
  },
  {
    step: 'Step 4',
    title: 'Activate Your Physical Card',
    description:
      'Now, activate your physical Tapect card by scanning the QR code printed on it. Simply scan the code in the Tapect Portal, and your digital profile will be linked and ready to share with just a tap!',
    imageUrl: '/how-to-us/Register-in-the-Tapect-Console.webp',
  },
];

export default async function HowToUsePage() {
  const pathname = "/getting-started";
  const seoData = await getSEOData(pathname);

  return (
    <>
      <StructuredData pathname={pathname} seoData={seoData} />
      <section className="py-120">
        <div className="container mx-auto space-y-12">
          <div className="space-y-4 max-w-[688px]">
            <h1 className="TitleHeading">How To Use Tapect?</h1>
            <p className="Description">
              It's as simple as tapping a card onto a phone. Watch our videos
              below to learn how to use Tapect.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 space-y-8">
              {HowToUseSteps.filter((_, i) => i % 2 === 0).map((step, i) => (
                <div key={i} className="bg-[#F5F8FE] p-7 rounded-16 shadow-md">
                  <div className="space-y-4">
                    <h3 className="text-primary Title-18">{step.step}</h3>
                    <h2 className="text-[32px] font-bold font-primary">
                      {step.title}
                    </h2>
                    <p className="Description">{step.description}</p>
                  </div>
                  {step.imageUrl && (
                    <Image src={step.imageUrl} alt={step.title} className="mt-4" />
                  )}
                </div>
              ))}
            </div>

            <div className="w-full md:w-1/2 space-y-8">
              {HowToUseSteps.filter((_, i) => i % 2 !== 0).map((step, i) => (
                <div
                  key={i}
                  className={`bg-[#F5F8FE] p-7 rounded-16 shadow-md ${
                    i === 0 ? 'md:mt-120' : ''
                  }`}
                >
                  <div className="space-y-4">
                    <h3 className="text-primary Title-18">{step.step}</h3>
                    <h2 className="text-[32px] font-bold font-primary">
                      {step.title}
                    </h2>
                    <p className="Description">{step.description}</p>
                  </div>
                  {step.imageUrl && (
                    <Image
                      src={step.imageUrl}
                      alt={step.title}
                      className={i === 0 ? 'py-[77px]' : ''}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
