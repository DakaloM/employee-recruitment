'use client';
import { EmploymentType,  RequisitionHierarchy, WorkPlace } from "@erecruitment/client";
import { Button, DateInput, Dialog, DialogContent, DialogTrigger, Form, FormFieldProps, NumberInput, Select, TextInput, closeDialog } from "@erecruitment/ui";
import { startCase } from "@erecruitment/utils";
import React, { useMemo } from "react";
import { z } from "zod";
import { getPositions } from "../utils";
import { PlusIcon } from "lucide-react";
import { executeApi } from "~/client/api";
import { useRouter } from "next/navigation";

const schema = z.object({
  title: z.string(),
  objectId: z.string().uuid(),
  endDate: z.coerce.date(),
  hierarchy: z.nativeEnum(RequisitionHierarchy),
  hiringDate: z.coerce.date(),
  experience: z.coerce.number(),
  employmentType: z.nativeEnum(EmploymentType),
  workplace: z.nativeEnum(WorkPlace),
});

type SchemaType = z.infer<typeof schema>;

const fields = [
  {
    name: "title",
    Component: TextInput,
  },
  {
    name: "experience",
    Component: NumberInput,
  },
 
  {
    name: "endDate",
    label: "Expiry date",
    Component: DateInput,
  },
  {
    name: "hiringDate",
    label: "Desired hiring date",
    Component: DateInput,
  },
];

export const CreateRequisition = () => {
  const router = useRouter();


  const onSubmit = async (data: SchemaType) => {
    const requisition = await executeApi('createRequisition', data);
    router.push(`/dashboard/requisitions/${requisition.id}`);
  };

  const formFields = useMemo(() => {
    const hierarchyOptions = Object.values(RequisitionHierarchy).map(
      (value) => ({
        value,
        label: startCase(value),
      })
    );

    const workplaceOptions = Object.values(WorkPlace).map(
      (value) => ({
        value,
        label: startCase(value),
      })
    );

    const employmentTypes = Object.values(EmploymentType).map(
      (value) => ({
        value,
        label: startCase(value),
      })
    );

    return [
      {
        name: "objectId",
        label: "Vacant position",
        className: "col-span-2",
        Component: (props: FormFieldProps<string>) => (
          <Select {...props} fetchOptions={getPositions}/>
        ),

      } as const,

      {
        name: "hierarchy",
        className: "col-span-2",
        Component: (props: FormFieldProps<string>) => (
          <Select {...props} options={hierarchyOptions}/>
        ),

      } as const,

      {
        name: "employmentType",
        className: "col-span-2",
        Component: (props: FormFieldProps<string>) => (
          <Select {...props} options={employmentTypes}/>
        ),

      } as const,

      {
        name: "workplace",
        className: "col-span-2",
        Component: (props: FormFieldProps<string>) => (
          <Select {...props} options={workplaceOptions}/>
        ),

      } as const,

     
      ...fields,
    ];
  }, []);

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="flex my-auto" size="sm" type="button">
          <PlusIcon size={16} /> <span className="whitespace-nowrap">New Requisition</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[650px] max-h-screen overflow-y-auto">
        <span className="text-center font-semibold">Create new requisition</span>
        <div className="flex flex-col p-6 ">
          <Form
            fields={formFields}
            onSubmit={onSubmit}
            onCompleted={() => {
              router.refresh();
              closeDialog();
            }}
            initialValues={{
              members: [],
            }}
            // TODO: Fix the type
            schema={schema as any}
            actionText="Create requisition"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
