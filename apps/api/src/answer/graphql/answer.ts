import { builder } from "~/graphql/builder";
import { Answer } from "../answer";
import { isActiveUser } from "~/account/shield";
import { getApplicantAnswers } from "../queries";
import { AnswerQuestionType } from "~/question/graphql";
import { allow } from "graphql-shield";

export const AnswerSchema = builder.objectType(Answer, {
  name: "Answer",
  description: "Answer to a question",
  interfaces: [AnswerQuestionType],
  shield: isActiveUser,
  fields: (t) => ({
    id: t.exposeID("id"),
    questionId: t.exposeString("questionId"),
    refId: t.exposeString("refId"),
    applicantId: t.exposeString("applicantId"),
    answer: t.exposeString("answer"),
  }),
});

builder.queryField("answers", (t) =>
  t.field({
    shield: isActiveUser,
    description: "applicant answers",
    args: {
      applicantId: t.arg({ type: "String", required: true }),
      refId: t.arg({ type: "String", required: true }),
    },
    type: [AnswerSchema],
    resolve: async (_root, args, ctx) => {
      return getApplicantAnswers({
        applicantId: args.applicantId,
        refId: args.refId,
      }, ctx);
    },
  })
);
