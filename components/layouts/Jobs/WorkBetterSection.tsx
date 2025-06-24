import { Image } from "../../../libs/Index";

interface WorkBetterSectionType {
  Title: string;
  Description: string;
  Feature: featuresdata[];
}

interface featuresdata {
  IconUrl: string;
  FeatureTitle: string;
  FeatureDescription: string;
}

const WorkBetterSection: React.FC<WorkBetterSectionType> = ({
  Title,
  Description,
  Feature,
}) => {
  return (
    <section className="2xl:mx-auto  mx-6 w-fit pt-20 lg:pt-120  py-60 ">
      <div className="bg-secondary rounded-30 lg:px-120">
        <div className="container space-y-12 text-center md:text-left mx-auto py-10 lg:py-88 px-6 lg:px-0">
          <div className="flex lg:flex-row flex-col justify-between items-center">
            <div className="lg:w-3/5 w-full">
              <h2 className="TitleHeading text-white md:text-center lg:text-left md:mb-4 lg:mb-0">
                {Title}
              </h2>
            </div>
            <div className="lg:w-2/5 w-full">
              <p className="Description text-white md:text-center lg:text-left">
                {Description}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {Feature.map((feature, index) => (
              <div
                key={index}
                className="bg-[#FFFFFF1A] space-y-5 rounded-20 p-6">
                <div className="flex items-center gap-4 pb-5 border-b border-[#FFFFFF]">
                  <Image src={feature.IconUrl} alt={feature.FeatureTitle} />
                  <h3 className="lg:text-[24px] text-lg text-white break-word">
                    {feature.FeatureTitle}
                  </h3>
                </div>
                <p className="Description text-white text-left">
                  {feature.FeatureDescription}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkBetterSection;
