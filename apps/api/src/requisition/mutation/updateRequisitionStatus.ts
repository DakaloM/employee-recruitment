import { AdvertStatus, RequisitionStatus,  } from "~/requisition";
import { Context } from "~/context";
import { Requisition } from "../requisition";
import { NotFoundError } from "@erecruitment/serverkit";
import { Advert } from "../advert";
import { UpdateRequisitionStatusInput } from "@erecruitment/client";
import { cloneWith } from "lodash";


export async function updateRequisitionStatus(input: UpdateRequisitionStatusInput, ctx: Context) {
  const { id } = input;

  const status = input.status as RequisitionStatus


  //Check if requisition exists
  const requisition = await Requisition.query(ctx.db).findById(id);

  if(!requisition){
    throw new NotFoundError({
      message: 'requisition not found'
    })
  }

  

  return await Requisition.transaction(ctx.db, async (trx) => {

   
    // create an advert if the status is approved
    if(status === RequisitionStatus.Approved){
      await Advert.query(ctx.db).insert({
        requisitionId: requisition.id,
        title: requisition.title,
        positionTitle: requisition.positionTitle,
        status: AdvertStatus.Open,
        location: requisition.location,
      })
    }


    const updatedRequisition = await Requisition.query(trx).patchAndFetchById(id, {status})
  
    return updatedRequisition;
  })
  

}