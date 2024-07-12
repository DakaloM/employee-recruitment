'use client';

import { AdvertFragment, AnswerFragment } from '@erecruitment/client';

import { Eye } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import TimeAgo from 'timeago-react';
import { ItemLabel } from '~/modules/shared';

import { useAnswers } from '../hooks';
import { executeApi } from '~/client/api';
import { set } from 'lodash';

export const JobDetails = ({ job, applicantId }: JobDetailsProps) => {
  const [answers, setAnswers] = useState<AnswerFragment[]>([]);

  useEffect(() => {

    const getAnswers = async () => {
      try {
        const data = await executeApi('answers', {applicantId, refId: job.id});
        setAnswers(data)
      } catch (error) {
        console.log(error)
      }
    }

    getAnswers();
  }, [job.id, applicantId]);

  console.log(answers)

  return (
    <div className="w-full flex flex-col gap-4 h-full rounded-lg p-4 items-start">
      <div className="flex items-center justify-between gap-4 w-full">
        <h1 className="font-semibold">Job Details </h1>
        <Link
          href={`/dashboard/jobs/${job.id}`}
          className="flex items-center gap-2 min-w-max text-secondary hover:underline hover:scale-105 transition-all"
        >
          <Eye size={20} />
          <span className="text-inherit text-sm">View job</span>
        </Link>
      </div>

      <div className="w-full flex flex-col gap-2 items-start p-8 border rounded-lg">
        <ItemLabel label="Title" value={job.positionTitle} />

        <ItemLabel label="Location" value={job.location} />

        <div className="flex items-center ">
          <span className="text-xs font-semibold text-primary">Posted</span>

          <TimeAgo datetime={job.createdAt} className="text-xs font-semibold text-primary ml-2" />
        </div>
      </div>
    </div>
  );
};

type JobDetailsProps = {
  job: AdvertFragment;
  applicantId: string;
};
