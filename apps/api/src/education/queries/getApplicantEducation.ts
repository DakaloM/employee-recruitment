import { Context } from "~/context";
import { Education } from "../education";


export async function getApplicantEducation(userId: string, ctx: Context) {
  
  const education = await Education.query(ctx.db).where({userId});

  return education;
}