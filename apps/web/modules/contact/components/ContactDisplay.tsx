'use client';

import { ContactFragment } from '@erecruitment/client';
import React from 'react';
import { CreateContact } from './CreateContact';
import { UpdateContact } from './UpdateContact';

export const ContactDisplay = (props: ContactDisplayProps) => {
  const { contact, userId } = props;

  const haveContact: boolean = contact ? true : false;

  return (
    <div className="w-full h-full flex flex-col gap-y-4">
      <h1 className="font-bold text-2xl border-b w-max self-center">Contact Details</h1>

      {!haveContact ? (
        <div className="flex flex-col gap-2 w-full items-center h-full justify-center">
          <p className="text-gray-500 font-normal ">No contact found</p>
          <CreateContact userId={userId} />
        </div>
      ):
        <UpdateContact contact={contact}/>
      }
    </div>
  );
};

export type ContactDisplayProps = {
  contact: ContactFragment;
  userId: string;
};
