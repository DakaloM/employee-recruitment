"use client";
import {
  AttachmentFragment,
  AttachmentType,
  FullApplicantFragment,
} from "@erecruitment/client";
import React from "react";
import {
  Table,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@erecruitment/ui";
import { DocumentList } from "~/modules/document";
import {
  EducationFragment,
  ExperienceFragment,
} from "@erecruitment/client/dist/__generated__/graphql";
import { Education } from "./Education";
import { Experience } from "./Experience";
import { Contact } from "./Contact";

export const ApplicationTabs = ({ applicant }: ApplicationTabsProps) => {
  return (
    <Tabs defaultValue="education" className="w-full h-full ">
      <TabsList className="overflow-x-auto w-full overflow-y-hidden">
        <TabsTrigger className="w-1/2" value="education">
          Education
        </TabsTrigger>
        <TabsTrigger className="w-1/2" value="experience">
          Experience
        </TabsTrigger>

        <TabsTrigger className="w-1/2" value="document">
          Documents
        </TabsTrigger>
      </TabsList>

      <TabsContent value="education" className=" w-full bg-white shadow-lg p-8">
        <Education
          education={applicant.education as unknown as EducationFragment[]}
        />
      </TabsContent>
      <TabsContent
        value="experience"
        className=" w-full bg-white shadow-lg p-8"
      >
        <Experience experience={applicant.experience as ExperienceFragment[]} />
      </TabsContent>

      <TabsContent value="document" className=" w-full bg-white shadow-lg p-8">
        <DocumentList
          documents={applicant.attachments as AttachmentFragment[]}
          type={AttachmentType.Other}
        />
      </TabsContent>
    </Tabs>
  );
};

type ApplicationTabsProps = {
  applicant: FullApplicantFragment;
};
