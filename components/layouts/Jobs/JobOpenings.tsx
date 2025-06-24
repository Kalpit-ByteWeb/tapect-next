import React from "react";
import JobOpeningCard from "./JobOpeningCard";
import { JobOpening } from "./JobOpening";
import { getJobOpenings } from "@/components/api/frappeService"; // adjust path as per project
import { notFound } from "next/navigation";

interface JobOpeningsProps {
  Title: string;
  TitleHighlight: string;
  Description: string;
}

const JobOpenings = async ({ Title, TitleHighlight, Description }: JobOpeningsProps) => {
  try {
    const frappeJobs = await getJobOpenings();

    const publishedJobs = frappeJobs.filter((job: any) => job.publish === 1);

    const mappedJobs: JobOpening[] = publishedJobs.map((frappeJob) => ({
      id: parseInt(frappeJob.name),
      name: frappeJob.name,
      title: frappeJob.job_title,
      experience: frappeJob.custom_experience,
      location: frappeJob.location,
      type: frappeJob.custom_job_timing,
      route: frappeJob.route,
      publish: frappeJob.publish,
      description: frappeJob.description,
      responsibilities: frappeJob.responsibilities,
      skillsQualifications: frappeJob.skillsQualifications,
      whatWeOffer: frappeJob.whatWeOffer,
    }));

    if (!mappedJobs.length) {
      return (
        <section className="container mx-auto py-60 px-6 text-center">
          <h2 className="TitleHeading">
            {Title} <span className="text-primary">{TitleHighlight}</span>
          </h2>
          <p className="Description-dark">{Description}</p>
          <p className="mt-6 text-gray-500">No job openings available right now.</p>
        </section>
      );
    }

    return (
      <section id="job-openings" className="container mx-auto py-60 px-6">
        <div className="mb-12 text-center">
          <h2 className="TitleHeading">
            {Title} <span className="text-primary">{TitleHighlight}</span>
          </h2>
          <p className="Description-dark">{Description}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 md:gap-y-12">
          {mappedJobs.map((job) => (
            <JobOpeningCard key={job.name} job={job} />
          ))}
        </div>
      </section>
    );
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    // You can optionally render a fallback UI or rethrow
    notFound(); // or return a custom <ErrorComponent />
  }
};

export default JobOpenings;
