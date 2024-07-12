import { ApplicationFragment } from "@erecruitment/client";
import { Table } from "@erecruitment/ui";
import { Contact } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { z } from "zod";
import { PageHeader } from "~/modules/shared";

export const schema = z.object({
  id: z.string(),
  jobTitle: z.string(),
  applicant: z.string(),
  date: z.string(),
  status: z.string(),
});

export const DashboardApplicationList = ({
  applications,
}: DashboardApplicationListProps) => {
  const list = applications.slice(0, 10).map((application) => {
    return {
      id: application.id,
      jobTitle: application.jobTitle,
      applicant: application.name + " " + application.surname,
      date: application.createdAt,
      status: application.status,
    };
  });

  const router = useRouter();

  const handleClick = async (id: string) => {
    const application = applications.find(
      (application) => application.id === id
    );
    router.push(`/dashboard/applications/${application?.id}`);
  };
  return (
    <section className="flex flex-col gap-4 p-4 shadow-lg border border-gray-100">
      <PageHeader title="List of applications" Icon={Contact} />
      <Table schema={schema} data={list} onClick={handleClick} />
    </section>
  );
};

type DashboardApplicationListProps = {
  applications: ApplicationFragment[];
};
