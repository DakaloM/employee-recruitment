import { builder } from "~/graphql/builder";
import { QuestionSchema } from "./question";
import { getJobQuestions, getQuestionsByRefId } from "../queries";
import { BaseModelInstance } from "@erecruitment/datakit";
import { Question } from "..";

//@ts-ignore
export const HasQuestionsType = builder.interfaceType("HasQuestions", {
  fields: (t) => ({
    questions: t.field({
      type: [QuestionSchema],
      args: {},
      description: "List of job questions",
      resolve: async (root, _args, ctx) => {
        const parent = root as BaseModelInstance;

        const questions = await getQuestionsByRefId(parent.id, ctx);

        return questions;
      },
    }),
  }),
});

//@ts-ignore
export const AnswerQuestionType = builder.interfaceType("HasAnswerQuestion", {
  fields: (t) => ({
    question: t.field({
      type: QuestionSchema,
      args: {},
      description: "List of job questions to match the answer",
      resolve: async (root, _args, ctx) => {
        const parent = root as BaseModelInstance;

        const question = await Question.query(ctx.db)
          .where("jobId", "=", (parent as any).questionId)
          .first();

        if (!question) {
          throw new Error("Question not found");
        }

        return question;
      },
    }),
  }),
});
