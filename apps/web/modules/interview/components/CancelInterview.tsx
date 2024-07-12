"use client";

import { InterviewStatus } from "@erecruitment/client";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  Button,
  closeDialog,
  Loader,
  cn,
} from "@erecruitment/ui";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { executeApi } from "~/client/api";

export const CancelInterview = ({
  interviewId,
  buttonClass,
}: CancelInterviewProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const handleAction = async () => {
    setLoading(true);
    try {
      await executeApi("updateInterviewStatus", {
        id: interviewId,
        status: InterviewStatus.Cancelled,
      });
      setLoading(false);
      router.refresh();
      closeDialog();
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          className={cn(
            "flex my-auto hover:bg-primary hover:text-white w-full ",
            buttonClass
          )}
          variant={"ghost"}
        >
          <span className="whitespace-nowrap">Cancel interview</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[650px] max-h-screen overflow-y-auto flex flex-col items-center gap-4">
        <h1 className="font-bold text-gray-500">Confirm interview cancellation</h1>
        <p className="text-sm text-gray-500">
          This action in not reversible, Are you sure you want to proceed?
        </p>
        {loading ? (
          <Loader />
        ) : (
          <div className="flex items-center justify-center gap-4">
            <Button onClick={handleAction} className="bg-green-500 text-white">
              Confirm
            </Button>

            <Button onClick={closeDialog} className="bg-primary text-white">
              Cancel
            </Button>
          </div>
        )}

        {error && <p className="text-red-500">{error}</p>}
      </DialogContent>
    </Dialog>
  );
};

type CancelInterviewProps = {
  interviewId: string;
  buttonClass?: string;
};
