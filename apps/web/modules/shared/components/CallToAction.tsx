"use client";
import { ApplicationStatus } from "@erecruitment/client";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  Button,
  closeDialog,
  Loader,
} from "@erecruitment/ui";
import { error } from "console";
import { set } from "lodash";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { executeApi } from "~/client/api";



export const CallToAction = ({
  id, apiAction, value, title
}: CallToActionProps) => {

    const[loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const handleDelete = async () => {

    setLoading(true);
    try {
      await executeApi[apiAction]( {
        id,
        status: ApplicationStatus.Declined,
      });
      setLoading(false);
      closeDialog();
      router.refresh();
    } catch (error) {
      console.log(error);
      setError(error.message)
      setLoading(false);
    }

  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          className="flex my-auto bg-primary hover:bg-primary"
          size="sm"
          type="button"
        >
          <span className="whitespace-nowrap">{title}</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[650px] max-h-screen overflow-y-auto flex flex-col items-center gap-4">
        <h1 className="font-bold text-gray-500">{title}</h1>
        <p className="text-sm text-gray-500">
          This action in not reversible, Are you sure you want to proceed?
        </p>
        {loading ? <Loader /> : <div className="flex items-center justify-center gap-4">
          <Button onClick={handleDelete} className="bg-green-500 text-white">
            Confirm
          </Button>

          <Button onClick={closeDialog} className="bg-primary text-white">
            Cancel
          </Button>
        </div>}

        {error && <p className="text-red-500">{error}</p>}
      </DialogContent>
    </Dialog>
  );
};

type CallToActionProps = {
  id: string;
  apiAction: string;
  value: any,
  title: string
};
