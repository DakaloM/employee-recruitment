import { QuestionType } from "@erecruitment/client";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  Form,
  TextInput,
  closeDialog,
} from "@erecruitment/ui";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { z } from "zod";
import { executeApi } from "~/client/api";

const schema = z.object({
  question: z.string(),
  answer: z.string(),
});

type Schema = typeof schema;

type Data = z.infer<Schema>;

const fields = [
  {
    name: "question",
    Component: TextInput,
  },
  {
    name: "answer",
    Component: TextInput,
  },
] as const;

const formFields = [...fields];

export const NewQuestion = ({ refId, type }: NewQuestionProps) => {
  const router = useRouter();
  const onSubmit = async (data: Data) => {
     await executeApi("createQuestion", {
      ...data,
      refId,
      type,
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="flex my-auto" size="sm" type="button">
          <PlusIcon size={16} />{" "}
          <span className="whitespace-nowrap">New Question</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[650px] max-h-screen overflow-y-auto">
        <span className="text-center font-semibold">Create new Question</span>
        <div className="flex flex-col p-6 ">
          <Form
            fields={formFields}
            onSubmit={onSubmit}
            onCompleted={() => {
              router.refresh();
              closeDialog();
            }}
            schema={schema}
            actionText="Save question"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

type NewQuestionProps = {
  refId: string;
  type: QuestionType;
};
