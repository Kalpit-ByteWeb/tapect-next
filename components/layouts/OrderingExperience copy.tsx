import React from "react";
import { Button, Image } from "../../libs/Index";
import  Link  from "next/link";

interface OrderingExperienceType {
  Title: string;
  Description: string;
  Iconlistdatas: IconslistDatatype[];
  layout?: "WithImage" | "WithoutImage";
  ViewProductBtnUrl?: string;
  ViewProductBtnLabel?: string;
  ViewProductBtnIconUrl?: string;
}

interface IconslistDatatype {
  IconUrl: string;
  IconAlt: string;
  IconsListTitle: string;
  IconsListDescription: string;
}

const OrderingExperience: React.FC<OrderingExperienceType> = ({
  Title,
  Description,
  Iconlistdatas,
  layout = "WithImage",
  ViewProductBtnUrl,
  ViewProductBtnLabel,
  ViewProductBtnIconUrl,
}) => {
  return layout === "WithImage" ? (
    <WithImageLayout
      Title={Title}
      Description={Description}
      Iconlistdatas={Iconlistdatas}
    />
  ) : (
    <WithoutImageLayout
      Title={Title}
      Description={Description}
      Iconlistdatas={Iconlistdatas}
      ViewProductBtnUrl={ViewProductBtnUrl}
      ViewProductBtnLabel={ViewProductBtnLabel}
      ViewProductBtnIconUrl={ViewProductBtnIconUrl}
    />
  );
};

interface LayoutProps {
  Title: string;
  Description: string;
  Iconlistdatas: IconslistDatatype[];
  ViewProductBtnUrl?: string;
  ViewProductBtnLabel?: string;
  ViewProductBtnIconUrl?: string;
}

const WithImageLayout: React.FC<LayoutProps> = ({
  Title,
  Description,
  Iconlistdatas,
}) => {
  return (
    <section className="py-60 px-6 md:px-16 xl:px-120 relative">
      <div className="bg-secondary rounded-30">
        <div className="container mx-auto py-12 space-y-12">
          <div className="flex flex-col items-center text-center space-y-4">
            <h2 className="TitleHeading text-white">{Title}</h2>
            <p className="Description text-white max-w-[856px]">
              {Description}
            </p>
          </div>
          <div className="flex flex-col-reverse md:flex-col xl:flex-row items-center gap-12">
            <div className="w-full xl:w-1/2 space-y-12">
              {Iconlistdatas.map((Iconlist, index) => (
                <div
                  key={index}
                  className="flex flex-col herobannermax:flex-row items-center md:items-start text-center md:text-left gap-6">
                  <Image src={Iconlist.IconUrl} alt={Iconlist.IconAlt} />
                  <div className="space-y-2">
                    <h3 className="text-24 font-semibold text-white">
                      {Iconlist.IconsListTitle}
                    </h3>
                    <p className="Description text-white">
                      {Iconlist.IconsListDescription}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full xl:w-1/2">
              <Image
                src="/Home/SeamlessOrdering.svg"
                alt="Seamless Ordering"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const WithoutImageLayout: React.FC<LayoutProps> = ({
  Title,
  Description,
  Iconlistdatas,
  ViewProductBtnUrl,
  ViewProductBtnLabel,
  ViewProductBtnIconUrl,
}) => {
  return (
    <section className="py-60  xxl:px-120 relative">
      <div className="bg-secondary rounded-30 lg:px-0 px-6">
        <div className="container mx-auto py-12 space-y-12">
          <div className="flex flex-col items-center text-center space-y-4">
            <h2 className="TitleHeading text-white">{Title}</h2>
            <p className="Description text-white max-w-[856px]">
              {Description}
            </p>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
            {Iconlistdatas.map((Iconlist, index) => {
              const displayIndex = index + 1;
              return (
                <div
                  key={index}
                  className="Iconslist-layout2 flex flex-col justify-between items-center text-center gap-6">
                  <div className="flex flex-col items-center gap-6">
                    <Image src={Iconlist.IconUrl} alt={Iconlist.IconAlt} />
                    <div className="space-y-2">
                      <h3 className="text-24 font-semibold text-white">
                        {Iconlist.IconsListTitle}
                      </h3>
                      <p className="Description text-white">
                        {Iconlist.IconsListDescription}
                      </p>
                    </div>
                  </div>
                  <div className="Iconslist-number relative flex justify-center lg:block">
                    <div className="IconNumber w-[50px] h-[50px] bg-[#0B081B] rounded-full outline-dashed outline-white outline-2 flex justify-center items-center">
                      <span className="text-white">0{displayIndex}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {ViewProductBtnUrl && (
            <div className="flex justify-center">
              <Button type="button">
                <Link
                  href={ViewProductBtnUrl}
                  className="btn-secondary px-8 py-4 flex items-center gap-2">
                  {ViewProductBtnLabel}
                  {ViewProductBtnIconUrl && (
                    <Image src={ViewProductBtnIconUrl} alt="Button Icon" />
                  )}
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderingExperience;
