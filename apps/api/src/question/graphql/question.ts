import { builder } from "~/graphql/builder";
import { isActiveUser, isDashboardOperator } from "~/account/shield";
import { getJobQuestions, getQuestions } from "../queries";
import { Question, QuestionType } from "../question";
import { allow } from "graphql-shield";
import { deleteJobQuestion } from "../mutations";

export const QuestionTypeSchema = builder.enumType(QuestionType, {
  name: "QuestionType",
  description: "Question type",
});

export const QuestionSchema = builder.objectType(Question, {
  name: "Question",
  description: "Job question",
  shield: allow,
  fields: (t) => ({
    id: t.exposeID("id"),
    refId: t.exposeString("refId"),
    question: t.exposeString("question"),
    type: t.exposeString("type"),
    answer: t.exposeString("answer"),
    createdAt: t.expose("createdAt", { type: "Date" }),
    updatedAt: t.expose("updatedAt", { type: "Date" }),
  }),
});

builder.queryField("questions", (t) =>
  t.field({
    shield: allow,
    description: "List of all questions",
    args: {
     
    },
    type: [QuestionSchema],
    resolve: async (_root, args, ctx) => {
      return getQuestions(ctx);
    },
  })
);


builder.queryField("jobQuestions", (t) =>
  t.field({
    shield: allow,
    description: "Job questions",
    args: {
      refId: t.arg({ type: "String", required: true }),
    },
    type: [QuestionSchema],
    resolve: async (_root, args, ctx) => {
      return getJobQuestions(args.refId, ctx);
    },
  })
);

builder.mutationField("deleteQuestion", (t) =>
  t.field({
    shield: isDashboardOperator,
    description: "Delete questions",
    args: {
      id: t.arg.id({ required: true }),
    },
    type: 'Int',
    resolve: async (_root, args, ctx) => {
      return deleteJobQuestion(args.id.toString(), ctx);
    },
  })
);
