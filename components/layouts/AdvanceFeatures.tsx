import { Image } from "../../libs/Index";

interface AdvFeature {
  Title: string;
  TitleHighlight: string;
  Description?: string;
  featuredata: AdvanceFeaturestype[];
}

interface AdvanceFeaturestype {
  FeatureTitle: string;
  FeatureDescription: string;
  FeatureImageUrl: string;
  FeatureImageAlt: string;
}

const AdvanceFeatures: React.FC<AdvFeature> = ({
  Title,
  TitleHighlight,
  Description,
  featuredata,
}) => {
  return (
    <>
      <section className="py-60 md:px-0 px-6 md:mx-6 lg:mx-0">
        <div className="md:container mx-auto space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="TitleHeading">
              {Title} <span className="text-primary">{TitleHighlight}</span>
            </h2>
            <p className="Description-dark max-w-[1118px] mx-auto">
              {Description}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 herobannermax:grid-cols-3 gap-6">
            {featuredata.map((feature, index) => (
              <div
                key={index}
                className="bg-featurelightbg pt-6 shadow-AdvanceFeature rounded-16 flex flex-col justify-between gap-6">
                <div className="space-y-2 text-center px-3">
                  <h3 className="Title-24">{feature.FeatureTitle}</h3>
                  <p className="Description-dark">
                    {feature.FeatureDescription}
                  </p>
                </div>
                <div>
                  <Image
                    src={feature.FeatureImageUrl}
                    alt={feature.FeatureImageAlt}
                    className="w-full rounded-16"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AdvanceFeatures;
