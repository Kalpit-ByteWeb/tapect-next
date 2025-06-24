import type { Metadata } from "next";
import { Lexend, Manrope } from "next/font/google";
import "./globals.css";
import AnalyticsLoader from "@/components/layouts/AnalyticsLoader"
import Header from "@/components/layouts/HeaderAndFooter/Header";
import Footer from "@/components/layouts/HeaderAndFooter/Footer";

// import { getSEOData } from "@/libs/Assets/seo";

// export async function generateMetadata(): Promise<Metadata> {
//   const seoData = await getSEOData("home");
  
//   if (!seoData) {
//     return {
//       title: "Default Title",
//       description: "Default Description",
//     };
//   }

//   return {
//     title: seoData.metaTitle,
//     description: seoData.metaDescription,
//     robots: seoData.metaRobots,
//     openGraph: {
//       title: seoData.openGraph?.ogTitle || seoData.metaTitle,
//       description: seoData.openGraph?.ogDescription || seoData.metaDescription,
//       url: seoData.openGraph?.ogUrl || "",
//       siteName: seoData.openGraph?.ogSiteName || "",
//       images: seoData.openGraph?.ogImage?.url ? [seoData.openGraph.ogImage.url] : [],
//       locale: seoData.openGraph?.ogLocale,
//       type: seoData.openGraph?.ogType as any,
//     },
//     twitter: {
//       card: seoData.twitter?.twitterCard as any,
//       title: seoData.twitter?.twitterTitle || seoData.metaTitle,
//       description: seoData.twitter?.twitterDescription || seoData.metaDescription,
//       site: seoData.twitter?.twitterSite || "",
//       creator: seoData.twitter?.twitterCreator || "",
//       images: seoData.twitter?.twitterImage?.url ? [seoData.twitter.twitterImage.url] : [],
//     },
//     other: seoData.extraMeta || {},
//   };
// }

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-lexend",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lexend.variable} ${manrope.variable}`}>
      <body className="antialiased">
        <AnalyticsLoader />
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
