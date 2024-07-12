'use client';

import { EmailInput, Form, FieldProps } from '@erecruitment/ui';

import { executeApi } from 'client/api';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
});

type Schema = typeof schema;

type Data = z.infer<Schema>;

const fields: FieldProps<Schema>[] = [
  {
    name: 'email',
    Component: EmailInput,
  },
];

export function ForgotPasswordForm({ onCompleted }: ForgotPasswordFormProps) {
  const onSubmit = async (data: Data) => {
    await executeApi('forgotPassword', data);

    onCompleted(data.email);
  };

  return (
    <section className=" bg-card  grid gap-8">
      <div className="flex flex-col p-6">
        <Form
          fields={fields}
          onSubmit={onSubmit}
          onCompleted={() => null}
          initialValues={{}}
          schema={schema}
          actionText="Reset password"
        />
      </div>
    </section>
  );
}
interface ForgotPasswordFormProps {
  onCompleted: (email: string) => void;
}
