/* eslint-disable import/no-extraneous-dependencies */
'use client';

import {
  AddressFragment,
  AddressType,
  ContactFragment,
  UpdateAddressInput,
  UpdateContactInput,
} from '@erecruitment/client';
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

/* eslint-disable import/no-extraneous-dependencies */

const schema = z.object({
  streetAddress: z.string().optional(),
  region: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  contactAddress: z.boolean().optional(),
});
type SchemaType = z.infer<typeof schema>;

export function UpdateAddress(props: UpdateAddressProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const { address } = props;
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  async function onSubmit(values: SchemaType) {
    setSuccessMessage('');
    setErrorMessage('');

    const data = {
      id: address.id,
      userId: address.userId,
      ...values,
    } as UpdateAddressInput;

    try {
      const res = await axios.patch(`/api/address/${address.id}`, { ...data });
      setSuccessMessage(res.data.message);
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
        <FormInput
          label="Street address"
          name="streetAddress"
          defaultValue={address.streetAddress}
        />
        <FormInput label="Region" name="region" defaultValue={address.region} />
        <FormInput label="City" name="city" defaultValue={address.city} />
        <FormInput label="Postal code" name="postalCode" defaultValue={address.postalCode} />

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

type UpdateAddressProps = {
  address: AddressFragment;
};
