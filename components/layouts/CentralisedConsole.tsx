import { Image } from "../../libs/Index";

interface CentralisedConsoleType {
  Title: string;
  TitleHighlight: string;
  Description: string;
  ImageUrl: string | "";
  IconList: IconsListtype[];
}

interface IconsListtype {
  IconsListTitle: string;
  IconListImageUrl: string;
  IconListImageAlt: string;
}

const CentralisedConsole: React.FC<CentralisedConsoleType> = ({
  Title,
  TitleHighlight,
  Description,
  ImageUrl,
  IconList,
}) => {
  return (
    <section className="py-60 md:px-0">
      <div className="container mx-auto space-y-12">
        <div className="max-w-[878px] mx-auto space-y-4 text-center">
          <h2 className="TitleHeading">
            {Title} <span className="text-primary">{TitleHighlight}</span>
          </h2>
          <p className="Description-dark">{Description}</p>
        </div>
        <div className="bg-secondary rounded-16 flex flex-col justify-center md:p-12 p-4 space-y-12">
          <Image
            src={ImageUrl}
            width={885}
            alt="Tapect Console"
            className="mx-auto"
          />
          <div className="flex flex-row flex-wrap md:gap-10 md:justify-center justify-between gap-2 text-center">
            {IconList.map((Iconlist, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row justify-center  gap-2 w-[48%] md:w-fit">
                <Image
                  src={Iconlist.IconListImageUrl}
                  alt={Iconlist.IconListImageAlt}
                  className="w-fit mx-auto"
                />
                <span className="Description text-white">
                  {Iconlist.IconsListTitle}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CentralisedConsole;
