"use client";
import {  QuestionFragment } from "@erecruitment/client";
import { Button, camelToTitleCase } from "@erecruitment/ui";

import { MapPin } from "lucide-react";
import React from "react";
import TimeAgo from "timeago-react";
import { useRouter } from "next/navigation";

import { PartialAdvertFragment } from "@erecruitment/client/dist/__generated__/graphql";
import { NewApplication } from "~/modules/application";

export const FullJob = (props: JobProps) => {
  const { job, token } = props;

  const router = useRouter();

  if (!job) {
    return null;
  }

  return (
    <div className="w-full md:w-1/2 border rounded-xl p-8 flex flex-col gap-y-4 bg-white max-h-full overflow-x-auto">
      <h1 className="text-xl font-extrabold">{job?.positionTitle}</h1>
      <div className="flex items-center gap-2">
        <MapPin size={15} className="text-gray-500" />
        <span className="text-sm font-normal text-gray-500">
          {job?.location}
        </span>
      </div>

      <div className="flex items-center w-full gap-x-4">
        <span className="text-xs p-2 bg-gray-200 px-4 rounded-lg">
          Market related
        </span>
        <span className="text-xs p-2 bg-gray-200 px-4 rounded-lg">
          {camelToTitleCase(job?.requisition?.employmentType)}
        </span>
        <span className="text-xs p-2 bg-gray-200 px-4 rounded-lg">
          {camelToTitleCase(job?.requisition?.workplace)}
        </span>
      </div>

      {token ? (
        <NewApplication
          jobId={job.id}
          requisitionId={job.requisitionId}
          questions={job.questions as QuestionFragment[]}
        />
      ) : (
        <Button className="h-10 w-32" onClick={() => router.push("/login")}>
          Sign in
        </Button>
      )}

      <hr className="border-none h-[1px] w-full bg-gray-400" />

      <h1 className="text-xl text-black underline">Job details</h1>

      <h1>Who are we</h1>
      <p className="text-gray-500 font-light">
        orem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
        molestiae quas vel sint commodi repudiandae consequuntur voluptatum
        laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto
        fuga praesentium optio, eaque rerum! Provident similique accusantium
        nemo autem.
      </p>

      <h1>Qualifications</h1>
      <p className="text-gray-500 font-light">
        Here are the qualifications we require you to have.
      </p>

      <ul className=" gap-0 w-full list-disc  pl-10">
        {job.requisition?.qualifications.map((item) => (
          <li key={item} className="text-sm font-light">
            {item}
          </li>
        ))}
      </ul>

      <h1>Duties and responsibilities</h1>
      <p className="text-gray-500 font-light">
        Below is the list of some of the responsibilities you will have once you
        are in our company
      </p>
      <ul className=" gap-0 w-full list-disc  pl-10">
        {job.requisition?.responsibilities.map((item) => (
          <li key={item} className="text-sm font-light">
            {item}
          </li>
        ))}
      </ul>

      <h1>Why work for us</h1>
      <p className="text-gray-500 font-light">
        Here are the qualifications we require you to have.
      </p>

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
  token: string;
};
