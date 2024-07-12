'use client';

import { AddressFragment, ContactFragment } from '@erecruitment/client';
import { Button } from '@erecruitment/ui';

import React from 'react';
import { CreateAddress } from './CreateAddress';
import { UpdateAddress } from './UpdateAddress';



export const AddressDisplay = (props: AddressDisplayProps) => {
  const { address, userId } = props;

  const haveAddress: boolean = address[0]?.id ? true : false;

  return (
    <div className="w-full h-full flex flex-col gap-y-4">
      <h1 className="font-bold text-2xl border-b w-max self-center">Address Details</h1>

      {!haveAddress ? (
        <div className="flex flex-col gap-2 w-full items-center h-full justify-center">
          <p className="text-gray-500 font-normal ">No Address found</p>
          <CreateAddress userId={userId}/>
        </div>
      ):
        
        <UpdateAddress address={address[0]}/>
      }
    </div>
  );
};

export type AddressDisplayProps = {
  address: AddressFragment;
  userId: string;
};
