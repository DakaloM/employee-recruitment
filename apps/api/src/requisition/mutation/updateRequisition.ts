import { UpdateRequisitionInput } from '@erecruitment/client';
import { ForbiddenError, NotFoundError } from '@erecruitment/serverkit';

import { Context } from '~/context';

import { Requisition, RequisitionStatus } from '../requisition';
import { Advert } from '../advert';

export async function updateRequisition(input: UpdateRequisitionInput, ctx: Context) {
  const {
    id,
    title,
    endDate,
    location,
    positionTitle,
    hiringDate,
    qualifications,
    experience,
    hierarchy,
  } = input;

  const requisitionData = {
    id,
    title,
    endDate,
    positionTitle,
    hiringDate,
    qualifications,
    experience,
    hierarchy,
    location,
  };

  //Check if requisition exists
  const requisition = await Requisition.query(ctx.db).findById(id);

  if (!requisition) {
    throw new NotFoundError({
      message: 'requisition not found',
    });
  }

  const requisitionStatus = requisition.status as RequisitionStatus;
  if(requisitionStatus === RequisitionStatus.Approved){
    
    throw new ForbiddenError({
      message: 'Approved requisition can not be edited'
    })
    
  }


  const requisitionPatchInput = JSON.parse(JSON.stringify(requisitionData));

  return await Requisition.transaction(ctx.db, async (trx) => {
   
    const updatedRequisition = await requisition
      .$query(trx)
      .patchAndFetch(requisitionPatchInput)
      .withGraphFetched('manager');
    return updatedRequisition;
  });
}
