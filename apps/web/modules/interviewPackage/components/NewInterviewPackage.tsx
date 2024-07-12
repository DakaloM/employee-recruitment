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
import { Plus } from "lucide-react";
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

export const NewInterViewPackage = ({
  jobId,
}: NewInterviewPackageProps) => {
  const router = useRouter();

  const onSubmit = async (data: SchemaType) => {
    const location = data.location as any;
    const interviewLocation = `${location?.city}, ${location?.province}, ${location?.country} , ${location?.suburb}, , ${location?.postalCode}`;

    await executeApi("createInterviewPackage", {
      ...data,
      location: interviewLocation,
      jobId,
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
      <Button
            className="flex my-auto hover:bg-green-600 hover:text-white w-full "
            variant={'ghost'}
          >
            <Plus className="w-4 h-4" />
            <span className="ml-2">Prepare interview</span>
          </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[650px] max-h-screen overflow-y-auto">
        <span className="text-center font-semibold">
          Setup interview information
        </span>
        <div className="flex flex-col p-6 ">
          <Form
            fields={fields}
            onSubmit={onSubmit}
            onCompleted={() => {
              closeDialog();
              router.push(`/dashboard/jobs/${jobId}/interview`);
            }}
            actionText="Submit"
            schema={schema as any}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

type NewInterviewPackageProps = {
  jobId: string;
};
