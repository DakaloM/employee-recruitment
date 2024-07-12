"use client";

import { QuestionFragment } from "@erecruitment/client";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  Form,
  TextInput,
  closeDialog,
} from "@erecruitment/ui";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { z } from "zod";
import { executeApi } from "~/client/api";

// Define schema for array of objects
const schema = z.any(
  z.object({
    questionId: z.string().uuid(),
    answer: z.string().min(1, "Answer is required"),
  })
);

type Schema = typeof schema;
type Data = z.infer<Schema>;

export const NewApplication = ({
  questions,
  jobId,
  requisitionId,
}: NewApplicationProps) => {
  const router = useRouter();
  const[successMessage, setSuccessMessage] = React.useState<string>('');

  useEffect(() => {
    setSuccessMessage('');
  },[jobId])

  const fields = questions.map((question) => ({
    name: `answers.${question.id}`,
    label: question.question,
    Component: TextInput,
  }));

  const onSubmit = async (formData: Record<string, string>) => {
    const answers: Data = questions.map((question) => ({
      questionId: question.id,
      answer: formData[`answers.${question.id}`] || "",
    }));

    await schema.parseAsync(answers);
    await executeApi("createApplication", {
      jobId,
      requisitionId,
      answers,
    });

    setSuccessMessage("Application submitted successfully");
  };

  return (
    <Dialog>
      <DialogTrigger className="w-fit">
        <Button className="flex my-auto w-32" size="sm" type="button">
          <span className="whitespace-nowrap">Apply</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[650px] max-h-screen overflow-y-auto">
        <span className="text-center font-semibold">
          Answer the following questions to apply
        </span>
        <div className="flex flex-col p-6">
          <Form
            fields={fields}
            onSubmit={onSubmit}
            onCompleted={async() => {
              await new Promise((resolve) =>
                setTimeout(() => {
                  router.refresh();
                  closeDialog();
                }, 2000)
              );
              
            }}
            initialValues={{}}
            schema={schema as any} 
            actionText="Submit application"
            successMessage={successMessage}
          />

        </div>

      </DialogContent>
    </Dialog>
  );
};

type NewApplicationProps = {
  questions: QuestionFragment[];
  jobId: string;
  requisitionId: string;
};
