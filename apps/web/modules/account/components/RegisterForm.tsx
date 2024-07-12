'use client';

import { EmailInput, PasswordInput, Form, FieldProps, TextInput } from '@erecruitment/ui';

import { executeApi } from 'client/api';
import { z } from 'zod';

const schema = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string().email(),
  mobileNumber: z.string(), 
  businessNumber: z.string(),
  idNumber: z.string(),
  confirmPassword: z.string(),
  password: z.string({required_error: 'Required'}).refine((val) => val.length >= 6 , {message: 'Password must be at least 6 characters'}),

});


type Schema = typeof schema;

type Data = z.infer<Schema>;

const fields: FieldProps<Schema>[] = [
  {
    name: 'name',
    Component: TextInput,
    className: ''
  },
  {
    name: 'surname',
    Component: TextInput,
    className: ''
  },
  {
    name: 'email',
    Component: EmailInput,
  },
  {
    name: 'mobileNumber',
    label: 'Phone Number',
    Component: TextInput,
  },
  {
    name: 'businessNumber',
    label: 'Telephone Number',
    Component: TextInput,
  },
 
  {
    name: 'idNumber',
    Component: TextInput,
  },

  {
    name: 'password',
    Component: PasswordInput,
    className: ''
  },

  {
    name: 'confirmPassword',
    Component: PasswordInput,
    className: ''
  },
  

];

export function RegisterForm() {
  

  const onSubmit = async (data: Data) => {
    
    const registerInput = {
      input: {
        ...data,
        privateNumber: data.mobileNumber
      }
    }
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
          actionText="Register"
        />
       
      </div>
    </section>
  );
}
