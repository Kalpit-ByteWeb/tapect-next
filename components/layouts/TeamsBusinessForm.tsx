'use client';
import Select from "react-select";
import { useState, useEffect } from 'react';
import { Image } from '@/libs/Index';
import { CountryPhone } from './AboutUs/CountryPhone';
import { getUserCountry } from '@/libs/Assets/Geolocation';
import { getLeadSourceByDomain } from '@/libs/Assets/DomainWiseData';

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  workEmail: string;
  jobTitle: string;
  companyName: string;
  numberOfEmployees: string;
  numberOfDigitalCards: string;
  message: string;
  countryName: string;
  leadsource?: string;
  leadstatus?: string;
}

interface Props {
  Title: string;
  Description: string;
  Domain:string;
}

const TeamsBusinessForm: React.FC<Props> = ({ Title, Description,Domain }) => {
  const defaultCountryCode = 'IN';
  const customStyles = {
    control: (base: any) => ({
      ...base,
      borderRadius: "16px",
      padding: "0.5rem 0",
      borderColor: "#d1d5db",
      boxShadow: "none",
      "&:hover": { borderColor: "#a1a1aa" },
    }),
    menu: (base: any) => ({
      ...base,
      borderRadius: "0.75rem",
      backgroundColor: "white",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#4a90e2"
        : state.isFocused
        ? "#e6f0ff"
        : "white",
      color: state.isSelected ? "white" : "black",
    }),
  };
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    workEmail: '',
    jobTitle: '',
    companyName: '',
    numberOfEmployees: '',
    numberOfDigitalCards: '',
    message: '',
    countryName: '',
    leadsource: getLeadSourceByDomain(Domain),
    leadstatus: 'New',
  });

  const [countryCode, setCountryCode] = useState(defaultCountryCode);
  const [countryDialingCode, setCountryDialingCode] = useState('+91');
  const [countryOptions, setCountryOptions] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof FormData, string>>
  >({});

  useEffect(() => {
    const fetchCountry = async () => {
      const userCountry = await getUserCountry();
      let matchedCountry =
        userCountry === 'CA' || userCountry === 'US'
          ? CountryPhone.find((c) => c.code === 'US')
          : CountryPhone.find((c) => c.code === userCountry) ||
            CountryPhone.find((c) => c.code === defaultCountryCode);

      if (matchedCountry) {
        setFormData((prev) => ({
          ...prev,
          countryName: matchedCountry.name,
        }));
        setCountryCode(matchedCountry.code);
        setCountryDialingCode(matchedCountry.dialing_code);
      }
    };

    setCountryOptions(
      CountryPhone.map((country) => ({
        value: country.code,
        label: `${country.flag} ${country.dialing_code}`,
        searchTerm: country.name,
      }))
    );

    fetchCountry();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleCountryCodeChange = (selectedOption: any) => {
    const selected = CountryPhone.find((c) => c.code === selectedOption.value);
    if (selected) {
      setCountryCode(selected.code);
      setCountryDialingCode(selected.dialing_code);
      setFormData((prev) => ({ ...prev, countryName: selected.name }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionError(null);
    setSubmissionSuccess(false);

    const requiredFields: (keyof FormData)[] = [
      'firstName',
      'lastName',
      'phoneNumber',
      'workEmail',
      'jobTitle',
      'companyName',
      'numberOfEmployees',
      'numberOfDigitalCards',
      'message',
    ];

    const errors: Partial<Record<keyof FormData, string>> = {};
    for (const field of requiredFields) {
      if (!formData[field]?.trim()) {
        errors[field] = `Please enter ${field}`;
      }
    }

    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      setIsSubmitting(false);
      return;
    }

    const fullPhoneNumber = countryDialingCode + formData.phoneNumber;
    const url = process.env.NEXT_PUBLIC_TB_HUBSPOT_FORM_URL;

    const payload = {
      fields: [
        { name: 'firstname', value: formData.firstName },
        { name: 'lastname', value: formData.lastName },
        { name: 'mobilephone', value: fullPhoneNumber },
        { name: 'email', value: formData.workEmail },
        { name: 'jobtitle', value: formData.jobTitle },
        { name: 'company', value: formData.companyName },
        { name: 'number_of_employees', value: formData.numberOfEmployees },
        { name: 'no_of_cards', value: formData.numberOfDigitalCards },
        { name: 'message', value: formData.message },
        { name: 'country', value: formData.countryName },
        { name: 'leadsource', value: formData.leadsource },
        { name: 'hs_lead_status', value: formData.leadstatus },
      ],
      context: {
        pageUri: window.location.href,
        pageName: document.title,
      },
    };

    try {
      const res = await fetch(url!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmissionSuccess(true);
        setFormData({
          firstName: '',
          lastName: '',
          phoneNumber: '',
          workEmail: '',
          jobTitle: '',
          companyName: '',
          numberOfEmployees: '',
          numberOfDigitalCards: '',
          message: '',
          countryName: '',
          leadsource: getLeadSourceByDomain(Domain),
          leadstatus: 'New',
        });
        setTimeout(() => setSubmissionSuccess(false), 3000);
      } else {
        setSubmissionError('Failed to submit. Please try again.');
      }
    } catch (err) {
      setSubmissionError('Submission failed. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-60">
      <div className="bg-secondary lg:px-120 md:px-12">
        <div className="container mx-auto space-y-12 py-12">
          <div className="space-y-4 text-center">
            <h2 className="BannerTitle text-white">{Title}</h2>
            <p className="Description max-w-[858px] text-white mx-auto">
              {Description}
            </p>
          </div>
          <div className="bg-white rounded-16 md:p-10 p-6 max-w-[1142px] mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                <div className="w-full">
                  <label className="careerformlabel">First Name</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="Careerformfield"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                  {fieldErrors.firstName && (
                    <p className="text-red-500 text-sm">
                      {fieldErrors.firstName}
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div className="w-full">
                  <div className="relative">
                    <label className="careerformlabel">Last Name</label>
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="Careerformfield"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                    {fieldErrors.lastName && (
                      <p className="text-red-500 text-sm">
                        {fieldErrors.lastName}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                {/*phone number*/}
                <div className="w-full">
                  <div className="relative">
                    <label className="careerformlabel">Phone Number</label>
                    <div className="flex items-baseline">
                      <Select
                        options={countryOptions}
                        value={countryOptions.find(
                          (option: any) => option.value === countryCode
                        )}
                        onChange={handleCountryCodeChange}
                        isSearchable
                        defaultInputValue={formData.countryName}
                        styles={customStyles}
                        className="w-48 mr-1"
                        classNamePrefix="custom-select"
                        filterOption={(option, inputValue) =>
                          option.data.searchTerm
                            .toLowerCase()
                            .includes(inputValue.toLowerCase())
                        }
                      />
                      <input
                        type="tel"
                        placeholder="Phone number"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="Careerformfield flex-grow"
                        required
                      />
                    </div>
                    {fieldErrors.phoneNumber && (
                      <p className="text-red-500 text-sm">
                        {fieldErrors.phoneNumber}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email Address */}
                <div className="w-full">
                  <div className="relative">
                    <label className="careerformlabel">Work Email</label>
                    <input
                      type="email"
                      placeholder="Work Email"
                      className="Careerformfield"
                      name="workEmail"
                      value={formData.workEmail}
                      onChange={handleChange}
                      required
                    />
                    {fieldErrors.workEmail && (
                      <p className="text-red-500 text-sm">
                        {fieldErrors.workEmail}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                <div className="w-full">
                  <label className="careerformlabel">Job Title</label>
                  <input
                    type="text"
                    placeholder="Job Title"
                    className="Careerformfield"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    required
                  />
                  {fieldErrors.jobTitle && (
                    <p className="text-red-500 text-sm">
                      {fieldErrors.jobTitle}
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div className="w-full">
                  <div className="relative">
                    <label className="careerformlabel">Company Name</label>
                    <input
                      type="text"
                      placeholder="Company Name"
                      className="Careerformfield"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                    />
                    {fieldErrors.companyName && (
                      <p className="text-red-500 text-sm">
                        {fieldErrors.companyName}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                <div className="w-full">
                  <label className="careerformlabel">
                    No of People Work in your Company
                  </label>
                  <input
                    type="number"
                    min={0}
                    placeholder="No of People Work in your Company"
                    className="Careerformfield"
                    name="numberOfEmployees"
                    value={formData.numberOfEmployees}
                    onChange={handleChange}
                    required
                  />
                  {fieldErrors.numberOfEmployees && (
                    <p className="text-red-500 text-sm">
                      {fieldErrors.numberOfEmployees}
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div className="w-full">
                  <div className="relative">
                    <label className="careerformlabel">
                      How Many Digital Business Card You Want?
                    </label>
                    <input
                      type="text"
                      placeholder="How Many Digital Business Card You Want?"
                      className="Careerformfield"
                      name="numberOfDigitalCards"
                      value={formData.numberOfDigitalCards}
                      onChange={handleChange}
                      required
                    />
                    {fieldErrors.numberOfDigitalCards && (
                      <p className="text-red-500 text-sm">
                        {fieldErrors.numberOfDigitalCards}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="relative">
                <label className="careerformlabel">Message</label>
                <textarea
                  placeholder="Enter Message"
                  rows={6}
                  className="Careerformfield"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}></textarea>
                {fieldErrors.message && (
                  <p className="text-red-500 text-sm">{fieldErrors.message}</p>
                )}
              </div>

              {submissionError && (
                <div className="text-red-500 text-sm">{submissionError}</div>
              )}
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
              <button
                type="submit"
                className="btn-primary py-4 px-8 flex gap-2 mx-auto"
                disabled={isSubmitting}>
                {isSubmitting
                  ? 'Submitting...'
                  : submissionSuccess
                  ? 'Submitted!'
                  : 'Get Started Now'}
                <Image src="/Icons/ButtonIconWhite.svg" alt="Button Icon" />
              </button>
              {submissionError && (
                <p className="text-red-500 text-sm mt-2">{submissionError}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamsBusinessForm;
