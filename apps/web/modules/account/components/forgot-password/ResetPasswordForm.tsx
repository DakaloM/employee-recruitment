'use client';

import { DisabledInput, PasswordInput, Form, FieldProps, NumberInput } from '@erecruitment/ui';

import { executeApi } from 'client/api';
import { z } from 'zod';

let schema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
  password: z.string(),
  confirmPassword: z.string(),
});

schema = schema.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
}) as any;

type Schema = typeof schema;

type Data = z.infer<Schema>;

const fields: FieldProps<Schema>[] = [
  {
    name: 'email',
    Component: DisabledInput,
  },
  {
    name: 'code',
    Component: NumberInput,
  },
  {
    name: 'password',
    className: 'col-span-1',
    Component: PasswordInput,
  },
  {
    name: 'confirmPassword',
    className: 'col-span-1',
    Component: PasswordInput,
  },
];

export function ResetPasswordForm({ email }: ResetPasswordFormProps) {
  const onSubmit = async (data: Data) => {
    await executeApi('recoverPassword', data);
  };

  return (
    <section className="shadow-md bg-card p-10 grid gap-8">
      <div className="flex flex-col p-6">
        <Form
          fields={fields}
          onSubmit={onSubmit}
          onCompleted={() => {
            window.location.href = '/';
          }}
          initialValues={{
            email,
          }}
          schema={schema}
          actionText="Update password"
        />
      </div>
    </section>
  );
}
interface ResetPasswordFormProps {
  email: string;
}
