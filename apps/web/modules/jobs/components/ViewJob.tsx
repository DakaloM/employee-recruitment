"use client";
import {
  AdvertStatus,
  FullAdvertFragment,
  QuestionFragment,
} from "@erecruitment/client";
import { FullRequisitionFragment } from "@erecruitment/client/dist/__generated__/graphql";
import { Badge } from "@erecruitment/ui";
import { formatDate } from "@erecruitment/utils";
import { QuestionType } from "@erecruitment/client";
import {
  Briefcase,
  Calendar,
  Contact2,
  Footprints,
  MapPin,
  Workflow,
} from "lucide-react";
import React from "react";
import TimeAgo from "timeago-react";
import { NewQuestion, Question } from "~/modules/question";
import { ItemLabel } from "~/modules/shared";
import { JobActionButtons } from "./JobActionButtons";

export const ViewJob = ({ job, requisition }: ViewJobProps) => {
  const manager = JSON.parse(requisition?.position.manager);
  const questions = job.questions as QuestionFragment[];

  return (
    <div className="w-full flex item-start justify-between gap-10 relative pt-14">

      <div className="absolute top-0 right-0">
          <JobActionButtons job={job}/>
      </div>
      <div className="flex flex-col p-8 border border-gray-200 rounded-lg flex-1 shadow-md gap-y-2">
        <div className="flex flex-col md:flex-row w-full justify-between items-center gap-y-4">
          <h1 className="text-xl font-bold mb-6">Job details</h1>

          <TimeAgo
            datetime={job.createdAt}
            className="text-xs font-semibold text-primary ml-2"
          />
        </div>

        <div className="w-full flex items-center justify-start gap-x-4 mb-6">
          <Badge>{requisition?.employmentType}</Badge>
          <Badge>{requisition?.workplace}</Badge>
          <Badge
            variant={job.status === AdvertStatus.Open ? "success" : "default"}
          >
            {job?.status}
          </Badge>
        </div>
        <ItemLabel
          label="Position title"
          value={job.positionTitle}
          Icon={Briefcase}
         
        />
        <ItemLabel
          label="Manager"
          value={manager.name + " " + manager.surname}
          Icon={Contact2}
         
        />
        <ItemLabel
          label="Location"
          value={job.location}
          Icon={MapPin}
         
        />
        <ItemLabel
          label="Hierarchy"
          value={requisition?.hierarchy}
          Icon={Footprints}
         
        />
        <ItemLabel
          label="Location"
          value={job.location}
          Icon={MapPin}
         
        />
        <ItemLabel
          label="Expected hiring date"
          value={formatDate(requisition.hiringDate)}
          Icon={Calendar}
         
        />

        <div className="flex gap-2 items-center my-5">
          <h1>Closing date:</h1>
          <Badge>{formatDate(requisition.endDate)}</Badge>
        </div>

        <div className="w-full flex flex-col gap-y-2 items-start">
          <h1>Qualifications:</h1>

          <ul className=" gap-0 w-full list-disc  pl-10">
            {requisition?.qualifications.map((item) => (
              <li key={item} className=" font-light">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full flex flex-col gap-y-2 items-start">
          <h1>Responsibilities:</h1>

          <ul className=" gap-0 w-full list-disc  pl-10">
            {requisition?.responsibilities.map((item) => (
              <li key={item} className=" font-light">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <ItemLabel
          label="Required experience"
          value={`${requisition.experience} years`}
          Icon={Workflow}
          labelClass="text-lg"
          valueClass="text-lg font-normal"
        />
      </div>

      <div className="flex flex-col p-8 border border-gray-200 rounded-lg flex-1 shadow-md ">
        <div className="w-full flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold mb-6">Job Questions</h1>
          <NewQuestion refId={job.id} type={QuestionType.Job}/>
        </div>
        <div className="flex flex-col gap-4 w-full max-h-[900px] overflow-y-auto p-8">
          {questions.map((question) => (
            <Question key={question.id} question={question} />
          ))}
        </div>
      </div>
    </div>
  );
};

type ViewJobProps = {
  job: FullAdvertFragment;
  requisition: FullRequisitionFragment;
};
