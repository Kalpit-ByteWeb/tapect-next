import React from "react";
import Link from "next/link";import { Button, Image } from "../../libs/Index";

interface FeatureCardSectionType {
  Title: string;
  TitleHighlight: string;
  Description: string;
  featureData: FeatureSectionType[];
  btntitle: string;
  btnURL?: string;
}

interface FeatureSectionType {
  title: string;
  titleHighlight?: string;
  description: string;
  buttonLabel?: string;
  buttonUrl?: string;
  buttonIcon?: string;
  imageUrl: string;
  imageAlt: string;
  layout?: "Vertical" | "Horizontal";
}

const FeatureCardSection: React.FC<FeatureCardSectionType> = ({
  Title,
  TitleHighlight,
  Description,
  featureData,
  btnURL,
  btntitle,
}) => {
  return (
    <section className="bg-[#F3F3F3] py-12 my-60  lg:px-0">
      <div className="container mx-auto space-y-12">
        {/* Section Title */}
        <div className="text-center space-y-4">
          <h2 className="TitleHeading">
            {Title} <span className="text-primary">{TitleHighlight}</span>
          </h2>
          <p className="Description-dark max-w-[1118px] mx-auto">
            {Description}
          </p>
          <Button type="button">
            <Link
              href={btnURL || "/products"}
              className="btn-primary px-8 py-4 flex gap-2 items-center">
              {btntitle}
              <Image src="/Icons/ButtonIconWhite.svg" alt="Button Icon" />
            </Link>
          </Button>
        </div>

        {/* Render Features in Given Order */}
        <div className="space-y-6">
          {groupVerticalItems(featureData).map((group, index) => (
            <div
              key={index}
              className={`grid ${
                group.length === 2 ? "grid-cols-1 md:grid-cols-2 gap-6" : ""
              }`}>
              {group.map((feature, idx) => (
                <FeatureItem key={idx} feature={feature} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureItem: React.FC<{ feature: FeatureSectionType }> = ({
  feature,
}) => {
  return feature.layout === "Horizontal" ? (
    <section className="bg-white w-full md:w-fit rounded-15 flex text-center md:text-left md:flex-row flex-col-reverse items-center gap-6 border shadow-featurecardsection border-[#E5E5E5]">
      <div className="md:w-1/2 px-6 py-6 md:px-16">
        <h2 className="Featuretitle mb-2">
          {feature.title}{" "}
          <span className="text-primary">{feature.titleHighlight}</span>
        </h2>
        <p className="Description-dark ">{feature.description}</p>
        {feature.buttonLabel && (
          <Link
            href={feature.buttonUrl || ""}
            className="btn-primary px-6 py-3 flex items-center w-fit">
            {feature.buttonLabel}
            {feature.buttonIcon && (
              <img
                src={feature.buttonIcon}
                alt="Button Icon"
                className="ml-2 w-5 h-5"
              />
            )}
          </Link>
        )}
      </div>
      <div className="md:w-1/2 w-full">
        <img
          src={feature.imageUrl}
          alt={feature.imageAlt}
          className="rounded-md w-full h-auto object-contain"
        />
      </div>
    </section>
  ) : (
    <section className="bg-white rounded-15 border shadow-featurecardsection border-[#E5E5E5]">
      <div>
        <img
          src={feature.imageUrl}
          alt={feature.imageAlt}
          className="rounded-t-15 w-full h-auto object-contain"
        />
      </div>
      <div className="p-7 text-center md:text-left">
        <h2 className="Featuretitle mb-2">
          {feature.title}{" "}
          <span className="text-primary">{feature.titleHighlight}</span>
        </h2>
        <p className="Description text-body">{feature.description}</p>
        {feature.buttonLabel && (
          <Link
            href={feature.buttonUrl || ""}
            className="inline-flex items-center bg-primary text-white py-2 px-4 rounded-md hover:bg-primary">
            {feature.buttonLabel}
            {feature.buttonIcon && (
              <img
                src={feature.buttonIcon}
                alt="Button Icon"
                className="ml-2 w-5 h-5"
              />
            )}
          </Link>
        )}
      </div>
    </section>
  );
};

/**
 * Groups vertical items in pairs to display in a row if possible.
 */
const groupVerticalItems = (features: FeatureSectionType[]) => {
  const grouped: FeatureSectionType[][] = [];
  let temp: FeatureSectionType[] = [];

  features.forEach((feature) => {
    if (feature.layout === "Vertical") {
      temp.push(feature);
      if (temp.length === 2) {
        grouped.push(temp);
        temp = [];
      }
    } else {
      if (temp.length > 0) {
        grouped.push(temp);
        temp = [];
      }
      grouped.push([feature]);
    }
  });

  if (temp.length > 0) grouped.push(temp);

  return grouped;
};

export default FeatureCardSection;
