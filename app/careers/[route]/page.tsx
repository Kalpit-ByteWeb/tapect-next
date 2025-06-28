// app/careers/[route]/page.tsx
import { notFound } from 'next/navigation';
import { getJobOpeningByRoute as fetchJob } from '@/components/api/frappeService';
import JobOpeningDetails from '@/components/layouts/Jobs/JobOpeningDetails';
import type { JobOpening } from '@/components/layouts/Jobs/JobOpening';
import { unstable_cache } from 'next/cache';

export const revalidate = 60;

const getJobOpeningByRoute = unstable_cache(
  fetchJob,
  (route) => ['job-opening', route],
  { revalidate }
);

export default async function Page({ params }: { params: { route: string } }) {
  const { route } = params;
  if (!route) notFound();

  let job: JobOpening | null = null;

  try {
    const frappeJob = await getJobOpeningByRoute(route);
    if (!frappeJob) throw new Error('Job opening not found.');

    job = {
      id: Number(frappeJob.name),
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
    };
  } catch {
    notFound();
  }

  return <JobOpeningDetails job={job} />;
}
