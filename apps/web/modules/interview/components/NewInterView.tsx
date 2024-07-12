"use client";
import {
  DateInput,
  LocationInput,
  TextAreaInput,
  Dialog,
  DialogContent,
  DialogTrigger,
  Form,
  Button,
  closeDialog,
  TextInput,
  FormFieldProps,
} from "@erecruitment/ui";
import { useRouter } from "next/navigation";
import React from "react";
import { z } from "zod";
import { executeApi } from "~/client/api";

const schema = z.object({
  date: z.coerce.date(),
  time: z.string(),
  location: z.object({
    city: z.string(),
    country: z.string(),
    lat: z.coerce.number(),
    lng: z.coerce.number(),
    placeId: z.string().optional().default(""),
    postalCode: z.string(),
    province: z.string(),
    suburb: z.string(),
    text: z.string(),
  }),
  description: z.string(),
});

type SchemaType = z.infer<typeof schema>;

const fields = [
  {
    name: "date",
    Component: DateInput,
  },
  {
    name: "time",
    Component: TextInput,
  },
  {
    name: "location",
    Component: (props: FormFieldProps<z.infer<typeof schema>["location"]>) => (
      <LocationInput {...(props as any)} />
    ),
  },
  {
    name: "description",
    Component: TextAreaInput,
  },
];

export const NewInterView = ({
  applicationId,
  applicantId,
  jobId,
}: NewInterviewProps) => {
  const router = useRouter();

  const onSubmit = async (data: SchemaType) => {
    const location = data.location as any;
    const interviewLocation = `${location?.city}, ${location?.province}, ${location?.country} , ${location?.suburb}, , ${location?.postalCode}`;

    await executeApi("createInterview", {
      ...data,
      location: interviewLocation,
      applicationId,
      applicantId,
      jobId,
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          className="flex my-auto hover:bg-green-600 hover:text-white w-full"
          variant={"ghost"}
        >
          <span className="whitespace-nowrap">Schedule interview</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[650px] max-h-screen overflow-y-auto">
        <span className="text-center font-semibold">
          Schedule an interview with this applicant
        </span>
        <div className="flex flex-col p-6 ">
          <Form
            fields={fields}
            onSubmit={onSubmit}
            onCompleted={() => {
              closeDialog();
              router.refresh();
            }}
            actionText="Submit"
            schema={schema as any}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

type NewInterviewProps = {
  applicationId: string;
  applicantId: string;
  jobId: string;
};
