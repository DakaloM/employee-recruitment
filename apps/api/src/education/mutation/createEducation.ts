import { CreateEducationInput } from "@erecruitment/client";
import { Context } from "~/context";
import { Education } from "../education";


export async function createEducation(input: CreateEducationInput, ctx: Context) {
  
  const newEducation = Education.query(ctx.db).insertAndFetch(input);

  return newEducation;
}