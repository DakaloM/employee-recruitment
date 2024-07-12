import { isActiveUser } from "~/account/shield";
import { builder } from "~/graphql/builder";
import { QuestionSchema, QuestionTypeSchema } from "./question";
import { createJobQuestion } from "../mutations";

const CreateQuestionInput = builder.inputType("CreateQuestionInput", {
  fields: (t) => ({
    refId: t.string({ required: true }),
    question: t.string({ required: true }),
    answer: t.string({ required: true }),
    type: t.field({ type: QuestionTypeSchema, required: true }),
  }),
});

builder.mutationField("createJobQuestion", (t) =>
  t.field({
    shield: isActiveUser,
    description: "Create job question",
    args: {
      input: t.arg({ type: CreateQuestionInput, required: true }),
    },
    type: QuestionSchema,
    resolve: async (_root, args, ctx) => {
      return createJobQuestion(args.input, ctx);
    },
  })
);
