import { UpdateInterviewStatusInput } from "@erecruitment/client";
import { Context } from "~/context";
import { Interview, InterviewStatus } from "../interview";
import { NotFoundError } from "@erecruitment/serverkit";

export async function updateInterviewStatus(
  input: UpdateInterviewStatusInput,
  ctx: Context
) {
  const { id } = input;

  const interview = await Interview.query(ctx.db).findById(id);

  if (!interview) {
    throw new NotFoundError({
      message: `Interview not found`,
    });
  }

  const status = input.status as InterviewStatus;

  const updatedInterview = await interview.$query(ctx.db)
    .patchAndFetch({
      status,
    });

  //Todo: send email to the applicant
  // Create a notification to the applicant

  return updatedInterview;
}
