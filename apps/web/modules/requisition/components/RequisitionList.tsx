'use client';

import { RequisitionFragment } from '@erecruitment/client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { z } from 'zod';
import { ListDisplay } from '~/modules/shared';

import { CreateRequisition } from './CreateRequisition';

export const requisitionSchema = z.object({
  id: z.string(),
  objectId: z.string(),
  positionTitle: z.string(),
  location: z.string(),
  endDate: z.date(),
  hiringDate: z.date(),
  status: z.string(),
});

type RequisitionSchemaType = z.infer<typeof requisitionSchema>;

export const RequisitionList = ({ requisitions }: RequisitionListProps) => {
  const router = useRouter();

  const handleClick = async (requisition: RequisitionSchemaType) => {
    router.push(`/dashboard/requisitions/${requisition.id}`);
  };

  return (
    <ListDisplay
      data={requisitions}
      schema={requisitionSchema}
      onItemSelect={handleClick}
      Create={CreateRequisition}
      title="List of requisitions"
    />
  );
};

type RequisitionListProps = {
  requisitions: RequisitionFragment[];
};
