import { isActiveUser } from "~/account/shield";
import { builder } from "~/graphql/builder";
import { AnswerSchema } from "./answer";
import { createAnswers } from "../mutation";

const Args = builder.inputType("AnswerArgs", {
  fields: (t) => ({
    questionId: t.string({ required: true }),
    jobId: t.string({ required: true }),
    answer: t.string({ required: true }),
  }),
});

export const CreateAnswerInput = builder.inputType("CreateAnswerInput", {
  fields: (t) => ({
    applicantId: t.string({ required: true }),
    answers: t.field({ type: [Args], required: true }),
  }),
});


builder.mutationField("createAnswers", (t) =>
  t.field({
    shield: isActiveUser,
    description: "Create answers",
    args: {
      input: t.arg({ type: CreateAnswerInput, required: true }),
    },
    type: [AnswerSchema],
    resolve: async (_root, args, ctx) => {
      return createAnswers(args.input, ctx);
    },
  })
);

