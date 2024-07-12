import { FullAdvertFragment } from "@erecruitment/client";
import React from "react";
import { Job } from "./Job";
import { PartialAdvertFragment } from "@erecruitment/client/dist/__generated__/graphql";

export const Jobs = (props: JobsProps) => {
  const { jobs, setJob } = props;
  return (
    <div className="w-full md:w-1/2 py-8 gap-x-8 md:gap-x-0 flex overflow-x-auto md:overflow-y-auto md:flex-col max-h-full min-h-[400px] md:overflow-x-hidden gap-y-8 scrollbar-hide">
      {jobs.map((job) => (
        <Job key={job.id} job={job} setJob={setJob} />
      ))}
    </div>
  );
};

type JobsProps = {
  jobs: PartialAdvertFragment[];
  setJob: (job: PartialAdvertFragment) => void;
};
