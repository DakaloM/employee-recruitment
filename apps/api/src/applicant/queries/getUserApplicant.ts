import { Context } from "~/context";
import { Applicant } from "../applicant";
import { NotFoundError } from "@erecruitment/serverkit";


export async function getUserApplicant(userId: string, ctx: Context) {
  const applicant = await Applicant.query(ctx.db).findOne({userId});

  if(!applicant) {
    throw new NotFoundError({
      message: 'Applicant not found'
    })
  }

  return applicant;
}