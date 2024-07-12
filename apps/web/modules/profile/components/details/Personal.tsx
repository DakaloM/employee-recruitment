import React from 'react'
import { PersonalDetailsForm } from './form';

export const Personal = (props: PersonalProps) => {

  const {user} = props;
  return (
    <div className='w-full h-full flex flex-col gap-y-4'>
      <h1 className='font-bold text-2xl border-b w-max self-center'>Personal Details</h1>

      <PersonalDetailsForm user={user} />
    </div>
  )
}


export type PersonalProps = {
  user : {
    id: string;
    status: string;
    email: string;
    title: string;
    birthDate: string;
    name: string;
    surname: string;
    middleName: string;
    gender: string;
    race: string;
    idNumber: string;
  }
}