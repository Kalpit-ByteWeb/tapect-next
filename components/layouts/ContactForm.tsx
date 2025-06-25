/* components/layouts/ContactForm.tsx */
'use client';

import { useEffect, useState } from 'react';
import Select from 'react-select';
import Link from 'next/link';
import { Button, Image } from '@/libs/Index';
import { CountryPhone } from './AboutUs/CountryPhone';
import { getUserCountry } from '@/libs/Assets/Geolocation';
import { getLeadSourceByDomain } from '@/libs/Assets/DomainWiseData';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  numberofemployees: string;
  message: string;
  countryName: string;
  leadsource?: string;
  leadstatus?: string;
}

interface ContactFormProps {
  icon: string;
  alt: string;
  title: string;
  description: string;
  link: string;
  label: string;
}

interface Props {
  ContactInfo: ContactFormProps[];
}

const ContactForm: React.FC<Props> = ({ ContactInfo }) => {
  const defaultCountryCode = 'IN';

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    numberofemployees: '',
    message: '',
    countryName: '',
    leadsource: getLeadSourceByDomain(),
    leadstatus: 'New',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof FormData, string>>
  >({});

  const [countryCode, setCountryCode] = useState(defaultCountryCode);
  const [countryDialingCode, setCountryDialingCode] = useState('+91');
  const [countryOptions, setCountryOptions] = useState<any[]>([]);

  const customStyles = {
    control: (base: any) => ({
      ...base,
      borderRadius: '16px',
      padding: '0.5rem 0',
      borderColor: '#d1d5db',
      boxShadow: 'none',
      '&:hover': { borderColor: '#a1a1aa' },
    }),
    menu: (base: any) => ({
      ...base,
      borderRadius: '0.75rem',
      backgroundColor: 'white',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected
        ? '#4a90e2'
        : state.isFocused
        ? '#e6f0ff'
        : 'white',
      color: state.isSelected ? 'white' : 'black',
    }),
  };

  useEffect(() => {
    const init = async () => {
      const userCountry = await getUserCountry();

      let match = CountryPhone.find((c) => c.code === defaultCountryCode);
      if (userCountry === 'CA' || userCountry === 'US') {
        match = CountryPhone.find((c) => c.code === 'US');
      } else if (userCountry) {
        match = CountryPhone.find((c) => c.code === userCountry);
      }

      if (match) {
        setCountryCode(match.code);
        setCountryDialingCode(match.dialing_code);
        setFormData((p) => ({ ...p, countryName: match!.name }));
      }
    };

    const opts = CountryPhone.map((c) => ({
      value: c.code,
      label: `${c.flag} ${c.dialing_code}`,
      searchTerm: c.name,
    }));
    setCountryOptions(opts);
    init();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    setFieldErrors((errs) => ({ ...errs, [name]: undefined }));
  };

  const handleCountryCodeChange = (opt: any) => {
    const selected = CountryPhone.find((c) => c.code === opt.value);
    if (selected) {
      setCountryCode(selected.code);
      setCountryDialingCode(selected.dialing_code);
      setFormData((p) => ({ ...p, countryName: selected.name }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);
    setFieldErrors({});
    setIsSubmitting(true);
    setSubmissionSuccess(false);

    const required: (keyof FormData)[] = [
      'fullName',
      'email',
      'phone',
      'company',
      'numberofemployees',
      'message',
    ];

    const errs: Partial<Record<keyof FormData, string>> = {};
    required.forEach((f) => {
      if (!formData[f]) errs[f] = `Please fill in the ${f} field.`;
    });

    if (Object.keys(errs).length) {
      setFieldErrors(errs);
      setIsSubmitting(false);
      return;
    }

    const url = process.env.NEXT_PUBLIC_HUBSPOT_FORM_URL || '';
    const payload = {
      fields: [
        { name: 'firstname', value: formData.fullName },
        { name: 'email', value: formData.email },
        { name: 'mobilephone', value: countryDialingCode + formData.phone },
        { name: 'number_of_employees', value: formData.numberofemployees },
        { name: 'message', value: formData.message },
        { name: 'company', value: formData.company },
        { name: 'country', value: formData.countryName },
        { name: 'leadsource', value: formData.leadsource },
        { name: 'hs_lead_status ', value: formData.leadstatus },
      ],
      context: {
        pageUri: window.location.href,
        pageName: document.title,
      },
    };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        try {
          await res.json();
        } catch {}
        setSubmissionSuccess(true);
        setTimeout(() => setSubmissionSuccess(false), 3000);

        setFormData({
          fullName: '',
          email: '',
          phone: '',
          company: '',
          numberofemployees: '',
          message: '',
          countryName: '',
          leadsource: getLeadSourceByDomain(),
          leadstatus: 'New',
        });
      } else {
        setSubmissionError('There was an error submitting the form.');
      }
    } catch {
      setSubmissionError('There was an error submitting the form.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="px-0 py-0 mt-12 ">
      <div className="container flex flex-col justify-center gap-y-12 relative mx-auto lg:gap-x-[90px] xl:gap-x-[110px]  pb-60 border-[#E5E5E5]">
        {/* left: contact info cards */}
        <div className="grid md:grid-cols-2 herobannermax:grid-cols-1 gap-y-12 gap-x-6 w-full lg:w-[520px]">
          {ContactInfo.map((c, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center gap-2">
                <img src={c.icon} alt={c.alt} />
                <h3 className="Title-24 text-secondary">{c.title}</h3>
              </div>
              <p className="Description">{c.description}</p>
              <Button type="button">
                <Link
                  href={c.link}
                  className="text-sm font-semibold font-primary underline text-primary"
                >
                  {c.label}
                </Link>
              </Button>
            </div>
          ))}
        </div>

        {/* right: form */}
        <div className=" bg-white z-20 rounded-16 space-y-[62px] w-full xl:w-[652px] xl:absolute block right-0 herobannermax:top-[-400px]   xl:p-12 xl:shadow-[0px_4px_4px_0px_#00000040]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full name */}
            <div className="w-full">
              <label className="careerformlabel">Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="Careerformfield"
                required
              />
              {fieldErrors.fullName && (
                <p className="text-red-500 text-sm">{fieldErrors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div className="w-full">
              <label className="careerformlabel">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="Careerformfield"
                required
              />
              {fieldErrors.email && (
                <p className="text-red-500 text-sm">{fieldErrors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div className="w-full">
              <label className="careerformlabel">Phone Number</label>
              <div className="flex items-baseline">
                <Select
                  options={countryOptions}
                  value={countryOptions.find((o) => o.value === countryCode)}
                  onChange={handleCountryCodeChange}
                  isSearchable
                  defaultInputValue={formData.countryName}
                  styles={customStyles}
                  className="w-48 mr-2"
                  classNamePrefix="custom-select"
                  filterOption={(o, v) =>
                    o.data.searchTerm.toLowerCase().includes(v.toLowerCase())
                  }
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="Careerformfield flex-grow"
                  required
                />
              </div>
              {fieldErrors.phone && (
                <p className="text-red-500 text-sm">{fieldErrors.phone}</p>
              )}
            </div>

            {/* Company */}
            <div className="w-full">
              <label className="careerformlabel">Company Name</label>
              <input
                type="text"
                name="company"
                placeholder="Company Name"
                value={formData.company}
                onChange={handleChange}
                className="Careerformfield"
              />
            </div>

            {/* Employees */}
            <div className="w-full">
              <label className="careerformlabel">No of Employees</label>
              <div className="w-full border border-[#E5E5E5] rounded-16 mt-1">
                <select
                  name="numberofemployees"
                  value={formData.numberofemployees}
                  onChange={handleChange}
                  className="bg-white w-full p-4 rounded-16"
                  required
                >
                  <option value="" disabled>
                    Select No. of Employees
                  </option>
                  <option value="1-5">1-5</option>
                  <option value="5-25">5-25</option>
                  <option value="25-50">25-50</option>
                  <option value="50-100">50-100</option>
                  <option value="100-500">100-500</option>
                  <option value="500-1000">500-1000</option>
                  <option value="1000+">1000+</option>
                </select>
              </div>
              {fieldErrors.numberofemployees && (
                <p className="text-red-500 text-sm">
                  {fieldErrors.numberofemployees}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="relative">
              <label className="careerformlabel">Message</label>
              <textarea
                name="message"
                placeholder="Enter Message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="Careerformfield"
                required
              />
              {fieldErrors.message && (
                <p className="text-red-500 text-sm">{fieldErrors.message}</p>
              )}
            </div>

            {/* hidden lead source / status inputs */}
            <input
              type="text"
              name="leadsource"
              value={formData.leadsource}
              onChange={handleChange}
              className="hidden"
            />
            <input
              type="text"
              name="leadstatus"
              value={formData.leadstatus}
              onChange={handleChange}
              className="hidden"
            />

            {/* submission error */}
            {submissionError && (
              <p className="text-red-500 text-sm">{submissionError}</p>
            )}

            {/* submit button */}
            <div>
              <button
                type="submit"
                className="btn-primary py-4 px-8 flex gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? 'Submitting...'
                  : submissionSuccess
                  ? 'Submitted!'
                  : 'Get Started Now '}
                {!isSubmitting && !submissionSuccess && (
                  <Image src="/Icons/ButtonIconWhite.svg" alt="Button Icon" />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
