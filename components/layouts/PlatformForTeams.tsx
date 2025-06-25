import  Link  from "next/link";
import { Image } from "../../libs/Index";

interface PlatformForTeamsType {
  PreTitle: string;
  TitleHighlight: string;
  PostTitle: string;
  Descripiton: string;
  ButtonUrl: string;
  ButtonLabel: string;
  ButtonIcon: string;
  ImageUrl: string;
  ImageAlt: string;
}

const PlatformForTeams: React.FC<PlatformForTeamsType> = ({
  PreTitle,
  TitleHighlight,
  PostTitle,
  Descripiton,
  ButtonUrl,
  ButtonLabel,
  ButtonIcon,
  ImageUrl,
  ImageAlt,
}) => {
  return (
    <div className="px-0 md:px-12 lg:px-120">
      <div className="bg-secondary rounded-20 lg:px-0 py-12">
        <div className="container mx-auto space-y-12">
          <div className="space-y-6 flex flex-col items-center">
            <div className="space-y-4 text-center">
              <h2 className="font-semibold text-[40px]/[56px] text-white">
                {PreTitle}{" "}
                <span className="text-primary">{TitleHighlight} </span>
                {PostTitle}
              </h2>
              <p className="Description-18 text-white">{Descripiton}</p>
            </div>  
            <Link
              href={ButtonUrl}
              className="btn-primary px-8 py-4 flex items-center gap-2 w-fit">
              {ButtonLabel}
              <Image src={ButtonIcon} alt="Button Icon" />
            </Link>
          </div>
          <Image src={ImageUrl} alt={ImageAlt} className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default PlatformForTeams;
