'use client'
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import countryStateData from "./countryStateData";
import countryData from "./countryData";
import {
  getDomain,
  getCountryByDomain,
} from "../../../libs/Assets/DomainWiseData";

const getCountryFromDomain = () => {
  const country = getCountryByDomain(getDomain()) || "";
  const isEditable = country === "";
  return { country, isEditable };
};

interface Address {
  FirstName: string;
  LastName: string;
  Country: string;
  StreetAddress: string;
  State: string;
  City: string;
  PostalCode: string;
  PhoneNumber: string;
}
interface Props {
  shippingAddress: Address;
  billingAddress: Address;
  useSameAddress: boolean;
  setUseSameAddress: (value: boolean) => void;
  onAddressChange: (
    section: "ShippingAddress" | "BillingAddress",
    field: keyof Address,
    value: string
  ) => void;
  shippingPostalCodeError: string;
  shippingPhoneNumberError: string;
  billingPostalCodeError: string;
  billingPhoneNumberError: string;
  validateField: (
    section: "ShippingAddress" | "BillingAddress",
    field: "PostalCode" | "PhoneNumber"
  ) => void;
  clearFieldError: (
    section: "ShippingAddress" | "BillingAddress",
    field: "PostalCode" | "PhoneNumber"
  ) => void;
}

const ShippingBillingForm = forwardRef(
  (
    {
      shippingAddress,
      billingAddress,
      useSameAddress,
      setUseSameAddress,
      onAddressChange,
    }: Props,
    ref
  ) => {
    const [shippingFieldErrors, setShippingFieldErrors] = useState<
      Record<keyof Address, string>
    >({} as any);
    const [billingFieldErrors, setBillingFieldErrors] = useState<
      Record<keyof Address, string>
    >({} as any);
    const renderError = (
      section: "ShippingAddress" | "BillingAddress",
      field: keyof Address
    ) => {
      const error =
        section === "ShippingAddress"
          ? shippingFieldErrors[field]
          : billingFieldErrors[field];
      return error ? <p className="text-red-500 text-sm">{error}</p> : null;
    };

    const [defaultCountry, setDefaultCountry] = useState<string>("");
    const [isCountryEditable, setIsCountryEditable] = useState<boolean>(false);
    const [availableStatesShipping, setAvailableStatesShipping] = useState<
      string[]
    >([]);
    const [availableStatesBilling, setAvailableStatesBilling] = useState<
      string[]
    >([]);
    const [allCountries, setAllCountries] = useState<string[]>([]);

    const [shippingPostalCodeError, setShippingPostalCodeError] =
      useState<string>("");
    const [shippingPhoneNumberError, setShippingPhoneNumberError] =
      useState<string>("");
    const [billingPostalCodeError, setBillingPostalCodeError] =
      useState<string>("");
    const [billingPhoneNumberError, setBillingPhoneNumberError] =
      useState<string>("");

    const setPostalCodeError = (
      section: "ShippingAddress" | "BillingAddress",
      error: string
    ) => {
      if (section === "ShippingAddress") setShippingPostalCodeError(error);
      else setBillingPostalCodeError(error);
    };
    const setPhoneNumberError = (
      section: "ShippingAddress" | "BillingAddress",
      error: string
    ) => {
      if (section === "ShippingAddress") setShippingPhoneNumberError(error);
      else setBillingPhoneNumberError(error);
    };

    useEffect(() => {
      const { country, isEditable } = getCountryFromDomain();
      setDefaultCountry(country);
      setIsCountryEditable(isEditable);

      const initialCountry = country || "";
      const initialStates = countryStateData[initialCountry] || [];

      if (initialCountry) {
        onAddressChange("ShippingAddress", "Country", initialCountry);
        onAddressChange("BillingAddress", "Country", initialCountry);
        setAvailableStatesShipping(initialStates);
        setAvailableStatesBilling(initialStates);
        const countryInfo = countryData[initialCountry];
        if (countryInfo) {
          const initialPhone = `${countryInfo.phoneCode} `;
          onAddressChange("ShippingAddress", "PhoneNumber", initialPhone);
          onAddressChange("BillingAddress", "PhoneNumber", initialPhone);
        }
      }

      if (isEditable) {
        const filteredCountries = Object.keys(countryStateData);
        setAllCountries(filteredCountries);
        if (!initialCountry) {
          setAvailableStatesShipping([]);
          setAvailableStatesBilling([]);
        }
      }
    }, [onAddressChange]);

    const handleCountryChange = (
      section: "ShippingAddress" | "BillingAddress",
      value: string
    ) => {
      if (!isCountryEditable && section === "ShippingAddress") return;

      onAddressChange(section, "Country", value);
      const states = countryStateData[value] || [];

      if (section === "ShippingAddress") {
        setAvailableStatesShipping(states);
        if (useSameAddress) {
          setAvailableStatesBilling(states);
          onAddressChange("BillingAddress", "Country", value);
        }
      } else {
        setAvailableStatesBilling(states);
      }

      onAddressChange(section, "State", "");

      const countryInfo = countryData[value];
      const initialPhone = countryInfo ? `${countryInfo.phoneCode} ` : "";
      onAddressChange(section, "PhoneNumber", initialPhone);

      if (useSameAddress && section === "ShippingAddress") {
        onAddressChange("BillingAddress", "State", "");
        onAddressChange("BillingAddress", "PhoneNumber", initialPhone);
      }

      setPostalCodeError(section, "");
      setPhoneNumberError(section, "");
      onAddressChange(section, "PostalCode", "");
      if (useSameAddress && section === "ShippingAddress") {
        onAddressChange("BillingAddress", "PostalCode", "");
      }
    };

    const validatePostalCode = (
      section: "ShippingAddress" | "BillingAddress",
      country: string,
      postalCode: string
    ): boolean => {
      if (!postalCode) {
        setPostalCodeError(section, "");
        return true;
      }

      const countryInfo = countryData[country];
      const regex = countryInfo?.postalCodeRegex;

      if (!regex && country) {
        setPostalCodeError(section, "");
        return true;
      }
      if (!country) {
        return true;
      }

      if (regex && !regex.test(postalCode)) {
        const sectionName =
          section === "ShippingAddress" ? "Shipping" : "Billing";
        setPostalCodeError(
          section,
          `Invalid ${sectionName} postal code format for ${country}.`
        );
        return false;
      }

      setPostalCodeError(section, "");
      return true;
    };

    const validatePhoneNumber = (
      section: "ShippingAddress" | "BillingAddress",
      country: string,
      phoneNumber: string
    ): boolean => {
      const countryInfo = countryData[country];
      if (!countryInfo) {
        // If no country is selected, we cannot validate properly. Clear error.
        if (!country) {
          setPhoneNumberError(section, "");
          return true;
        }
        setPhoneNumberError(section, "Invalid country selected.");
        return false;
      }

      const prefix = `${countryInfo.phoneCode} `;
      const numberWithoutPrefix = phoneNumber.startsWith(prefix)
        ? phoneNumber.substring(prefix.length).trim()
        : phoneNumber.startsWith(countryInfo.phoneCode)
        ? phoneNumber.substring(countryInfo.phoneCode.length).trim()
        : phoneNumber.trim();

      if (!numberWithoutPrefix) {
        setPhoneNumberError(section, "");
        return true;
      }

      const regex = countryInfo.phoneNumberRegex;

      if (!regex) {
        setPhoneNumberError(section, "");
        return true;
      }

      if (!regex.test(numberWithoutPrefix)) {
        const sectionName =
          section === "ShippingAddress" ? "Shipping" : "Billing";
        setPhoneNumberError(
          section,
          `Invalid ${sectionName} phone number format for ${country}.`
        );
        return false;
      }

      setPhoneNumberError(section, "");
      return true;
    };

    const handlePostalCodeChange = (
      section: "ShippingAddress" | "BillingAddress",
      value: string
    ) => {
      onAddressChange(section, "PostalCode", value);
      setPostalCodeError(section, "");
      if (useSameAddress && section === "ShippingAddress") {
        onAddressChange("BillingAddress", "PostalCode", value);
        setBillingPostalCodeError("");
      }
    };

    const handlePhoneNumberChange = (
      section: "ShippingAddress" | "BillingAddress",
      value: string
    ) => {
      const address =
        section === "ShippingAddress" ? shippingAddress : billingAddress;
      const country = address.Country;
      const countryInfo = countryData[country];

      let processedValue = value;
      let prefix = "";

      if (countryInfo) {
        prefix = `${countryInfo.phoneCode} `;

        if (!value.startsWith(prefix.trim())) {
          if (!value.startsWith(countryInfo.phoneCode)) {
            processedValue = prefix;
          } else {
            const numberPart = value.substring(countryInfo.phoneCode.length);
            const digitsOnly = numberPart.replace(/[^0-9]/g, "");
            processedValue = prefix + digitsOnly;
          }
        } else {
          const numberPart = value.substring(prefix.length);
          const digitsOnly = numberPart.replace(/[^0-9]/g, "");
          processedValue = prefix + digitsOnly;
        }
      } else {
        processedValue = value.replace(/[^0-9+\s]/g, ""); // Allow digits, plus, space if no country
      }

      onAddressChange(section, "PhoneNumber", processedValue);
      setPhoneNumberError(section, "");
      if (useSameAddress && section === "ShippingAddress") {
        onAddressChange("BillingAddress", "PhoneNumber", processedValue);
        setBillingPhoneNumberError("");
      }
    };

    const handlePostalCodeBlur = (
      section: "ShippingAddress" | "BillingAddress"
    ) => {
      const address =
        section === "ShippingAddress" ? shippingAddress : billingAddress;
      if (address.Country && address.PostalCode) {
        validatePostalCode(section, address.Country, address.PostalCode);
      } else {
        setPostalCodeError(section, "");
      }
    };

    const handlePhoneNumberBlur = (
      section: "ShippingAddress" | "BillingAddress"
    ) => {
      const address =
        section === "ShippingAddress" ? shippingAddress : billingAddress;
      if (address.Country && address.PhoneNumber) {
        const countryInfo = countryData[address.Country];

        if (
          countryInfo &&
          address.PhoneNumber.trim() !== countryInfo.phoneCode &&
          address.PhoneNumber.trim() !== `${countryInfo.phoneCode} `
        ) {
          validatePhoneNumber(section, address.Country, address.PhoneNumber);
        } else {
          setPhoneNumberError(section, "");
        }
      } else {
        setPhoneNumberError(section, "");
      }
    };

    useEffect(() => {
      if (useSameAddress) {
        onAddressChange(
          "BillingAddress",
          "FirstName",
          shippingAddress.FirstName
        );
        onAddressChange("BillingAddress", "LastName", shippingAddress.LastName);
        onAddressChange("BillingAddress", "Country", shippingAddress.Country);
        onAddressChange(
          "BillingAddress",
          "StreetAddress",
          shippingAddress.StreetAddress
        );
        onAddressChange("BillingAddress", "State", shippingAddress.State);
        onAddressChange("BillingAddress", "City", shippingAddress.City);
        onAddressChange(
          "BillingAddress",
          "PostalCode",
          shippingAddress.PostalCode
        );
        onAddressChange(
          "BillingAddress",
          "PhoneNumber",
          shippingAddress.PhoneNumber
        );
        setAvailableStatesBilling(availableStatesShipping); // Sync states
        setBillingPostalCodeError(shippingPostalCodeError); // Sync errors
        setBillingPhoneNumberError(shippingPhoneNumberError); // Sync errors
      }
    }, [
      useSameAddress,
      shippingAddress,
      onAddressChange,
      availableStatesShipping,
      shippingPostalCodeError,
      shippingPhoneNumberError,
    ]);

    useImperativeHandle(ref, () => ({
      validateForm: () => {
        const validateRequiredFields = (
          section: "ShippingAddress" | "BillingAddress",
          address: Address
        ) => {
          let valid = true;
          const newErrors: Record<keyof Address, string> = {} as any;

          const requiredFields: (keyof Address)[] = [
            "FirstName",
            "LastName",
            "Country",
            "StreetAddress",
            "State",
            "City",
            "PostalCode",
            "PhoneNumber",
          ];

          requiredFields.forEach((field) => {
            if (!address[field]?.trim()) {
              newErrors[field] = `${field} is required.`;
              valid = false;
            } else {
              newErrors[field] = "";
            }
          });

          if (section === "ShippingAddress") setShippingFieldErrors(newErrors);
          else setBillingFieldErrors(newErrors);

          return valid;
        };

        const shippingValid = validateRequiredFields(
          "ShippingAddress",
          shippingAddress
        );
        const billingValid = useSameAddress
          ? true
          : validateRequiredFields("BillingAddress", billingAddress);

        const postalPhoneValid =
          validatePostalCode(
            "ShippingAddress",
            shippingAddress.Country,
            shippingAddress.PostalCode
          ) &&
          validatePhoneNumber(
            "ShippingAddress",
            shippingAddress.Country,
            shippingAddress.PhoneNumber
          ) &&
          (useSameAddress ||
            (validatePostalCode(
              "BillingAddress",
              billingAddress.Country,
              billingAddress.PostalCode
            ) &&
              validatePhoneNumber(
                "BillingAddress",
                billingAddress.Country,
                billingAddress.PhoneNumber
              )));

        return shippingValid && billingValid && postalPhoneValid;
      },
    }));

    return (
      <div className="space-y-6">
        <div className="shadow-checkout p-6 rounded-24 space-y-6">
          <h2 className="Heading-20">Shipping Address:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="Title-16">
                First Name<span className="text-[#C90303]">*</span>
              </label>
              <input
                type="text"
                placeholder="First Name *"
                value={shippingAddress.FirstName}
                onChange={(e) => {
                  onAddressChange(
                    "ShippingAddress",
                    "FirstName",
                    e.target.value
                  );
                  setShippingFieldErrors((prev) => ({
                    ...prev,
                    FirstName: "",
                  }));
                }}
                className="w-full px-6 py-3 border border-[#E5E5E5] rounded-[4px]"
              />
              {renderError("ShippingAddress", "FirstName")}
            </div>
            <div className="space-y-1">
              <label className="Title-16">
                Last Name<span className="text-[#C90303]">*</span>
              </label>
              <input
                type="text"
                placeholder="Last Name *"
                value={shippingAddress.LastName}
                onChange={(e) => {
                  onAddressChange(
                    "ShippingAddress",
                    "LastName",
                    e.target.value
                  );
                  setShippingFieldErrors((prev) => ({ ...prev, LastName: "" }));
                }}
                className="w-full px-6 py-3 border border-[#E5E5E5] rounded-[4px]"
                required
              />
              {renderError("ShippingAddress", "LastName")}
            </div>
          </div>

          <div className="space-y-1">
            <label className="Title-16">
              Country<span className="text-[#C90303]">*</span>
            </label>
            {isCountryEditable ? (
              <div className="w-full pr-6 border bg-white border-[#E5E5E5] rounded-[4px]">
                <select
                  value={shippingAddress.Country}
                  onChange={(e) => {
                    handleCountryChange("ShippingAddress", e.target.value);
                    setShippingFieldErrors((prev) => ({
                      ...prev,
                      Country: "",
                    }));
                  }}
                  className="w-full px-6 py-3 bg-white appearance-none"
                  required>
                  <option value="" disabled>
                    Select Country
                  </option>
                  {allCountries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                {renderError("ShippingAddress", "Country")}
              </div>
            ) : (
              <input
                type="text"
                value={defaultCountry}
                readOnly
                className="w-full px-6 py-3 border border-[#E5E5E5] rounded-[4px] bg-gray-100"
              />
            )}
          </div>

          <div className="space-y-1">
            <label className="Title-16">
              Street Address<span className="text-[#C90303]">*</span>
            </label>
            <input
              type="text"
              placeholder="House Number and Street Name *"
              value={shippingAddress.StreetAddress}
              onChange={(e) => {
                onAddressChange(
                  "ShippingAddress",
                  "StreetAddress",
                  e.target.value
                );
                setShippingFieldErrors((prev) => ({
                  ...prev,
                  StreetAddress: "",
                }));
              }}
              className="w-full px-6 py-3 border border-[#E5E5E5] rounded-[4px]"
              required
            />
            {renderError("ShippingAddress", "StreetAddress")}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-1">
              <label className="Title-16">
                State<span className="text-[#C90303]">*</span>
              </label>
              <div className="w-full pr-6 border bg-white border-[#E5E5E5] rounded-[4px]">
                <select
                  value={shippingAddress.State}
                  onChange={(e) => {
                    onAddressChange("ShippingAddress", "State", e.target.value);
                    setShippingFieldErrors((prev) => ({ ...prev, State: "" }));
                  }}
                  className="w-full px-6 py-3 bg-white appearance-none"
                  required
                  disabled={!availableStatesShipping.length}>
                  <option value="" disabled>
                    Select State
                  </option>
                  {availableStatesShipping.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {renderError("ShippingAddress", "State")}
              </div>
            </div>
            <div className="space-y-1">
              <label className="Title-16">
                Town/City<span className="text-[#C90303]">*</span>
              </label>
              <input
                type="text"
                placeholder="Town / City *"
                value={shippingAddress.City}
                onChange={(e) => {
                  onAddressChange("ShippingAddress", "City", e.target.value);
                  setShippingFieldErrors((prev) => ({ ...prev, City: "" }));
                }}
                className="w-full px-6 py-3 border border-[#E5E5E5] rounded-[4px]"
                required
              />
              {renderError("ShippingAddress", "City")}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-1">
              <label className="Title-16">
                Post Code<span className="text-[#C90303]">*</span>
              </label>
              <input
                type="text"
                placeholder="Postal Code *"
                value={shippingAddress.PostalCode}
                onChange={(e) => {
                  handlePostalCodeChange("ShippingAddress", e.target.value);
                  setShippingFieldErrors((prev) => ({
                    ...prev,
                    PostalCode: "",
                  }));
                }}
                onBlur={() => {
                  handlePostalCodeBlur("ShippingAddress");
                  setShippingFieldErrors((prev) => ({
                    ...prev,
                    PostalCode: "",
                  }));
                }}
                className={`w-full px-6 py-3 border rounded-[4px] ${
                  shippingPostalCodeError
                    ? "border-red-500"
                    : "border-[#E5E5E5]"
                }`}
                required
              />
              {renderError("ShippingAddress", "PostalCode")}
              {shippingPostalCodeError && (
                <p className="text-red-500 text-sm">
                  {shippingPostalCodeError}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <label className="Title-16">
                Phone Number<span className="text-[#C90303]">*</span>
              </label>
              <input
                type="tel"
                placeholder="Phone Number *"
                value={shippingAddress.PhoneNumber}
                onChange={(e) => {
                  handlePhoneNumberChange("ShippingAddress", e.target.value);
                  setShippingFieldErrors((prev) => ({
                    ...prev,
                    PhoneNumber: "",
                  }));
                }}
                onBlur={() => handlePhoneNumberBlur("ShippingAddress")}
                className={`w-full px-6 py-3 border rounded-[4px] ${
                  shippingPhoneNumberError
                    ? "border-red-500"
                    : "border-[#E5E5E5]"
                }`}
                required
              />
              {renderError("ShippingAddress", "PhoneNumber")}
              {shippingPhoneNumberError && (
                <p className="text-red-500 text-sm">
                  {shippingPhoneNumberError}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="useSameAddressCheckbox"
              checked={useSameAddress}
              onChange={() => {
                setUseSameAddress(!useSameAddress);
              }}
              className="mr-2 h-4 w-4"
            />
            <label htmlFor="useSameAddressCheckbox">
              Use same address for <span className="text-primary">Billing</span>
            </label>
          </div>
        </div>

        {!useSameAddress && (
          <div className="shadow-checkout p-6 rounded-24 space-y-6 mt-6">
            <h2 className="Heading-20">Billing Address:</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="Title-16">
                  First Name<span className="text-[#C90303]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="First Name *"
                  value={billingAddress.FirstName}
                  onChange={(e) => {
                    onAddressChange(
                      "BillingAddress",
                      "FirstName",
                      e.target.value
                    );
                    setBillingFieldErrors((prev) => ({
                      ...prev,
                      FirstName: "",
                    }));
                  }}
                  className="w-full px-6 py-3 border border-[#E5E5E5] rounded-[4px]"
                  required
                />
                {renderError("BillingAddress", "FirstName")}
              </div>
              <div className="space-y-1">
                <label className="Title-16">
                  Last Name<span className="text-[#C90303]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Last Name *"
                  value={billingAddress.LastName}
                  onChange={(e) => {
                    onAddressChange(
                      "BillingAddress",
                      "LastName",
                      e.target.value
                    );
                    setBillingFieldErrors((prev) => ({
                      ...prev,
                      LastName: "",
                    }));
                  }}
                  className="w-full px-6 py-3 border border-[#E5E5E5] rounded-[4px]"
                  required
                />
                {renderError("BillingAddress", "LastName")}
              </div>
            </div>

            <div className="space-y-1">
              <label className="Title-16">
                Country<span className="text-[#C90303]">*</span>
              </label>
              <div className="w-full pr-6 border bg-white border-[#E5E5E5] rounded-[4px]">
                <select
                  value={billingAddress.Country}
                  onChange={(e) => {
                    handleCountryChange("BillingAddress", e.target.value);
                    setBillingFieldErrors((prev) => ({
                      ...prev,
                      Country: "",
                    }));
                  }}
                  className="w-full px-6 py-3 bg-white appearance-none"
                  required>
                  <option value="" disabled>
                    Select Country
                  </option>
                  {allCountries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                {renderError("BillingAddress", "Country")}
              </div>
            </div>

            <div className="space-y-1">
              <label className="Title-16">
                Street Address<span className="text-[#C90303]">*</span>
              </label>
              <input
                type="text"
                placeholder="House Number and Street Name *"
                value={billingAddress.StreetAddress}
                onChange={(e) => {
                  onAddressChange(
                    "BillingAddress",
                    "StreetAddress",
                    e.target.value
                  );
                  setBillingFieldErrors((prev) => ({
                    ...prev,
                    StreetAddress: "",
                  }));
                }}
                className="w-full px-6 py-3 border border-[#E5E5E5] rounded-[4px]"
                required
              />
              {renderError("BillingAddress", "StreetAddress")}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-1">
                <label className="Title-16">
                  State<span className="text-[#C90303]">*</span>
                </label>
                <div className="w-full pr-6 border bg-white border-[#E5E5E5] rounded-[4px]">
                  <select
                    value={billingAddress.State}
                    onChange={(e) => {
                      onAddressChange(
                        "BillingAddress",
                        "State",
                        e.target.value
                      );
                      setBillingFieldErrors((prev) => ({
                        ...prev,
                        State: "",
                      }));
                    }}
                    className="w-full px-6 py-3 bg-white appearance-none"
                    required
                    disabled={!availableStatesBilling.length} // Use availableStatesBilling
                  >
                    <option value="" disabled>
                      Select State
                    </option>
                    {availableStatesBilling.map(
                      (
                        state // Use availableStatesBilling
                      ) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      )
                    )}
                  </select>
                  {renderError("BillingAddress", "State")}
                </div>
              </div>
              <div className="space-y-1">
                <label className="Title-16">
                  Town / City<span className="text-[#C90303]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Town / City *"
                  value={billingAddress.City}
                  onChange={(e) => {
                    onAddressChange("BillingAddress", "City", e.target.value);
                    setBillingFieldErrors((prev) => ({
                      ...prev,
                      City: "",
                    }));
                  }}
                  className="w-full px-6 py-3 border border-[#E5E5E5] rounded-[4px]"
                  required
                />
                {renderError("BillingAddress", "City")}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-1">
                <label className="Title-16">
                  Postal Code<span className="text-[#C90303]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Postal Code *"
                  value={billingAddress.PostalCode}
                  onChange={(e) => {
                    handlePostalCodeChange("BillingAddress", e.target.value);
                    setBillingFieldErrors((prev) => ({
                      ...prev,
                      PostalCode: "",
                    }));
                  }}
                  onBlur={() => handlePostalCodeBlur("BillingAddress")}
                  className={`w-full px-6 py-3 border rounded-[4px] ${
                    billingPostalCodeError
                      ? "border-red-500"
                      : "border-[#E5E5E5]"
                  }`}
                  required
                />
                {renderError("BillingAddress", "PostalCode")}
                {billingPostalCodeError && (
                  <p className="text-red-500 text-sm">
                    {billingPostalCodeError}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <label className="Title-16">
                  Phone Number<span className="text-[#C90303]">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  value={billingAddress.PhoneNumber}
                  onChange={(e) => {
                    handlePhoneNumberChange("BillingAddress", e.target.value);
                    setBillingFieldErrors((prev) => ({
                      ...prev,
                      PhoneNumber: "",
                    }));
                  }}
                  onBlur={() => handlePhoneNumberBlur("BillingAddress")}
                  className={`w-full px-6 py-3 border rounded-[4px] ${
                    billingPhoneNumberError
                      ? "border-red-500"
                      : "border-[#E5E5E5]"
                  }`}
                  required
                />
                {renderError("BillingAddress", "PhoneNumber")}
                {billingPhoneNumberError && (
                  <p className="text-red-500 text-sm">
                    {billingPhoneNumberError}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default ShippingBillingForm;
