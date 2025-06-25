"use client";

import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { CountryPhone } from "../AboutUs/CountryPhone";
import Select from "react-select";
import { getUserCountry } from "@/libs/Assets/Geolocation";
import { getLeadSourceByDomain } from "@/libs/Assets/DomainWiseData";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  quantity: number;
  domain: string;
}

interface FormData {
  FirstName: string;
  LastName: string;
  Email: string;
  PhoneNumber: string;
  NumberOfEmployees: string;
  NumberOfCards: string;
  CompanyName: string;
  Message: string;
  CountryName: string;
  leadsource?: string;
  leadstatus?: string;
}

const PopLeadform: React.FC<ModalProps> = ({ show, onClose, quantity, domain }) => {
  const [formData, setFormData] = useState<FormData>({
    FirstName: "",
    LastName: "",
    Email: "",
    PhoneNumber: "",
    NumberOfEmployees: "",
    NumberOfCards: quantity.toString(),
    CompanyName: "",
    Message: "",
    CountryName: "",
    leadsource: getLeadSourceByDomain(domain),
    leadstatus: "New",
  });

  const [countryOptions, setCountryOptions] = useState<any[]>([]);
  const [countryCode, setCountryCode] = useState("IN");
  const [countryDialingCode, setCountryDialingCode] = useState("+91");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof FormData, string>>
  >({});

  useEffect(() => {
    const fetchCountry = async () => {
      const userCountry = await getUserCountry();

      let match = CountryPhone.find((c) => c.code === "IN");
      if (userCountry === "CA" || userCountry === "US") {
        match = CountryPhone.find((c) => c.code === "US");
      } else if (userCountry) {
        match = CountryPhone.find((c) => c.code === userCountry);
      }

      if (match) {
        setFormData((prev) => ({ ...prev, CountryName: match!.name }));
        setCountryCode(match!.code);
        setCountryDialingCode(match!.dialing_code);
      }
    };

    const options = CountryPhone.map((c) => ({
      value: c.code,
      label: `${c.flag} ${c.dialing_code}`,
      searchTerm: c.name,
    }));

    setCountryOptions(options);
    fetchCountry();
  }, []);

  useEffect(() => {
    if (show && quantity) {
      setFormData((prev) => ({
        ...prev,
        NumberOfCards: quantity.toString(),
      }));
    }
  }, [show, quantity]);

  if (!show) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFieldErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const handleCountryCodeChange = (selectedOption: any) => {
    const selected = CountryPhone.find((c) => c.code === selectedOption.value);
    if (selected) {
      setCountryCode(selected.code);
      setCountryDialingCode(selected.dialing_code);
      setFormData((prev) => ({
        ...prev,
        CountryName: selected.name,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setIsSubmitting(true);
    setSubmissionSuccess(false);

    const requiredFields: (keyof Omit<FormData, "CountryName">)[] = [
      "FirstName",
      "LastName",
      "Email",
      "PhoneNumber",
      "NumberOfEmployees",
      "NumberOfCards",
      "CompanyName",
      "Message",
    ];

    const labels: Record<keyof FormData, string> = {
      FirstName: "First Name",
      LastName: "Last Name",
      Email: "Email",
      PhoneNumber: "Phone Number",
      NumberOfEmployees: "Number of Employees",
      NumberOfCards: "Number of Cards",
      CompanyName: "Company Name",
      Message: "Message",
      CountryName: "Country",
      leadsource: "Lead Source",
      leadstatus: "Lead Status",
    };

    const errors: Partial<Record<keyof FormData, string>> = {};
    let hasErrors = false;

    requiredFields.forEach((field) => {
      const value = formData[field]?.trim() || "";
      if (!value) {
        errors[field] = `Please enter ${labels[field]}`;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setFieldErrors(errors);
      setIsSubmitting(false);
      return;
    }

    const phoneWithCode = countryDialingCode + formData.PhoneNumber;
    const url = process.env.NEXT_PUBLIC_BULK_ORDER_HUBSPOT_FORM_URL!;

    const payload = {
      fields: [
        { name: "firstname", value: formData.FirstName },
        { name: "lastname", value: formData.LastName },
        { name: "email", value: formData.Email },
        { name: "mobilephone", value: phoneWithCode },
        { name: "company", value: formData.CompanyName },
        { name: "number_of_employees", value: formData.NumberOfEmployees },
        { name: "no_of_cards", value: formData.NumberOfCards },
        { name: "message", value: formData.Message },
        { name: "country", value: formData.CountryName },
        { name: "leadsource", value: formData.leadsource },
        { name: "hs_lead_status ", value: formData.leadstatus },
      ],
      context: {
        pageUri: window.location.href,
        pageName: document.title,
      },
    };
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmissionSuccess(true);
        setFormData({
          FirstName: "",
          LastName: "",
          Email: "",
          PhoneNumber: "",
          NumberOfEmployees: "",
          NumberOfCards: "",
          CompanyName: "",
          Message: "",
          CountryName: "",
          leadsource: getLeadSourceByDomain(domain),
          leadstatus: "New",
        });

        setTimeout(() => {
          setSubmissionSuccess(false);
          onClose();
        }, 5000);
      } else {
        console.error("Submission failed:", await res.text());
      }
    } catch (err) {
      console.error("Error submitting to HubSpot", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center lg:items-center items-end z-50 overflow-y-auto">
      <div className="bg-white rounded-16 lg:p-12 p-6 pb-12 w-full max-w-[900px] items-center space-y-6 relative max-h-[91%] overflow-y-auto">
        <button
          className="absolute text-[20px] right-4 top-4"
          onClick={onClose}>
          <RxCross2 />
        </button>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* First & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["FirstName", "LastName"].map((field) => (
                <div key={field} className="space-y-1">
                  <label className="careerformlabel">
                    {field.replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={formData[field as keyof FormData]}
                    onChange={handleChange}
                    placeholder={field.replace(/([A-Z])/g, " $1")}
                    className="w-full border border-[#E5E5E5] p-3 rounded-[8px]"
                  />
                  {fieldErrors[field as keyof FormData] && (
                    <p className="text-red-500 text-sm">
                      {fieldErrors[field as keyof FormData]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="careerformlabel">Email</label>
                <input
                  type="email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  placeholder="Email Id"
                  className="w-full border border-[#E5E5E5] p-3 rounded-[8px]"
                />
                {fieldErrors.Email && (
                  <p className="text-red-500 text-sm">{fieldErrors.Email}</p>
                )}
              </div>
              <div className="space-y-1">
                <label className="careerformlabel">Phone Number</label>
                <div className="flex">
                  <Select
                    options={countryOptions}
                    value={countryOptions.find((c) => c.value === countryCode)}
                    onChange={handleCountryCodeChange}
                    isSearchable
                    className="w-48 mr-1"
                    classNamePrefix="custom-select"
                    styles={{
                      control: (base) => ({
                        ...base,
                        borderRadius: "8px",
                        borderColor: "#d1d5db",
                        boxShadow: "none",
                        height: "100%",
                      }),
                    }}
                  />
                  <input
                    type="text"
                    name="PhoneNumber"
                    value={formData.PhoneNumber}
                    onChange={handleChange}
                    placeholder="Phone number"
                    className="w-full border border-[#E5E5E5] p-3 rounded-[8px]"
                  />
                </div>
                {fieldErrors.PhoneNumber && (
                  <p className="text-red-500 text-sm">
                    {fieldErrors.PhoneNumber}
                  </p>
                )}
              </div>
            </div>

            {/* Employees & Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["NumberOfEmployees", "NumberOfCards"].map((field) => (
                <div key={field} className="space-y-1">
                  <label className="careerformlabel">
                    {field.replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    type="number"
                    name={field}
                    value={formData[field as keyof FormData]}
                    onChange={handleChange}
                    placeholder={field.replace(/([A-Z])/g, " $1")}
                    className="w-full border border-[#E5E5E5] p-3 rounded-[8px]"
                  />
                  {fieldErrors[field as keyof FormData] && (
                    <p className="text-red-500 text-sm">
                      {fieldErrors[field as keyof FormData]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Company Name */}
            <div className="space-y-1">
              <label className="careerformlabel">Company Name</label>
              <input
                type="text"
                name="CompanyName"
                value={formData.CompanyName}
                onChange={handleChange}
                placeholder="Company Name"
                className="w-full border border-[#E5E5E5] p-3 rounded-[8px]"
              />
              {fieldErrors.CompanyName && (
                <p className="text-red-500 text-sm">
                  {fieldErrors.CompanyName}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="space-y-1">
              <label className="careerformlabel">Message</label>
              <textarea
                name="Message"
                value={formData.Message}
                onChange={handleChange}
                rows={4}
                placeholder="Message"
                className="w-full border border-[#E5E5E5] p-3 rounded-[8px]"></textarea>
              {fieldErrors.Message && (
                <p className="text-red-500 text-sm">{fieldErrors.Message}</p>
              )}
            </div>

            <input
              type="text"
              name="leadsource"
              value={formData.leadsource}
              onChange={handleChange}
              placeholder="leadsource"
              className="hidden"
            />
            {fieldErrors.leadsource && (
              <p className="text-red-500 text-sm">{fieldErrors.leadsource}</p>
            )}
            <input
              type="text"
              name="leadstatus"
              value={formData.leadstatus}
              onChange={handleChange}
              placeholder="Lead Status"
              className="hidden"
            />
            {fieldErrors.leadstatus && (
              <p className="text-red-500 text-sm">{fieldErrors.leadstatus}</p>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="btn-primary px-8 py-3 rounded-[8px] w-full"
                disabled={isSubmitting}>
                {isSubmitting
                  ? "Submitting..."
                  : submissionSuccess
                  ? "Submitted!"
                  : "Submit Your Bulk Order Request"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopLeadform;
