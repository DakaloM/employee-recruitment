import { Context } from "~/context";
import { Education } from "../education";
import { NotFoundError } from "@erecruitment/serverkit";


export async function getUserEducation(ctx: Context) {
  
  const educations = await Education.query(ctx.db).whereIn('userId', ctx.auth?.actorIds);

  return educations
}