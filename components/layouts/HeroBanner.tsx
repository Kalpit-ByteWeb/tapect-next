import React from "react";
import { Button, Image } from "../../libs/Index";

interface BannerData {
  classname: string;
  Title: string;
  TitleHighlight?: string;
  Description?: string;
  ButtonLabel?: string;
  ButtonUrl?: string;
  ButtonIcon?: string;
  TextContainerWidth?: string;
  BannerContainerWidth?: string;
  BannerImageUrl?: string;
  BannerBackgroundImageUrl?: string;
  BannerBackgroundPosition?: string;
  BannerImageAlt?: string;
  BannerImageVerticalAlign?: string;
  BannerImageHorizontalAlign?: string;
  ButtonPrimary?: boolean;
  BannerFullWidth?: boolean;
  BannerHeight?: string;
  BannerSize?: string;
}

const HeroBanner: React.FC<BannerData> = ({
  classname,
  Title,
  TitleHighlight,
  Description,
  ButtonLabel,
  ButtonUrl,
  ButtonIcon,
  TextContainerWidth = "herobannermax:w-[53%] w-full",
  BannerImageUrl,
  BannerImageAlt,
  ButtonPrimary,
  BannerFullWidth,
  BannerImageVerticalAlign,
  BannerImageHorizontalAlign,
  BannerHeight = "h-screen",
  BannerSize = "w-auto mx-auto",
  // BannerBackgroundImageUrl = "/Home/BannerImagebg.png",
  // BannerBackgroundPosition = "bg-center bg-no-repeat bg-contain",
}) => {
  const hasImage = !!BannerImageUrl;
  const hasImageNoUrl = BannerImageUrl === "#";

  const containerClasses = BannerFullWidth
    ? `flex-container herobannermax:flex-row flex-col w-full text-center herobannermax:text-left ${BannerHeight} relative py-10 herobannermax:py-0`
    : "landscapemax:w-[1059px] mx-auto w-full flex flex-col items-center justify-center h-full px-6 landscapemax:px-0";

  const contentClasses = hasImage
    ? `${TextContainerWidth} content-center pb-10 lg:pb-0`
    : "w-full text-center flex flex-col items-center";

  const imageClasses = hasImage
    ? `flex justify-end items-center w-full max-w-[100%] md:max-w-[70%] herobannermax:max-w-[65%] xl:max-w-[70%] herobannermax:absolute ${BannerImageHorizontalAlign} ${BannerImageVerticalAlign}`
    : "hidden";

  const NoUrlContentClasses = hasImageNoUrl
    ? "lg:w-[40%] w-full content-center "
    : "";

  return (
    <section className={`${classname} relative overflow-hidden`}>
      <div className={containerClasses}>
        <div className={NoUrlContentClasses || contentClasses}>
          <h1 className="BannerTitle">
            {Title} {hasImageNoUrl && <br />}
            {TitleHighlight && (
              <span className="text-primary">{TitleHighlight}</span>
            )}
          </h1>
          {Description && <p className="Description mb-6">{Description}</p>}
          {ButtonLabel && ButtonUrl && (
            <Button
              type="button"
              className={
                ButtonPrimary ? "btn-primary px-8 py-4" : "btn-secondary"
              }>
              <a href={ButtonUrl} className="flex items-center gap-[6px]">
                {ButtonLabel}
                {ButtonIcon && <Image src={ButtonIcon} alt="Button Icon" />}
              </a>
            </Button>
          )}
        </div>
        {hasImage && (
          <div className={imageClasses}>
            <Image
              src={BannerImageUrl}
              alt={BannerImageAlt || "Banner Image"}
              className={`h-auto object-cover ${BannerSize}`}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroBanner;
