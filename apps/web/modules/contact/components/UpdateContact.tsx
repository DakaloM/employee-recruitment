/* eslint-disable import/no-extraneous-dependencies */
'use client';

import { ContactFragment, UpdateContactInput } from '@erecruitment/client';
import {
  Button,
  FormInput,
  FormSelect,
  NativeForm as Form,
  Loader,
  ResponseMessage,
} from '@erecruitment/ui';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';


const schema = z.object({
  email: z.string().email().optional(),
  mobileNumber: z
    .string()
    .refine((val) => val.startsWith('0') && val.length === 10, { message: 'Invalid phone number' }).optional(),
  privateNumber: z
    .string()
    .refine((val) => val.startsWith('0') && val.length === 10, { message: 'Invalid phone number' })
    .optional().optional(),
  businessNumber: z
    .string()
    .refine((val) => val.startsWith('0') && val.length === 10, { message: 'Invalid phone number' })
    .optional().optional(),
});

type SchemaType = z.infer<typeof schema>;

export function UpdateContact(props: UpdateContactProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const { contact } = props;
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  async function onSubmit(values: SchemaType) {
    setSuccessMessage('');
    setErrorMessage('');

    const data = {
      id: contact.id,
      userId: contact.userId,
      ...values,
    } as UpdateContactInput;

    try {
      const res = await axios.patch(`/api/contact/${contact.id}`, { ...data });
      setSuccessMessage(res.data.message);
      // await new Promise((resolve) =>
      //   setTimeout(() => {
      //     location.reload();
      //   }, 2000),
      // );
    } catch (error: any) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Network error');
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-col gap-y-8 w-full text-gray-600 bg-white h-full px-8 justify-center items-center"
      >
        <FormInput label="Email" name="email" defaultValue={contact.email} />

        <FormInput label="Mobile number" name="mobileNumber" defaultValue={contact.mobileNumber} />
        <FormInput label="Business number" name="businessNumber" defaultValue={contact.businessNumber || undefined} />
        <FormInput label="Personal number" name="privateNumber" defaultValue={contact.privateNumber || undefined} />

        {form.formState.isSubmitting ? (
          <Loader />
        ) : (
          <Button className="w-max" type="submit">
            Update
          </Button>
        )}
        <ResponseMessage errorMessage={errorMessage} successMessage={successMessage} />
      </form>
    </Form>
  );
}

type UpdateContactProps = {
  contact: ContactFragment;
};
