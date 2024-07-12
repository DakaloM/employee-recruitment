'use client'
import { EmailInput, FieldProps, Form, FormFieldProps } from '@erecruitment/ui';

import React from 'react';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
});

type SchemaType = z.infer<typeof schema>;

const fields: FieldProps<typeof schema>[] = [
  {
    name: 'email',
    Component: EmailInput,
  },
];

export const ExistingEmployee = () => {
  const onSubmit = async (data: SchemaType) => {
    const registerInput = {
      input: {
        ...data,
      },
    };
    // await executeApi('register', registerInput);
  };

  return (
    <section className="bg-card  grid gap-8">
      <div className="flex flex-col py-4 ">
        <Form
          fields={fields}
          onSubmit={onSubmit}
          onCompleted={() => {
            location.replace('/login?registerSuccess');
          }}
          initialValues={{}}
          schema={schema}
          actionText="search"
        />
      </div>
    </section>
  );
};

type EmployeeType = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  streetNumber: string;
  email: string;
  mobileNumber: string;
  idNumber: string;
  businessNumber: string;
  privateNumber: string;
  password: string;
  confirmPassword: string;
  roles: string[];
};
