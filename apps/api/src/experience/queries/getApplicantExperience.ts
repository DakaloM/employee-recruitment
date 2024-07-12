import { Context } from "~/context";
import { Experience } from "../experience";


export async function getApplicantExperience(userId: string, ctx: Context) {
  
  const experiences = await Experience.query(ctx.db).where({userId});

  return experiences;
}