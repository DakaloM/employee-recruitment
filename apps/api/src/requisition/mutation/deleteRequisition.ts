import { Context } from "~/context";
import { Requisition } from "../requisition";
import { NotFoundError } from "@erecruitment/serverkit";


export async function deleteRequisition(id: string, ctx: Context) {
  
  const requisition = await Requisition.query(ctx.db).findById(id);

  if(!requisition){
    throw new NotFoundError({
      message: 'Requisition not found'
    })
  }

   await requisition.$query(ctx.db).delete();

   return {
    message: 'Requisition deleted successfully'
   }

  

   
}