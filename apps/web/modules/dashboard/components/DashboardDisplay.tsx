"use client";
import {
  AdvertFragment,
  ApplicationFragment,
  InterviewFragment,
} from "@erecruitment/client";
import React from "react";
import { DashboardCard } from "./DashboardCard";
import { Briefcase, ClipboardList, Contact } from "lucide-react";
import { DashboardApplicationList } from "./ApplicationList";

export const DashboardDisplay = ({
  applications,
  interviews,
  jobs,
}: DashboardDisplayProps) => {
  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex w-full gap-8 items-start">
        <DashboardCard
          count={applications.length}
          title="Total applications"
          Icon={Contact}
          url="applications"
        />

        <DashboardCard
          count={jobs.length}
          title="Total Job vacancies"
          Icon={Briefcase}
          url="jobs"
        />

        <DashboardCard
          count={interviews.length}
          title="Total Booked interviews"
          Icon={ClipboardList}
          url="interviews"
        />
      </div>

      <DashboardApplicationList applications={applications} />
    </div>
  );
};

type DashboardDisplayProps = {
  applications: ApplicationFragment[];
  interviews: InterviewFragment[];
  jobs: AdvertFragment[];
};
