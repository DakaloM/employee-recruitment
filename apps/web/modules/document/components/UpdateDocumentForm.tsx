"use client";
import { AttachmentType } from "@erecruitment/client";
import { Form, TextAreaInput, FormFieldProps, Select } from "@erecruitment/ui";
import { startCase } from "@erecruitment/utils";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { nativeEnum, z } from "zod";
import { executeApi } from "~/client/api";

const schema = z.object({
  description: z.string(),
  type: nativeEnum(AttachmentType),
});

type Schema = typeof schema;

type Data = z.infer<Schema>;

const typeOptions = Object.values(AttachmentType).map((value) => ({
  value,
  label: startCase(value),
}));

const fields = [
  {
    name: "description",
    Component: TextAreaInput,
  },
  {
    name: "type",
    Component: (props: FormFieldProps<z.infer<Schema>["type"]>) => (
      <Select {...(props as any)} options={typeOptions} />
    ),
  },
] as const;

export function UpdateDocumentForm({
  fileId,
  initialValues,
  type,
  onCompleted,
  refId,
  includeFields = [],
}: UpdateDocumentFormProps) {
  const router = useRouter();

  const onSubmit = async (data: Data) => {
    await executeApi("updateAttachment", {
      id: fileId,
      description: data.description,
      type: data.type,
    });

    onCompleted();
  };

  const formFields = useMemo(() => {
    return [...fields];
  }, []);

  return (
    <Form
      fields={formFields}
      onSubmit={onSubmit}
      onCompleted={() => {
        router.refresh();
      }}
      initialValues={initialValues}
      schema={schema}
      actionText="Save changes"
    />
  );
}
export interface UpdateDocumentFormProps {
  fileId: string;
  type: AttachmentType;
  refId: string;
  initialValues?: Partial<Schema>;
  onCompleted: () => void;
  includeFields?: "location"[];
}
