'use client';
import Link from "next/link";
import { Button, Image } from "../../../libs/Index";

interface Props {
  Title: string;
  TitleHighlight: string;
  ButtonLabel: string;
  ButtonURL: string;
}

const CurrenctOpeningCTA: React.FC<Props> = ({
  Title,
  TitleHighlight,
  ButtonLabel,
  ButtonURL,
}) => {
  return (
    <section className="bg-[#F3F3F3] md:h-[431px] content-center mt-60 mb-120 px-6 lg:px-0 py-6 md:py-0">
      <div className="md:container text-center mx-auto space-y-6">
        <div className="space-y-2">
          <h2 className="TitleHeading text-secondary">{Title}</h2>
          <h2 className="TitleHeading text-primary">{TitleHighlight}</h2>
        </div>
        <div>
        <Button type="button" className="">
            <Link
              href={ButtonURL}
              className="btn-primary px-8 py-4 flex gap-2 items-center">
              {ButtonLabel}
              <Image src="/Icons/ButtonIconWhite.svg" alt="Button Icon" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CurrenctOpeningCTA;
