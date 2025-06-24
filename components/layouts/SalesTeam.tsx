import { Button } from "../../libs/Index";

interface props {
  Title: string;
  Description: string;
  ButtonText: string;
  ButtonURL: string;
  ImageUrl: string;
  ImageALT: string;
}

const SalesTeam: React.FC<props> = ({
  Title,
  Description,
  ButtonText,
  ButtonURL,
  ImageUrl,
  ImageALT,
}) => {
  return (
    <div className="container mx-auto">
      <div className="flex lg:flex-row flex-col gap-5 justify-between rounded-16 overflow-hidden mx-auto bg-[#F5F8FE] lg:pl-12 mb-8">
        <div className="lg:w-[580px] space-y-6 py-6 content-center px-6 lg:px-0">
          <div className="space-y-4 text-center lg:text-left">
            <h2 className="TitleHeading">{Title}</h2>
            <p className="text-[#010E21] Description">{Description}</p>
          </div>
          <div className="w-full mx-auto">
            <Button type="button" className="flex w-full">
              <a
                href={ButtonURL}
                className="btn-primary flex gap-[6px] justify-center px-8 py-4 mx-auto lg:mx-0">
                {ButtonText}
                <img src="/Features/topRightArrow.svg" alt="Right Arrow" />
              </a>
            </Button>
          </div>
        </div>
        <div className="ml-auto">
          <img className="rounded-16" src={ImageUrl} alt={ImageALT} />
        </div>
      </div>
    </div>
  );
};

export default SalesTeam;
