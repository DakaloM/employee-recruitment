import { Context } from "~/context";
import { Experience } from "../experience";


export async function getUserExperiences(userId: string, ctx: Context) {
  
  const experiences =  await Experience.query(ctx.db).where({userId});
  
  return experiences;
}