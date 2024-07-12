import { isDashboardOperator } from "~/account/shield";
import { builder } from "~/graphql/builder";
import { ShortlistSchema } from "./shortlist";
import { createShortList } from "../mutation";

const CreateShortlistInput = builder.inputType("CreateShortlistInput", {
  fields: (t) => ({
    applicationId: t.string({ required: true }),
    jobId: t.string({ required: true }),
    applicantId: t.string({ required: true }),

  }),
});

builder.mutationField("createShortlist", (t) =>
  t.field({
    shield: isDashboardOperator,
    description: "Add applicant to shortlist",
    args: {
      input: t.arg({ type: CreateShortlistInput, required: true }),
    },
    type: ShortlistSchema,
    resolve: async (_root, args, ctx) => {
      return await createShortList(args.input, ctx);
    },
  })
);
