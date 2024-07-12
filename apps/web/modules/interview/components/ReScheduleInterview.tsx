"use client";

import { RequisitionStatus } from "@erecruitment/client";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  Button,
  closeDialog,
  Loader,
  cn,
  FormFieldProps,
  LocationInput,
  TextInput,
  Form,
  DateInput,
} from "@erecruitment/ui";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { z } from "zod";
import { executeApi } from "~/client/api";

const schema = z.object({
  date: z.coerce.date(),
  time: z.string(),
  location: z
    .object({
      city: z.string().optional(),
      country: z.string().optional(),
      lat: z.coerce.number().optional(),
      lng: z.coerce.number().optional(),
      placeId: z.string().optional().default("").optional(),
      postalCode: z.string().optional(),
      province: z.string().optional(),
      suburb: z.string().optional(),
      text: z.string().optional(),
    })
    .optional(),
});

type SchemaType = z.infer<typeof schema>;

type FieldProps<T> = {
  name: keyof T;
  Component: (props: FormFieldProps<any>) => JSX.Element;
  className?: string;
  label?: string;
};

const fields: FieldProps<SchemaType>[] = [
  {
    name: "date",
    className: "col-span-2",
    label: "Application closing date",
    Component: DateInput,
  },
  {
    name: "time",
    className: "col-span-2",
    Component: TextInput,
  },
  {
    name: "location",
    className: "col-span-2",
    Component: (props: FormFieldProps<SchemaType["location"]>) => (
      <LocationInput {...(props as any)} />
    ),
  },
];

export const ReScheduleInterview = ({
  interviewId,
  buttonClass,
}: ReScheduleInterviewProps) => {
  const router = useRouter();

  const onSubmit = async (data: SchemaType) => {
    const location = data.location ? (data.location as any) : undefined;
    const interviewLocation = location
      ? `${location?.city}, ${location?.province}, ${location?.country}, ${location?.suburb}, ${location?.postalCode}`
      : undefined;

    await executeApi("reScheduleInterview", {
      id: interviewId,
      ...data,
      location: interviewLocation,
    });
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
          <span className="whitespace-nowrap">Re schedule</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[650px] max-h-screen overflow-y-auto flex flex-col items-center gap-4">
        <h1 className="font-bold text-gray-500">Enter interview information</h1>

        <div className="w-full flex flex-col p-6">
          <Form
            fields={fields}
            onSubmit={onSubmit}
            onCompleted={() => {
              closeDialog();
              router.refresh();
            }}
            actionText="Submit"
            schema={schema}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

type ReScheduleInterviewProps = {
  interviewId: string;
  buttonClass?: string;
};
