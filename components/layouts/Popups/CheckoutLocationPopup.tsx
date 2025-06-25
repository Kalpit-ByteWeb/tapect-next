const CheckoutLocationPopup = ({
  show,
  country,
}: {
  show: boolean;

  country: string;
}) => {
  if (!show) return null;

  // Define mappings for country-specific URLs and button text
  const countryMappings: {
    [key: string]: { url: string; buttonText: string; DomainName: string };
  } = {
    India: {
      url: "https://www.tapect.in",
      DomainName: "tapect.in",
      buttonText: "Continue Shopping on Tapect.in",
    },
    Australia: {
      url: "https://www.tapect.au",
      DomainName: "tapect.au",
      buttonText: "Continue Shopping on Tapect.au",
    },
    "United Arab Emirates": {
      url: "https://www.tapect.ae",
      DomainName: "tapect.ae",
      buttonText: "Continue Shopping on Tapect.ae",
    },
    Germany: {
      url: "https://www.tapect.de",
      DomainName: "tapect.de",
      buttonText: "Continue Shopping on Tapect.de",
    },
  };

  const { url, buttonText, DomainName } = countryMappings[country];

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-12 w-[726px] border border-primary rounded-16">
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="TitleHeading text-secondary text-center">
              Redirecting You for a<br />
              <span className="text-primary">Better Experience</span>
            </h2>
            <p className="Description text-center text-secondary">
              Since you've selected {country}, we recommend making your
              purchases on {DomainName} for a smoother experience.
            </p>
          </div>
          <a
            href={url}
            className="block text-center btn-primary text-white w-full py-4 rounded-[8px] text-md font-semibold font-primary">
            {buttonText}
          </a>
        </div>
      </div>
    </div>
  );
};

export default CheckoutLocationPopup;
