// src/components/CareerPage/JobOpeningCard.tsx
import React from "react";
import Link  from "next/link";
import { JobOpening } from "./JobOpening";

interface JobOpeningCardProps {
  job: JobOpening;
}

const JobOpeningCard: React.FC<JobOpeningCardProps> = ({ job }) => {
  return (
    <div className="bg-[#F5F8FE] text-secondary p-6 rounded-20 flex flex-col shadow-featurecardvertical2">
      <div className="mb-4">
        <h3 className="Heading-20">{job.title}</h3>
      </div>
      <div className="flex flex-col sm:flex-row justify-between mt-auto gap-y-4 sm:gap-y-0">
        <div className="flex gap-3 mt-1 flex-wrap">
          <div className="flex flex-row items-center gap-1">
            <img src="/Icons/on-site.svg" alt="On Site" />
            <span className="Description-dark">{job.location}</span>
          </div>

          <div className="flex flex-row items-center gap-1">
            <img src="/Icons/full-time.svg" alt="JobOpenings Time" />
            <span className="Description-dark">{job.type}</span>
          </div>
        </div>
        <div className="flex flex-row sm:items-center justify-between items-baseline space-y-2 sm:space-y-0 sm:space-x-[22px] md:justify-end">
          <button className="Description-dark underline">
            <Link href={`/careers/${job.route}`}>View Details</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobOpeningCard;
