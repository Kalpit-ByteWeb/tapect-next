// app/careers/[route]/page.tsx
import { notFound } from 'next/navigation';
import { getJobOpeningByRoute } from '@/components/api/frappeService';
import JobOpeningDetails from '@/components/layouts/Jobs/JobOpeningDetails';
import type { JobOpening } from '@/components/layouts/Jobs/JobOpening'; 

export default async function Page(
  props: { params: { route: string } },
) {
  await Promise.resolve();

  const { route } = await props.params;
  if (!route) notFound();

  let job: JobOpening | null = null;
  let error: string | null = null;

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
  } catch (e: any) {
    error = e.message;
  }

  if (!job) notFound();

  return <JobOpeningDetails job={job}/>;
}
