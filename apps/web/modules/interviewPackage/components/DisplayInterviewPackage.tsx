'use client';

import { FullInterViewPackageFragment, QuestionType } from '@erecruitment/client';

import {
  Calendar,
  Clock,
  HelpCircle,
  Info,
  MailQuestion,
  MapPin,
  MessageCircle,
} from 'lucide-react';
import React from 'react';
import { formatDate } from 'utils/formatDate';
import { NewQuestion } from '~/modules/question';
import { ItemLabel } from '~/modules/shared';

export const DisplayInterviewPackage = ({ interviewPackage }: DisplayInterviewPackageProps) => {
  console.log(interviewPackage);

  return (
    <div className="flex flex-wrap gap-4 gap-y-8 place-items-center">
      <div className="w-full md:w-2/4 p-8 rounded-lg bg-white shadow-lg border border-gray-200">
        <div className="w-max gap-8 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Interview Information</h2>
          {/* <Info size={38} className="text-primary" /> */}
        </div>

        <div className="w-full mt-4 flex flex-col gap-4 gap-y-6">
          <ItemLabel label="Location" value={interviewPackage.location} Icon={MapPin} />

          <ItemLabel label="Date" value={formatDate(interviewPackage.date)} Icon={Calendar} />

          <ItemLabel label="Time" value={interviewPackage.time} Icon={Clock} />

          <ItemLabel
            label="Instructions"
            value={interviewPackage.description}
            Icon={MessageCircle}
          />
        </div>
      </div>

      <div className="w-full md:w-2/3 p-8 rounded-lg bg-white shadow-lg border border-gray-200">
        <div className="w-full gap-8 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Interview Questions</h2>
          {/* <HelpCircle size={38} className="text-primary" /> */}
          <NewQuestion refId={interviewPackage.jobId} type={QuestionType.Interview}/>
        </div>
      </div>

      <div className="w-full md:w-1/3 p-8 rounded-lg bg-white shadow-lg border border-gray-200"></div>
    </div>
  );
};

type DisplayInterviewPackageProps = {
  interviewPackage: FullInterViewPackageFragment;
};
