"use client";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@erecruitment/ui";

import { MoreHorizontalIcon } from "lucide-react";
import { UpdateRequisition } from "./UpdateRequisition";
import { UpdateRequisitionStatus } from "./UpdateRequisitionStatus";
import { RequisitionStatus } from "@erecruitment/client";

export function RequisitionActionButtons({
  requisitionId,
}: RequisitionActionButtonsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="grid p-0">
        <UpdateRequisition requisitionId={requisitionId} />
        <UpdateRequisitionStatus
          requisitionId={requisitionId}
          title="Approve"
          status={RequisitionStatus.Approved}
          buttonClass="hover:bg-green-600 hover:text-white"
        />
        <UpdateRequisitionStatus
          requisitionId={requisitionId}
          title="Decline"
          status={RequisitionStatus.Declined}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type RequisitionActionButtonsProps = {
  requisitionId: string;
};
