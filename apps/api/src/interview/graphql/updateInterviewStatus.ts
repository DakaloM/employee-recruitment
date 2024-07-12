import { isDashboardOperator } from "~/account/shield";
import { builder } from "~/graphql/builder";
import { InterviewSchema, InterviewStatusSchema } from "./interview";
import { updateInterviewStatus } from "../mutation";

const UpdateInterviewStatusInput = builder.inputType(
  "UpdateInterviewStatusInput",
  {
    fields: (t) => ({
      id: t.string({ required: true }),
      status: t.field({ type: InterviewStatusSchema, required: true }),
    }),
  }
);

builder.mutationField("updateInterviewStatus", (t) =>
  t.field({
    shield: isDashboardOperator,
    description: "Schedule an interview with the applicant",
    args: {
      input: t.arg({ type: UpdateInterviewStatusInput, required: true }),
    },
    type: InterviewSchema,
    resolve: async (_root, args, ctx) => {
      return await updateInterviewStatus(args.input, ctx);
    },
  })
);
