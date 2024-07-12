/* eslint-disable import/no-extraneous-dependencies */
'use client';

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
import { genderList, raceList, titleList } from 'schema';
import { z } from 'zod';

import { PersonalProps } from '../Personal';
import { apiClient } from '~/client/server-proxy';
import { Gender, UpdateUserInput } from '@erecruitment/client';
import { formatDate } from 'utils/formatDate';

/* eslint-disable import/no-extraneous-dependencies */

const schema = z.object({
  status: z.string().optional(),
  email: z.string().optional(),
  title: z.string().optional(),
  birthDate: z.string().optional(),
  name: z.string().optional(),
  surname: z.string().optional(),
  middleName: z.string().optional(),
  gender: z.string().optional(),
  race: z.string().optional(),
  idNumber: z.string().optional(),
});

type SchemaType = z.infer<typeof schema>;

export function PersonalDetailsForm(props: PersonalProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const { user } = props;
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  async function onSubmit(values: SchemaType) {
    setSuccessMessage('');
    setErrorMessage('');

    const data = {
      id: user.id,
      ...values
    } as UpdateUserInput

  

    try {
      const res = await axios.patch(`/api/users/${user.id}`, { ...data });
      setSuccessMessage(res.data.message);
      console.log(res.data)
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
        className=" flex flex-col gap-y-8 w-full text-gray-600 bg-white h-full px-8 justify-center"
      >
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10 justify-between w-full">
          <FormInput label="Name" name="name" placeholder="Jane" defaultValue={user.name} />
          <FormInput
            label="Middle name"
            name="surname"
            placeholder="Doe"
            defaultValue={user.middleName}
          />
          <FormInput label="Surname" name="surname" placeholder="Doe" defaultValue={user.surname} />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-start w-full gap-4 md:gap-10">
          <FormInput
            label="Email"
            name="email"
            placeholder="johndoe@example.com"
            defaultValue={user.email}
          />
          <FormInput label="Id Number" name="idNumber" defaultValue={user.idNumber} />
          <FormInput type='date' label={`Date of birth ${user.birthDate && `(${formatDate(user.birthDate)})`}`} name="birthDate" defaultValue={user.birthDate} />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-start w-full gap-4 md:gap-10">
          <FormSelect
            name="race"
            label="Race"
            data={raceList}
            placeholder="Select race"
            defaultValue={user.race}
          />
          <FormSelect
            name="gender"
            label="Gender"
            data={genderList}
            placeholder="Select gender"
            defaultValue={user.gender}
          />

          <FormSelect
            name="title"
            label="Title"
            data={titleList}
            placeholder="Select title"
            defaultValue={user.title}
          />
        </div>

        {form.formState.isSubmitting ? <Loader /> : <Button className='w-max' type="submit">Update</Button>}
        <ResponseMessage errorMessage={errorMessage} successMessage={successMessage} />
      </form>
    </Form>
  );
}
