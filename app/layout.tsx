import type { Metadata } from "next";
import { Lexend, Manrope } from "next/font/google";
import "./globals.css";
import AnalyticsLoader from "@/components/layouts/AnalyticsLoader"
import Header from "@/components/layouts/HeaderAndFooter/Header";
import Footer from "@/components/layouts/HeaderAndFooter/Footer";
import IntercomProviderWrapper from '@/components/providers/IntercomProviderWrapper'
import LocationPopup from "@/components/layouts/Popups/LocationPopup";

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
        <IntercomProviderWrapper>
        <Header/>
        <LocationPopup />
        {children}
        <Footer/>
        </IntercomProviderWrapper>
      </body>
    </html>
  );
}
