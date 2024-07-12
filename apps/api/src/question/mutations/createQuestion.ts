import { CreateQuestionInput } from "@erecruitment/client";
import { Context } from "~/context";
import { ConflictError } from "@erecruitment/serverkit";
import { Question } from "../question";

export async function createJobQuestion(
  input: CreateQuestionInput,
  ctx: Context
) {
  const existingQuestion = await Question.query(ctx.db).findOne({
    refId: input.refId,
    question: input.question,
  });

  if (existingQuestion) {
    throw new ConflictError({
      message: "Question already exists",
    });
  }

  const newQuestion = Question.query(ctx.db).insertAndFetch(input);

  return newQuestion;
}
