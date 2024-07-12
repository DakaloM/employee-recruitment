import { UpdateExperienceInput } from "@erecruitment/client";
import { Context } from "~/context";
import { Experience } from "../experience";
import { NotFoundError } from "@erecruitment/serverkit";


export async function updateExperience(input: UpdateExperienceInput, ctx: Context) {
  const { id, ...attrs} = input;

  const experience = await Experience.query(ctx.db).findById(id);
  if(!experience) {
    throw new NotFoundError({
      message: 'Experience not found'
    })
  }

  const patchInput = JSON.parse(JSON.stringify(attrs));

  const updatedExperience = experience.$query(ctx.db).patchAndFetch(patchInput);

  return updatedExperience;
}