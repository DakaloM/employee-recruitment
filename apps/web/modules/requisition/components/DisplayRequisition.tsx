"use client";

import {
  FullAdvertFragment,
  FullRequisitionFragment,
  RequisitionStatus,
} from "@erecruitment/client";
import {
  Badge,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@erecruitment/ui";
import React from "react";
import { RequisitionActionButtons } from "./RequisitionActions";
import { ItemLabel } from "~/modules/shared";
import { MapPin } from "lucide-react";
import { formatDate } from "utils/formatDate";
import TimeAgo from "timeago-react";

export const DisplayRequisition = ({
  requisition,
}: DisplayRequisitionProps) => {
  const manager = JSON.parse(requisition?.position.manager);

  const approved = requisition?.status === RequisitionStatus.Approved;
  const declined = requisition?.status === RequisitionStatus.Declined;

  return (
    <div className="w-full flex flex-col gap-4 border border-gray-100 p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Requisition details</h1>

        <div className="flex items-center gap-2">
          <span className="font-semibold">Status:</span>
          <Badge
            variant={
              approved ? "success" : declined ? "destructive" : "secondary"
            }
          >
            {requisition?.status}
          </Badge>
        </div>
        <RequisitionActionButtons requisitionId={requisition?.id} />
      </div>

      <div className="grid grid-cols-2 gap-4 w-full mb-6">
        <ItemLabel
          label="Title"
          value={requisition?.title}
          valueClass="text-lg"
          labelClass="text-lg"
        />

        <ItemLabel
          label="PositionTitle"
          value={requisition?.positionTitle}
          valueClass="text-lg"
          labelClass="text-lg"
        />

        <ItemLabel
          label="Employment-Type"
          value={requisition?.employmentType}
          valueClass="text-lg"
          labelClass="text-lg"
        />

        <ItemLabel
          label="Hierarchy"
          value={requisition?.hierarchy}
          valueClass="text-lg"
          labelClass="text-lg"
        />

        <ItemLabel
          label="Location"
          Icon={MapPin}
          value={requisition?.location}
          valueClass="text-lg"
          labelClass="text-lg"
        />

        <ItemLabel
          label="Work-Place"
          value={requisition?.workplace}
          valueClass="text-lg"
          labelClass="text-lg"
          className="w-96 justify-start gap-x-4"
        />

        <ItemLabel
          label="Application end date"
          value={formatDate(requisition?.endDate)}
          valueClass="text-lg"
          labelClass="text-lg"
          className="w-96 justify-start gap-x-4"
        />

        <ItemLabel
          label="Desired hiring date"
          value={formatDate(requisition?.hiringDate)}
          valueClass="text-lg"
          labelClass="text-lg"
          className="w-96 justify-start gap-x-4"
        />
      </div>

      <div className="flex items-center text-secondary mb-6">
        <span className="text-lg font-semibold text-inherit ">Posted</span>

        <TimeAgo
          datetime={requisition?.createdAt}
          className="text-lg font-semibold text-inherit ml-2"
        />
      </div>

      <div className="flex flex-col gap-4 w-full">
        <Accordion type="single" collapsible>
          <AccordionItem value="qualification">
            <AccordionTrigger>
              <h1 className="text-xl font-semibold">Qualifications</h1>
            </AccordionTrigger>
            <AccordionContent>
              {requisition?.qualifications &&
                requisition?.qualifications.map((qualification) => (
                  <p>{qualification}</p>
                ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="responsibility">
            <AccordionTrigger>
              <h1 className="text-xl font-semibold">Responsibilities</h1>
            </AccordionTrigger>
            <AccordionContent>
              {requisition?.responsibilities &&
                requisition?.responsibilities.map((responsibility) => (
                  <p>{responsibility}</p>
                ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="border-t flex items-center w-full shadow-lg rounded-xl bg-gray-100 mb-6">
        <h1 className="text-black font-semibold text-xl w-full text-center">
          Job Manager
        </h1>

        <div className="w-full p-4 flex items-center gap-4">
          <span className="font-semibold text-lg">{manager?.name}</span>
          <span className="font-semibold text-lg">{manager?.surname}</span>
        </div>
      </div>
    </div>
  );
};

type DisplayRequisitionProps = {
  requisition: FullRequisitionFragment;
};
