import { isDashboardOperator } from "~/account/shield";
import { builder } from "~/graphql/builder";
import { InterviewSchema } from "./interview";
import { createInterview } from "../mutation";

const CreateInterviewInput = builder.inputType("CreateInterviewInput", {
  fields: (t) => ({
    applicationId: t.string({ required: true }),
    jobId: t.string({ required: true }),
    applicantId: t.string({ required: true }),
    date: t.field({ type: "Date", required: true }),
    time: t.string({ required: true }),
    location: t.string({ required: true }),
    description: t.string({ required: true }),
  }),
});

builder.mutationField("createInterview", (t) =>
  t.field({
    shield: isDashboardOperator,
    description: "Schedule an interview with the applicant",
    args: {
      input: t.arg({ type: CreateInterviewInput, required: true }),
    },
    type: InterviewSchema,
    resolve: async (_root, args, ctx) => {
      return await createInterview(args.input, ctx);
    },
  })
);
