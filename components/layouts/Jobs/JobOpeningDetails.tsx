'use client';

import React, { useState, useRef, useMemo } from 'react';
import Select from 'react-select';
import {
  createDoc,
  uploadFileToFrappe,
} from '@/components/api/frappeService';
import { CountryPhone } from '@/components/layouts/AboutUs/CountryPhone';
import { Button, Image } from '@/libs/Index';
import type { JobOpening } from './JobOpening';        

interface Props {
  job: JobOpening;
}

const JobOpeningDetails: React.FC<Props> = ({ job }) => {
  const [applicantName, setApplicantName] = useState('');
  const [emailId, setEmailId]       = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeAttachment, setResumeAttachment] = useState<File | null>(null);

  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState('');

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting]       = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const [countryCode, setCountryCode]           = useState('IN');
  const [countryDialingCode, setCountryDialingCode] = useState('+91');

  const countryOptions = useMemo(
    () =>
      CountryPhone.map((c) => ({
        value: c.code,
        label: `${c.flag} ${c.dialing_code}`,
        searchTerm: c.name,
      })),
    [],
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const isMeaningful = (txt: string) =>
    txt.trim() !== '' && !/^\.+$/.test(txt.trim());

  const handleCountryCodeChange = (opt: any) => {
    const selected = CountryPhone.find((c) => c.code === opt.value);
    if (selected) {
      setCountryCode(selected.code);
      setCountryDialingCode(selected.dialing_code);
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (/^\d*$/.test(v)) setPhoneNumber(v);
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && isMeaningful(currentSkill)) {
      e.preventDefault();
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill('');
    }
  };

  const handleSkillBlur = () => {
    if (isMeaningful(currentSkill)) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    const errs: Record<string, string> = {};
    if (!isMeaningful(applicantName)) errs.applicantName = 'Please enter Full Name';
    if (!isMeaningful(emailId))       errs.emailId       = 'Please enter Email Address';
    if (!isMeaningful(phoneNumber))   errs.phoneNumber   = 'Please enter Phone Number';
    if (!skills.length)               errs.skills        = 'Please enter at least one skill';
    if (!isMeaningful(coverLetter))   errs.coverLetter   = 'Please enter Cover Letter';
    if (!resumeAttachment)            errs.resume        = 'Please attach your resume';

    if (Object.keys(errs).length) {
      setFieldErrors(errs);
      return;
    }

    try {
      setIsSubmitting(true);

      let resumeUrl = '';
      try {
        if (resumeAttachment) resumeUrl = await uploadFileToFrappe(resumeAttachment);
      } catch {
      }

      await createDoc({
        doctype: 'Job Applicant',
        job_opening: job.name,
        applicant_name: applicantName,
        email_id: emailId,
        phone_number: countryDialingCode + phoneNumber,
        custom_skills_set: skills.join(', '),
        job_title: job.name,
        cover_letter: coverLetter,
        resume_attachment: resumeUrl,
      });

      /* reset state */
      setSubmissionSuccess(true);
      setApplicantName('');
      setEmailId('');
      setPhoneNumber('');
      setSkills([]);
      setCoverLetter('');
      setResumeAttachment(null);
      fileInputRef.current?.value && (fileInputRef.current.value = '');
      setTimeout(() => setSubmissionSuccess(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!job)                 return <div>Job opening not found</div>;

  return (
    <section>
      <div className="HeroBanner-light flex justify-center py-6 md:py-8">
        <div className="container mx-auto space-y-6">
          <h1 className="TitleHeading">{job.title}</h1>
          <p className="Title-18">Experience: {job.experience}</p>

          <div className="flex gap-[22px]">
            <div className="flex items-center gap-1">
              <img src="/Icons/on-site-grey.svg" alt="Location" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <img src="/Icons/full-time-grey.svg" alt="Type" />
              <span>{job.type}</span>
            </div>
          </div>

          <Button type="button">
            <a href="#careerform" className="btn-primary px-8 py-4 flex items-center gap-2">
              Apply Now
              <Image src="/Icons/ButtonIconWhite.svg" alt="Apply" />
            </a>
          </Button>
        </div>
      </div>

      <div className="container mx-auto py-12">
        <div
          className="Description-dark jb-description"
          dangerouslySetInnerHTML={{ __html: job.description }}
        />
      </div>

      <div id="careerform" className="container mx-auto p-6 mb-12">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="careerformlabel">Full Name</label>
              <input
                type="text"
                className="Careerformfield"
                placeholder="Full Name"
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
              />
              {fieldErrors.applicantName && (
                <p className="text-red-500 text-sm">{fieldErrors.applicantName}</p>
              )}
            </div>

            <div>
              <label className="careerformlabel">Email Address</label>
              <input
                type="email"
                className="Careerformfield"
                placeholder="Email Address"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
              {fieldErrors.emailId && (
                <p className="text-red-500 text-sm">{fieldErrors.emailId}</p>
              )}
            </div>
          </div>

          {/* phone & skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="careerformlabel">Phone Number</label>
              <div className="flex">
                <Select
                  options={countryOptions}
                  value={countryOptions.find((c) => c.value === countryCode)}
                  onChange={handleCountryCodeChange}
                  isSearchable
                  className="w-36 mr-2 mt-1"
                  classNamePrefix="custom-select"
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderRadius: 16,
                      borderColor: '#d1d5db',
                      boxShadow: 'none',
                      height: '100%',
                    }),
                  }}
                />
                <input
                  type="tel"
                  className="Careerformfield"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
              </div>
              {fieldErrors.phoneNumber && (
                <p className="text-red-500 text-sm">{fieldErrors.phoneNumber}</p>
              )}
            </div>

            <div>
              <label className="careerformlabel">Skills</label>
              <div className="Careerformfield flex flex-wrap gap-2">
                {skills.map((s, i) => (
                  <div
                    key={i}
                    className="bg-gray-100 px-3 py-1 rounded flex items-center gap-2"
                  >
                    <span>{s}</span>
                    <button
                      type="button"
                      onClick={() => setSkills(skills.filter((_, idx) => idx !== i))}
                    >
                      ×
                    </button>
                  </div>
                ))}

                <input
                  type="text"
                  className="bg-transparent focus:outline-none"
                  value={currentSkill}
                  onChange={(e) => setCurrentSkill(e.target.value)}
                  onKeyDown={handleSkillKeyDown}
                  onBlur={handleSkillBlur}
                  placeholder="Type and press Enter"
                />
              </div>
              {fieldErrors.skills && (
                <p className="text-red-500 text-sm">{fieldErrors.skills}</p>
              )}
            </div>
          </div>

          {/* vacancy & resume */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="careerformlabel">Vacancy</label>
              <input value={job.title} className="Careerformfield" readOnly />
            </div>

            <div>
              <label className="careerformlabel">Attach Resume</label>
              <input
                ref={fileInputRef}
                type="file"
                className="Careerformfield"
                onChange={(e) => setResumeAttachment(e.target.files?.[0] || null)}
              />
              {fieldErrors.resume && (
                <p className="text-red-500 text-sm">{fieldErrors.resume}</p>
              )}
            </div>
          </div>

          {/* cover letter */}
          <div>
            <label className="careerformlabel">Cover Letter</label>
            <textarea
              rows={6}
              className="Careerformfield"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Cover Letter"
            />
            {fieldErrors.coverLetter && (
              <p className="text-red-500 text-sm">{fieldErrors.coverLetter}</p>
            )}
          </div>

          {/* submit */}
          <div>
            <button type="submit" className="btn-primary py-4 px-8 flex gap-2">
              {isSubmitting ? 'Submitting…' : submissionSuccess ? 'Submitted!' : 'Submit'}
              <Image src="/Icons/ButtonIconWhite.svg" alt="Submit" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default JobOpeningDetails;
