import { CreateAnswerInput } from "@erecruitment/client";
import { NotFoundError } from "@erecruitment/serverkit";
// import { Applicant } from "~/account";
import { Context } from "~/context";
import { Answer } from "../answer";

export async function createAnswers(input: CreateAnswerInput, ctx: Context) {
  const { applicantId, answers } = input;

  // const applicant = await Applicant.query(ctx.db).findById(applicantId);

  // if (!applicant) {
  //   throw new NotFoundError({
  //     message: "Applicant not found",
  //   });
  // }

  const data = answers.map((answer) => {
    return {
      applicantId,
      ...answer,
    };
  });

  return Answer.query(ctx.db).insertGraph(data);
}
