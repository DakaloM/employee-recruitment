"use client";
import {
  AdvertFragment,
  ApplicationStatus,
  ContactFragment,
  FullApplicantFragment,
  FullApplicationFragment,
  FullUserFragment,
} from "@erecruitment/client";
import React from "react";
import { UserProfile } from "~/modules/user";
import { Contact } from "./Contact";
import { ApplicationTabs } from "./ApplicationTabs";
import { JobDetails } from "./JobDetails";
import { ApplicationActionButtons } from "./ApplicationActions";
import { Badge } from "@erecruitment/ui";

export const ApplicationDisplay = ({
  applicant,
  application,
}: ApplicationDisplayProps) => {
  const job = application.job as AdvertFragment;

  return (
    <div className="w-full flex flex-col items-start justify-between ">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-4 mb-8 w-max h-max">
          <h1 className="text-gray-500">Application status</h1>
          <Badge
            variant={
              application.status === ApplicationStatus.Declined
                ? "destructive"
                : application.status === ApplicationStatus.Submitted
                ? "secondary"
                : "success"
            }
          >
            {application.status}
          </Badge>
        </div>
        <div className="flex items-center gap-4 mb-8 w-max h-max">
          <ApplicationActionButtons
            applicationId={application.id}
            applicantId={applicant.id}
            jobId={job?.id as string}
            status={application.status}
          />
        </div>
      </div>
      <div className="w-full flex items-start justify-between mb-10 gap-x-20" >
        <div className=" w-full flex-grow-0 relative flex flex-col gap-4 lg:flex-row ">
          <div className="flex flex-1 shadow-lg rounded-lg bg-white border border-gray-100 p-8 hover:scale-105 transition-all">
            <JobDetails
              job={application.job as AdvertFragment}
              applicantId={applicant.id}
            />
          </div>

          <div className=" hover:scale-105 transition-all flex flex-col gap-4 flex-1 px-8 items-center shadow-lg rounded-lg bg-white border border-gray-100 p-8">
            <UserProfile user={applicant.user as FullUserFragment} />
          </div>

          <div className="flex flex-col gap-4 flex-1 px-8  hover:scale-105 transition-all items-start shadow-lg rounded-lg bg-white border border-gray-100 p-8">
            <h1 className="font-semibold text-lg text-gray-500">
              Contact Details
            </h1>
            <Contact contact={applicant.contact as ContactFragment} />
          </div>
        </div>
      </div>
      <ApplicationTabs applicant={applicant} />
    </div>
  );
};

type ApplicationDisplayProps = {
  application: FullApplicationFragment;
  applicant: FullApplicantFragment;
};
