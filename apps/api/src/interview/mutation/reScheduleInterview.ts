import { ReScheduleInterviewInput } from "@erecruitment/client";
import { Context } from "~/context";
import { Interview, InterviewStatus } from "../interview";
import { NotFoundError } from "@erecruitment/serverkit";

export async function reScheduleInterview(
  input: ReScheduleInterviewInput,
  ctx: Context
) {

  const { id, ...others } = input;

  const interview = await Interview.query(ctx.db).findById(id);

  if (!interview) {
    throw new NotFoundError({
      message: `Interview not found`,
    });
  }

  const change = JSON.parse(JSON.stringify(others));

  const updatedInterview = await Interview.query(ctx.db).patchAndFetchById(id,{
    ...change,
    status: InterviewStatus.Rescheduled,
  });

  //Todo: send email to the applicant
  // Create a notification to the applicant

  return updatedInterview;
}
