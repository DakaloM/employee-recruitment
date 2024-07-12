"use client";

import {
  EmploymentType,
  RequisitionHierarchy,
  WorkPlace,
} from "@erecruitment/client";
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
  NumberInput,
  Select,
} from "@erecruitment/ui";
import { startCase } from "@erecruitment/utils";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { z } from "zod";
import { executeApi } from "~/client/api";

const schema = z.object({
  title: z.string().optional(),
  positionTitle: z.string().optional(),
  hierarchy: z.nativeEnum(RequisitionHierarchy).optional(),
  workplace: z.nativeEnum(WorkPlace).optional(),
  employmentType: z.nativeEnum(EmploymentType).optional(),
  hiringDate: z.coerce.date().optional(),
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
  experience: z.number().optional(),
  qualifications: z.array(z.string()).optional(),
  responsibilities: z.array(z.string()).optional(),
  endDate: z.coerce.date().optional(),
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
    name: "title",
    className: "col-span-1",
    Component: TextInput,
  },
  {
    name: "positionTitle",
    className: "col-span-1",
    Component: TextInput,
  },
  {
    name: "hiringDate",
    className: "col-span-1",
    label: "Desired hiring date",
    Component: DateInput,
  },
  {
    name: "endDate",
    className: "col-span-1",
    label: "Application closing date",
    Component: DateInput,
  },
  {
    name: "experience",
    Component: NumberInput,
  },
  {
    name: "location",
    Component: (props: FormFieldProps<SchemaType["location"]>) => (
      <LocationInput {...props} />
    ),
  },
];

export const UpdateRequisition = ({
  requisitionId,
}: UpdateRequisitionProps) => {
  const [qualifications, setQualifications] = useState<number>(1);
  const [responsibilities, setResponsibilities] = useState<number>(1);
  const router = useRouter();

  const onSubmit = async (data: SchemaType) => {
    const location = data.location ? (data.location as any) : undefined;
    const interviewLocation = location
      ? `${location?.city}, ${location?.province}, ${location?.country}, ${location?.suburb}, ${location?.postalCode}`
      : undefined;

    await executeApi("updateRequisition", {
      ...data,
      location: interviewLocation,
      id: requisitionId,
    });
  };

  const formFields: FieldProps<SchemaType>[] = useMemo(() => {
    const hierarchyOptions = Object.values(RequisitionHierarchy).map(
      (value) => ({
        value,
        label: startCase(value),
      })
    );

    const workplaceOptions = Object.values(WorkPlace).map((value) => ({
      value,
      label: startCase(value),
    }));

    const employmentTypes = Object.values(EmploymentType).map((value) => ({
      value,
      label: startCase(value),
    }));

    const qualificationFields = Array.from(
      { length: qualifications },
      (_, idx) => ({
        name: `qualifications.${idx}` as keyof SchemaType,
        label: `Qualification`,
        className: "col-span-2",
        Component: TextInput,
      })
    );

    const responsibilityFields = Array.from(
      { length: responsibilities },
      (_, idx) => ({
        name: `responsibilities.${idx}` as keyof SchemaType,
        label: `Responsibility`,
        className: "col-span-2",
        Component: TextInput,
      })
    );

    return [
      ...fields,
      {
        name: "hierarchy",
        className: "col-span-1",
        Component: (props: FormFieldProps<string>) => (
          <Select {...props} options={hierarchyOptions} />
        ),
      } as const,
      {
        name: "employmentType",
        className: "col-span-1",
        Component: (props: FormFieldProps<string>) => (
          <Select {...props} options={employmentTypes} />
        ),
      } as const,
      {
        name: "workplace",
        className: "col-span-2",
        Component: (props: FormFieldProps<string>) => (
          <Select {...props} options={workplaceOptions} />
        ),
      } as const,
      ...qualificationFields,
      ...responsibilityFields,
    ];
  }, [qualifications, responsibilities]);

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          className="flex my-auto hover:bg-gray-600 hover:text-white w-full"
          variant={"ghost"}
        >
          <span className="whitespace-nowrap">Update</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[650px] max-h-screen overflow-y-auto">
        <span className="text-center font-semibold">
          Update requisition details
        </span>

        <div className="flex w-full items-center justify-end gap-2 py-4">
          <div className="flex flex-col w-full items-center justify-end gap-2">
            <div className="flex gap-2 items-center">
              <Button
                onClick={() => setQualifications((prev) => prev + 1)}
                className="w-max h-max rounded-full p-1"
              >
                <Plus size={15} />
              </Button>
              <span className="text-sm ">Add qualification</span>
            </div>
          </div>

          <div className="flex flex-col w-full items-center justify-end gap-2">
            <div className="flex gap-2 items-center">
              <Button
                onClick={() => setResponsibilities((prev) => prev + 1)}
                className="w-max h-max rounded-full p-1"
              >
                <Plus size={15} />
              </Button>
              <span className="text-sm ">Add responsibility</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col p-6">
          <Form
            fields={formFields}
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

type UpdateRequisitionProps = {
  requisitionId: string;
};
