'use client'
import { useEffect, useState } from "react";
import { Image } from "../../../libs/Index";

interface props {
  Title: string;
  Description: string;
  CounterData: CounterData[];
  bgImage: string;
}

interface CounterData {
  ImageUrl: string;
  CounterNumber: string;
  CounterTitle: string;
}

const Countersection: React.FC<props> = ({
  Title,
  Description,
  CounterData,
  bgImage,
}) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 1220);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <section className="mx-6 md:mx-12 2xl:w-[1400px] 2xl:mx-auto">
      <div
        className={`bg-secondary py-5 md:py-12 flex rounded-20  bg-no-repeat bg-left-bottom`}
        style={{
          backgroundImage: isDesktop ? `url('${bgImage}')` : "none",
        }}>
        <div className=" flex md:flex-row text-center flex-col gap-12 md:gap-0 justify-between sm:px-10 px-5 lg:px-20  md:gap-x-20 ">
          <div className="md:w-fit  w-full space-y-4">
            <h2 className="TitleHeading text-white text-left">{Title}</h2>
            <p className="Description text-white text-left">{Description}</p>
          </div>
          <div className="lg:w-[411px] w-full bg-[#232132] p-6 rounded-20 space-y-6">
            {CounterData.map((counter, index) => (
              <div
                key={index}
                className="space-y-2 last:border-none border-b-2 border-[#FFFFFF1A] text-center flex flex-col items-center last:pb-0 pb-4">
                <Image
                  src={counter.ImageUrl}
                  alt={counter.CounterTitle}
                  width={50}
                  height={50}
                />
                <h2 className="Title-24 text-white">{counter.CounterNumber}</h2>
                <p className="Description-18 text-white">
                  {counter.CounterTitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Countersection;
