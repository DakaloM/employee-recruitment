import { CreateExperienceInput } from "@erecruitment/client";
import { Context } from "~/context";
import { Experience } from "../experience";


export async function createExperience(input: CreateExperienceInput, ctx: Context) {
  const newExperience = Experience.query(ctx.db).insertAndFetch(input);

  return newExperience;
}