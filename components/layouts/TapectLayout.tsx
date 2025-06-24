import Link from "next/link";import { Image } from "../../libs/Index";

interface AboutTapectType {
  ImageUrl: string;
  ImageAlt: string;
  Title: string;
  Description: string;
  ButtonUrl?: string;
  ButtonIcon?: string;
  ButtonLabel?: string;
  layout?: "Reverse" | ""; // Reverse = Image on Right, Default = Image on Left
}

const TapectLayout: React.FC<AboutTapectType> = ({
  ImageUrl,
  ImageAlt,
  Title,
  Description,
  ButtonUrl,
  ButtonIcon,
  ButtonLabel,
  layout,
}) => {
  return (
    <div
      className={`flex flex-col lg:flex-row ${
        layout === "Reverse" ? "lg:flex-row-reverse" : ""
      } items-center gap-8 lg:gap-16 md:px-12 xl:px-0`}>
      {/* Image Section */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <Image
          src={ImageUrl}
          alt={ImageAlt}
          className="w-full max-w-[500px] h-auto"
        />
      </div>

      {/* Text Section */}
      <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
        <div className="space-y-4">
          <h2 className="TitleHeading">{Title}</h2>
          <p className="Description-dark text-center lg:text-justify">
            {Description}
          </p>
        </div>

        {/* Button */}
        {ButtonUrl && (
          <Link
            href={ButtonUrl}
            className="btn-primary px-8 py-4 flex items-center gap-2 w-fit lg:mx-0 mx-auto">
            {ButtonLabel}
            <Image
              src={ButtonIcon || ""}
              alt="Button Icon"
              className="w-5 h-5"
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default TapectLayout;
