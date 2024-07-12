"use client";
import {
  FullApplicantFragment,
  FullUserFragment,
  InterviewFragment,
  InterviewStatus,
  UserFragment,
} from "@erecruitment/client";
import { Badge, Loader } from "@erecruitment/ui";
import { get, set } from "lodash";
import React, { useEffect } from "react";
import { formatDate } from "utils/formatDate";
import { executeApi } from "~/client/api";
import { ItemLabel } from "~/modules/shared";
import { UserProfile } from "~/modules/user";
import { InterviewActionButtons } from "./InterviewActions";

export const DisplayInterview = ({ interview }: DisplayInterviewProps) => {
  const [user, setUser] = React.useState<FullUserFragment | null>(null);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const getApplicant = async () => {
      setLoading(true);
      try {
        const res = await executeApi("applicant", {
          id: interview.applicantId,
        });
        setUser(res.user);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };

    getApplicant();
  }, [interview.applicantId]);


  return loading ? (
    <Loader />
  ) : (
    <div className="w-full flex flex-col">
      <div className="w-full flex justify-between gap-10">
        <div className="flex-1 flex flex-col gap-4 items-center border border-gray-200 p-4 rounded-lg shadow-lg">
          <h1 className="text-gray-500 font-semibold text-xl mb-6">
            Applicant details
          </h1>
          {user && <UserProfile user={user} />}
        </div>

        <div className="flex-1 flex flex-col gap-4 items-center border border-gray-200 p-4 rounded-lg shadow-lg relative">

          <div className="absolute top-4 right-4 w-fit h-fit">
            <InterviewActionButtons interviewId={interview.id} />
          </div>
          <h1 className="text-gray-500 font-semibold text-xl mb-6">
            Interview details
          </h1>


          <div className="flex flex-col gap-2">
            <Badge variant={interview.status === 'Cancelled' ? "destructive" : "success"} className="w-fit">{interview.status}</Badge>
            <ItemLabel label="Job position" value={interview.jobTitle} />
            <ItemLabel label="Date" value={formatDate(interview.date)} />

            <ItemLabel label="Time" value={interview.time} />

            <ItemLabel label="Location" value={interview.location} />
          </div>
        </div>
      </div>

      
    </div>
  );
};

type DisplayInterviewProps = {
  interview: InterviewFragment;
};
