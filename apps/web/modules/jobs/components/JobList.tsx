'use client';

import { AdvertFragment, PartialAdvertFragment } from '@erecruitment/client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { z } from 'zod';
import { ListDisplay } from '~/modules/shared';

const schema = z.object({
  id: z.string(),
  requisitionId: z.string(),
  title: z.string(),
  positionTitle: z.string(),
  location: z.string(),
  status: z.string(),
});

type SchemaType = z.infer<typeof schema>;

export const JobList = ({ jobs }: JobList) => {
  const router = useRouter();

  const handleClick = async (job: SchemaType) => {
    router.push(`/dashboard/jobs/${job.id}`);
  };

  return (
    <ListDisplay data={jobs} schema={schema} onItemSelect={handleClick} title="List of jobs" />
  );
};

type JobList = {
  jobs: PartialAdvertFragment[];
};
