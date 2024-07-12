/* eslint-disable import/no-extraneous-dependencies */
import { FullAdvertFragment } from "@erecruitment/client";
import { PartialAdvertFragment } from "@erecruitment/client/dist/__generated__/graphql";
import { Button } from "@erecruitment/ui";

import { MapPin } from "lucide-react";
import React from "react";
import TimeAgo from "timeago-react";

export const Job = (props: JobProps) => {
  const { job, setJob } = props;

  return (
    <div
      className="bg-white min-w-full md:min-w-0 w-full relative p-8 border rounded-xl shadow-lg flex flex-col gap-4 hover:cursor-pointer"
      onClick={() => setJob(job)}
    >
      <h1 className="text-xl font-extrabold">{job.positionTitle}</h1>
      <div className="flex items-center gap-2">
        <MapPin size={15} className="text-gray-500" />
        <span className="text-sm font-normal text-gray-500">
          {job.location}
        </span>
      </div>

      <div className="flex flex-col items-start gap-y-4 lg:flex-row lg:items-center w-full gap-x-4">
        <span className="text-xs p-2 bg-gray-200 px-4 rounded-lg">
          R20 000 - R40 000 p/m
        </span>
        <span className="text-xs p-2 bg-gray-200 px-4 rounded-lg">
          Full-Time
        </span>
      </div>

      <h1 className="text-xs text-gray-500 underline">Requirements</h1>

      <div className="flex items-center ">
        <span className="text-xs font-semibold text-primary">Posted</span>

        <TimeAgo
          datetime={job.createdAt}
          className="text-xs font-semibold text-primary ml-2"
        />
      </div>
    </div>
  );
};

type JobProps = {
  job: PartialAdvertFragment;
  setJob: (job: PartialAdvertFragment) => void;
};
