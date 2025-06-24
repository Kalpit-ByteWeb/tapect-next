import { Image } from "../../libs/Index";

interface BenefitsPerkstype {
  Title: string;
  TitleHighlight: string;
  Description: string;
  BenefitsPerks: BenefitsPerksdata[];
}

interface BenefitsPerksdata {
  IconUrl: string;
  Title: string;
  Description: string;
}

const BenefitsPerks: React.FC<BenefitsPerkstype> = ({
  Title,
  TitleHighlight,
  Description,
  BenefitsPerks,
}) => {
  return (
    <div className="py-60">
      <div className="container space-y-12 mx-auto">
        <div className="space-y-4 max-w-[757px] mx-auto text-center">
          <h2 className="TitleHeading text-secondary">
            {Title} <span className="text-primary">{TitleHighlight}</span>
          </h2>
          <p className="Description-dark text-center ">{Description}</p>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-6">
          {BenefitsPerks.map((BenefitsPerks, index) => (
            <div
              key={index}
              className="bg-[#F5F8FE] p-4 md:p-7 space-y-6 rounded-20">
              <div className="w-fit md:w-full mx-auto ">
                <Image src={BenefitsPerks.IconUrl} alt={BenefitsPerks.Title} />
              </div>
              <div className="space-y-4">
                <h3 className="Title-24 text-secondary text-center md:text-left">
                  {BenefitsPerks.Title}
                </h3>
                <p className="Description-dark text-center md:text-left">
                  {BenefitsPerks.Description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BenefitsPerks;
