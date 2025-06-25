import Link from 'next/link';
import { Image } from "../../libs/Index";

interface Location {
  LocationName: string;
  LocationFlagImage: string;
  Address: string;
  PhoneIcon: string;
  PhoneNumber: string;
  EmailIcon: string;
  EmailId: string;
}

interface LocationsProps {
  Title: string;
  TitleHightlight: string;
  Locations: Location[];
}

const OurLocations: React.FC<LocationsProps> = ({
  Title,
  TitleHightlight,
  Locations,
}) => {
  return (
    <section className="pb-60 px-6 md:px-0">
      <div className="container mx-auto space-y-12">
        <div>
          <h2 className="TitleHeading text-center md:text-left">
            {Title} <span className="text-primary">{TitleHightlight}</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {Locations.map((location, index) => (
            <div
              key={index}
              className="space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Image
                    src={location.LocationFlagImage}
                    alt={location.LocationName || "Flag"}
                  />
                  <h3 className="Title-24">{location.LocationName}</h3>
                </div>

                <p className="Description mt-4">{location.Address}</p>
              </div>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Image src={location.PhoneIcon || ""} alt="Email Icon" />
                  <Link href={`tel:${location.PhoneNumber}`} target="_blank">
                    <p className="Description">{location.PhoneNumber}</p>
                  </Link>
                </div>
                <div className="flex gap-2">
                  <Image src={location.EmailIcon || ""} alt="Email Icon" />
                  <Link href={`mailto:${location.EmailId}`} target="_blank">
                    <p className="Description">{location.EmailId}</p>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurLocations;
