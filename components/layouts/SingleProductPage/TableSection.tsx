import { Image } from "../../../libs/Index";

const TableSection = () => {
  return (
    <section className="py-60">
      <div className="container md:px-6 lg:px-0 mx-auto py-12 space-y-10 rounded-16">
        <div className="max-w-[1045px] mx-auto space-y-4 text-center">
          <h2 className="TitleHeading text-secondary">
            Tapect vs Paper <span className="text-primary">business cards</span>
          </h2>
          <p className="Description-dark">
            Curious about the difference between Tapect and traditional paper
            business cards? Discover why Tapect's NFC-enabled digital cards
            offer a smarter, eco-friendly, and more convenient way to network,
            saving time and reducing waste. Upgrade your connections today!
          </p>
        </div>
        <div>
          <div className="overflow-scroll md:overflow-auto">
            <table className=" text-center items-center bg-white border border-[#E5E5E5] herobannermax:w-full w-[1000px]">
              <thead>
                <tr className="border-b border-[#CBADFF]">
                  <th></th>
                  <th className="py-6 Title-24 rounded-t-16 text-white bg-secondary">
                    Tapect Card
                  </th>
                  <th className="py-6 Title-24 text-secondary">
                    Paper Business Card
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#CBADFF]">
                  <td className="py-6 md:pl-120 pl-60 text-left Title-24 text-secondary">
                    Custom Design
                  </td>
                  <td className="py-6 bg-secondary">
                    <Image
                      src="/Icons/WhiteTickIcon.svg"
                      alt="Table Tick Icon"
                      className="mx-auto"
                    />
                  </td>
                  <td className="py-6">
                    <Image
                      src="/Icons/TickIcon.svg"
                      alt="Table Tick Icon"
                      className="mx-auto"
                    />
                  </td>
                </tr>
                <tr className="border-b border-[#CBADFF]">
                  <td className="py-6 md:pl-120 pl-60 text-left Title-24 text-secondary">
                    One-Time Purchase
                  </td>
                  <td className="py-6 bg-secondary">
                    <Image
                      src="/Icons/WhiteTickIcon.svg"
                      alt="Table Tick Icon"
                      className="mx-auto"
                    />
                  </td>
                  <td className="py-6">
                    <Image
                      src="/Icons/cancel.svg"
                      alt="Table Tick Icon"
                      className="mx-auto"
                    />
                  </td>
                </tr>
                <tr className="border-b border-[#CBADFF]">
                  <td className="py-6 md:pl-120 pl-60 text-left Title-24 text-secondary">
                    Update Info Anytime
                  </td>
                  <td className="py-6 bg-secondary">
                    <Image
                      src="/Icons/WhiteTickIcon.svg"
                      alt="Table Tick Icon"
                      className="mx-auto"
                    />
                  </td>
                  <td className="py-6">
                    <Image
                      src="/Icons/cancel.svg"
                      alt="Table Tick Icon"
                      className="mx-auto"
                    />
                  </td>
                </tr>
                <tr className="border-b border-[#CBADFF]">
                  <td className="py-6 md:pl-120 pl-60 text-left Title-24 text-secondary">
                    Cost-Effective
                  </td>
                  <td className="py-6 bg-secondary">
                    <Image
                      src="/Icons/WhiteTickIcon.svg"
                      alt="Table Tick Icon"
                      className="mx-auto"
                    />
                  </td>
                  <td className="py-6">
                    <Image
                      src="/Icons/cancel.svg"
                      alt="Table Tick Icon"
                      className="mx-auto"
                    />
                  </td>
                </tr>
                <tr className="border-b border-[#CBADFF]">
                  <td className="py-6 md:pl-120 pl-60 text-left Title-24 text-secondary">
                    Real-Time Analytics
                  </td>
                  <td className="py-6 bg-secondary">
                    <Image
                      src="/Icons/WhiteTickIcon.svg"
                      alt="Table Tick Icon"
                      className="mx-auto"
                    />
                  </td>
                  <td className="py-6">
                    <Image
                      src="/Icons/cancel.svg"
                      alt="Table Tick Icon"
                      className="mx-auto"
                    />
                  </td>
                </tr>
                <tr className="border-b border-[#CBADFF]">
                  <td className="py-6 md:pl-120 pl-60 text-left Title-24 text-secondary">
                    Eco friendly
                  </td>
                  <td className="py-6 bg-secondary">
                    <Image
                      src="/Icons/WhiteTickIcon.svg"
                      alt="Table Tick Icon"
                      className="mx-auto"
                    />
                  </td>
                  <td className="py-6">
                    <Image
                      src="/Icons/cancel.svg"
                      alt="Table Tick Icon"
                      className="mx-auto"
                    />
                  </td>
                </tr>
                <tr className="border-b border-[#CBADFF]">
                  <td className="py-6 md:pl-120 pl-60 text-left Title-24 text-secondary">
                    Unique User Experience
                  </td>
                  <td className="py-6 bg-secondary">
                    <Image
                      src="/Icons/WhiteTickIcon.svg"
                      alt="Table Tick Icon"
                      className="mx-auto"
                    />
                  </td>
                  <td className="py-6">
                    <Image
                      src="/Icons/cancel.svg"
                      alt="Table Tick Icon"
                      className="mx-auto"
                    />
                  </td>
                </tr>
                <tr className="border-b border-[#CBADFF]">
                  <td className="py-6 md:pl-120 pl-60 text-left Title-24 text-secondary">
                    Endlessly Reusable
                  </td>
                  <td className="py-6 rounded-b-16 bg-secondary">
                    <Image
                      src="/Icons/WhiteTickIcon.svg"
                      alt="Table Tick Icon"
                      className="mx-auto"
                    />
                  </td>
                  <td className="py-6">
                    <Image
                      src="/Icons/cancel.svg"
                      alt="Table Tick Icon"
                      className="mx-auto"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TableSection;
