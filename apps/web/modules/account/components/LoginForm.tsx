'use client';

import { Button, EmailInput, PasswordInput, Form, FieldProps } from '@erecruitment/ui';

import { executeApi } from 'client/api';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type Schema = typeof schema;

type Data = z.infer<Schema>;

const fields: FieldProps<Schema>[] = [
  {
    name: 'email',
    Component: EmailInput,
  },
  {
    name: 'password',
    Component: PasswordInput,
  },
];

export function LoginForm() {
  const onSubmit = async (data: Data) => {
    await executeApi('login', data);
  };

  return (
    <section className="bg-card  grid gap-8">
      <div className="flex flex-col p-6">
        <Form
          fields={fields}
          onSubmit={onSubmit}
          onCompleted={() => {
            window.location.href = '/';
          }}
          initialValues={{}}
          schema={schema}
          actionText="Login"
        />
        <div className="flex justify-between">
          <Button
            onClick={() => {
              // router.push('/forgot-password')
              location.href = '/forgot-password';
            }}
            variant="link"
            className="ml-auto"
          >
            Forgot password
          </Button>
        </div>
      </div>
    </section>
  );
}
