import { isActiveUser } from "~/account/shield";
import { builder } from "~/graphql/builder";
import { QuestionSchema } from "./question";
import { updateQuestion } from "../mutations";

const UpdateQuestionInput = builder.inputType("UpdateQuestionInput", {
  fields: (t) => ({
    id: t.string({ required: true }),
    question: t.string({ required: false }),
    answer: t.string({ required: false }),
  }),
});

builder.mutationField("updateJobQuestion", (t) =>
  t.field({
    shield: isActiveUser,
    description: "Update job question",
    args: {
      input: t.arg({ type: UpdateQuestionInput, required: true }),
    },
    type: QuestionSchema,
    resolve: async (_root, args, ctx) => {
      return updateQuestion(args.input, ctx);
    },
  })
);
