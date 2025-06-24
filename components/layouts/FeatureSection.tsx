import React from "react";
import Link from "next/link";
interface FeatureSectionType {
  title: string;
  titleHighlight?: string;
  description: string;
  buttonLabel?: string;
  buttonUrl?: string;
  buttonIcon?: string;
  imageUrl: string;
  imageAlt: string;
  layout?: "Vertical" | "Horizontal" | "Vertical2";
}

interface LayoutProps extends FeatureSectionType {
  layout?: "Vertical" | "Horizontal" | "Vertical2";
}

const HorizontalLayout: React.FC<LayoutProps> = ({
  title,
  titleHighlight,
  description,
  buttonLabel,
  buttonUrl,
  buttonIcon,
  imageUrl,
  imageAlt,
}) => {
  return (
    <section className="mt-60 container herobannermax:mx-auto bg-[#F5F8FE] w-fit rounded-20 mb-6 mx-6">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-8/12 px-6 pt-16 pb-11 md:pt-11 md:pb-11 md:px-12 lg:pl-16 lg:pr-[91px] text-center md:text-left">
          <h2 className="Featuretitle mb-2">
            {title} <span className="text-primary">{titleHighlight}</span>
          </h2>
          <p className="Description-dark mb-6">{description}</p>
          {buttonLabel && (
            <Link
              href={buttonUrl || ""}
              className="btn-primary px-8 py-4 flex w-fit mx-auto md:mx-0">
              {buttonLabel}
              {buttonIcon && (
                <img
                  src={buttonIcon}
                  alt="Button Icon"
                  width={20}
                  height={20}
                  className="ml-2"
                />
              )}
            </Link>
          )}
        </div>
        <div className="md:w-1/2 w-full">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="rounded-md w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};

const VerticalLayout: React.FC<LayoutProps> = ({
  title,
  titleHighlight,
  description,
  buttonLabel,
  buttonUrl,
  buttonIcon,
  imageUrl,
  imageAlt,
}) => {
  return (
    <section className="bg-[#F5F8FE] rounded-20 ">
      <div className="flex flex-col items-center text-center md:text-left">
        <div className="px-6 md:px-16 pt-16 pb-11">
          <h2 className="Featuretitle mb-2">
            {title} <span className="text-primary">{titleHighlight}</span>
          </h2>
          <p className="Description-dark mb-4">{description}</p>
          {buttonLabel && (
            <Link
              href={buttonUrl || ""}
              className="inline-flex items-center bg-primary text-white py-2 px-4 rounded-md hover:bg-purple-700">
              {buttonLabel}
              {buttonIcon && (
                <img
                  src={buttonIcon}
                  alt="Button Icon"
                  width={20}
                  height={20}
                  className="ml-2"
                />
              )}
            </Link>
          )}
        </div>
        <div className="w-full">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="rounded-md w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};

const VerticalLayout2: React.FC<LayoutProps> = ({
  title,
  titleHighlight,
  description,
  buttonLabel,
  buttonUrl,
  buttonIcon,
  imageUrl,
  imageAlt,
}) => {
  return (
    <section className="bg-[#ffffff] rounded-20 shadow-featurecardvertical2 px-0">
      <div className="flex flex-col items-center lg:text-left text-center p-3 md:p-8 h-full justify-between">
        <div className="space-y-4 md:space-y-6">
          <h2 className="Title-24">
            {title} <span className="text-primary">{titleHighlight}</span>
          </h2>
          <p className="Description-dark">{description}</p>
          {buttonLabel && (
            <Link
              href={buttonUrl || ""}
              className="inline-flex items-center bg-primary text-white py-2 px-4 rounded-16">
              {buttonLabel}
              {buttonIcon && (
                <img
                  src={buttonIcon}
                  alt="Button Icon"
                  width={20}
                  height={20}
                  className="ml-2"
                />
              )}
            </Link>
          )}
        </div>
        <div className="w-full">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="rounded-md w-full h-auto object-contain mt-12"
          />
        </div>
      </div>
    </section>
  );
};

const FeatureSection: React.FC<FeatureSectionType> = ({
  title,
  titleHighlight,
  description,
  buttonLabel,
  buttonUrl,
  buttonIcon,
  imageUrl,
  imageAlt,
  layout = "Horizontal",
}) => {
  if (layout === "Vertical") {
    return (
      <VerticalLayout
        title={title}
        titleHighlight={titleHighlight}
        description={description}
        buttonLabel={buttonLabel}
        buttonUrl={buttonUrl}
        buttonIcon={buttonIcon}
        imageUrl={imageUrl}
        imageAlt={imageAlt}
      />
    );
  } else if (layout === "Horizontal") {
    return (
      <HorizontalLayout
        title={title}
        titleHighlight={titleHighlight}
        description={description}
        buttonLabel={buttonLabel}
        buttonUrl={buttonUrl}
        buttonIcon={buttonIcon}
        imageUrl={imageUrl}
        imageAlt={imageAlt}
      />
    );
  } else if (layout === "Vertical2") {
    return (
      <VerticalLayout2
        title={title}
        titleHighlight={titleHighlight}
        description={description}
        buttonLabel={buttonLabel}
        buttonUrl={buttonUrl}
        buttonIcon={buttonIcon}
        imageUrl={imageUrl}
        imageAlt={imageAlt}
      />
    );
  }

  // Default return in case layout is not recognized
  return null;
};

export default FeatureSection;
