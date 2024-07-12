'use client';

import { ApplicationFragment } from '@erecruitment/client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { z } from 'zod';
import { ListDisplay } from '~/modules/shared';

export const schema = z.object({
  id: z.string(),
  jobTitle: z.string(),
  applicant: z.string(),
  date: z.string(),
  status: z.string(),
});

type SchemaType = z.infer<typeof schema>;

export const ApplicationList = ({ applications }: ApplicationListProps) => {
  const list = applications.map((application) => {
    return {
      id: application.id,
      jobTitle: application.jobTitle,
      applicant: application.name + ' ' + application.surname,
      date: application.createdAt,
      status: application.status,
      sequence: application.sequence,
    };
  });

  const router = useRouter();

  const handleClick = async (application: SchemaType) => {
    router.push(`/dashboard/applications/${application.id}`);
  };
  return (
    <ListDisplay
      data={list}
      schema={schema}
      onItemSelect={handleClick}
      title="List of applications"
    />
  );
};

type ApplicationListProps = {
  applications: ApplicationFragment[];
};
