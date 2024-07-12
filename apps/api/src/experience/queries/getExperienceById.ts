import { Context } from "~/context";
import { Experience } from "../experience";
import { NotFoundError } from "@erecruitment/serverkit";


export async function getExperienceById(id: string, ctx: Context) {
  
  const experience =  await Experience.query(ctx.db).findById(id);
  if(!experience){
    throw new NotFoundError({
      message: 'Experience not found'
    })
  }

  return experience;
}