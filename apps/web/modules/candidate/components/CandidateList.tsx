"use client";
import { ShortlistFragment } from "@erecruitment/client";
import { useRouter } from "next/navigation";
import React from "react";
import { z } from "zod";
import { ListDisplay } from "~/modules/shared";

export const schema = z.object({
  id: z.string(),
  applicationId: z.string(),
  applicant: z.string(),
  jobTitle: z.string(),
});

type SchemaType = z.infer<typeof schema>;

export const CandidateList = ({ candidates }: CandidateListProps) => {
  const router = useRouter();

  const list = candidates.map((candidate) => {
    return {
      id: candidate.id,
      applicant: candidate.name + " " + candidate.surname,
      jobTitle: candidate.jobTitle,
      applicationId: candidate.applicationId,
    };
  });

  const handleClick = async (candidate: SchemaType) => {
    router.push(`/dashboard/candidates/${candidate.id}`);
  };
  return (
    <ListDisplay
      data={list}
      schema={schema}
      onItemSelect={handleClick}
      title="List of shortlisted applicants"
    />
  );
};

type CandidateListProps = {
  candidates: ShortlistFragment[];
};
