'use client';

import { QuestionFragment } from '@erecruitment/client';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  Form,
  Button,
  closeDialog,
  TextInput,
  FormFieldProps,
} from '@erecruitment/ui';

import { Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { z } from 'zod';
import { executeApi } from '~/client/api';

const schema = z.object({
  question: z.string().optional(),
  answer: z.string().optional(),
});

type SchemaType = z.infer<typeof schema>;

export const EditQuestion = ({ question }: EditQuestionProps) => {
  const router = useRouter();
  const fields = [
    {
      name: 'question',
      Component: (props: FormFieldProps<z.infer<typeof schema>['question']>) => (
        <TextInput {...(props as any)} initialValue={question.question} />
      ),
    },

    {
      name: 'answer',
      Component: (props: FormFieldProps<z.infer<typeof schema>['answer']>) => (
        <TextInput {...(props as any)} initialValue={question.answer} />
      ),
    },
  ];

  const onSubmit = async (data: SchemaType) => {
    await executeApi('updateJobQuestion', {
      ...data,
      id: question.id,
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          className="flex my-auto hover:bg-secondary hover:text-white w-full "
          variant={'ghost'}
        >
          <Pencil className="w-4 h-4" />
          <span className="ml-2">Edit</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[650px] max-h-screen overflow-y-auto">
        <span className="text-center font-semibold">Edit job question</span>
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

type EditQuestionProps = {
  question: QuestionFragment;
};
