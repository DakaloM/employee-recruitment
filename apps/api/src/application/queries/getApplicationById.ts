import { Context } from "~/context";
import { Application } from "../application";
import { NotFoundError } from "@erecruitment/serverkit";



export async function getApplicationById(id: string, ctx: Context) {

  const application = await Application.query(ctx.db).findById(id)
  .withGraphFetched('requisition')
  .withGraphFetched('applicant')
  .withGraphFetched('user')
  .withGraphFetched('job')

  if(!application){
    throw new NotFoundError({
      message: 'Application not found'
    })
  }

  return application;
}
