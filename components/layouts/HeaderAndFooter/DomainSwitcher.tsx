'use client';

import React from 'react';
import Image from 'next/image';
import { getDomain } from '@/libs/Assets/DomainWiseData'; // Adjust this path if needed

const DOMAIN_OPTIONS = [
  { label: 'tapect.com (USD $)', value: 'tapect.com' },
  { label: 'tapect.in (INR ₹)', value: 'tapect.in' },
  { label: 'tapect.ae (AED د.إ)', value: 'tapect.ae' },
  { label: 'tapect.de (EUR €)', value: 'tapect.de' },
  { label: 'tapect.au (AUD $)', value: 'tapect.au' },
];

const DomainSwitcher = () => {
  const currentDomain = getDomain();

  const handleDomainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDomain = e.target.value;
    if (selectedDomain !== currentDomain) {
      window.open(`https://${selectedDomain}`, '_blank');
    }
  };

  const currentOption = DOMAIN_OPTIONS.find(
    (option) => option.value === currentDomain
  );

  const otherOptions = DOMAIN_OPTIONS.filter(
    (option) => option.value !== currentDomain
  );

  return (
    <div className="border border-white px-4 rounded-[50px] flex items-center">
      <Image
        src="/Icons/DomainSwitecher-Icon.svg"
        alt="Domain Switcher icon"
        width={20}
        height={20}
        className="w-5 h-5"
      />
      <select
        onChange={handleDomainChange}
        className="text-white bg-transparent pr-4 pl-2 py-3 outline-none cursor-pointer font-primary text-[14px]"
        value={currentDomain}>
        {currentOption && (
          <option
            value={currentOption.value}
            className="text-secondary hidden"
            disabled>
            {currentOption.label}
          </option>
        )}
        {otherOptions.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="text-secondary">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DomainSwitcher;