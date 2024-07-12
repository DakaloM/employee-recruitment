"use client";
import { AdvertFragment, InterviewFragment } from "@erecruitment/client";
import { useRouter } from "next/navigation";
import React, { use, useEffect } from "react";
import { z } from "zod";
import { ListDisplay } from "~/modules/shared";

export const schema = z.object({
  id: z.string(),
  applicant: z.string(),
  jobTitle: z.string(),
  date: z.string(),
  time: z.string(),
  location: z.string(),
});

type SchemaType = z.infer<typeof schema>;

export const InterviewList = ({ interviews }: InterviewListProps) => {
  const router = useRouter();

  const list = interviews.map((interview) => {
    return {
      id: interview.id,
      applicant: interview.name + " " + interview.surname,
      jobTitle: interview.jobTitle,
      date: interview.date,
      time: interview.time,
      location: interview.location,
    };
  });

  const handleClick = async (interview: SchemaType) => {
    router.push(`/dashboard/interviews/${interview.id}`);
  };
  return <ListDisplay data={list} schema={schema} onItemSelect={handleClick} title="List of interviews" />;
};

type InterviewListProps = {
  interviews: InterviewFragment[];
};
