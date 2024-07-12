import { isDashboardOperator } from "~/account/shield";
import { builder } from "~/graphql/builder";
import { InterviewSchema } from "./interview";
import { reScheduleInterview } from "../mutation";

const ReScheduleInterviewInput = builder.inputType("ReScheduleInterviewInput", {
    fields: (t) => ({
      id: t.string({ required: true }),
      date: t.field({ type: "Date", required: true }),
      location: t.string({ required: false }),
      time: t.string({ required: true }),
      description: t.string({ required: false }),
    }),
  });


builder.mutationField("reScheduleInterview", (t) =>
    t.field({
      shield: isDashboardOperator,
      description: "Reschedule an interview with the applicant",
      args: {
        input: t.arg({ type: ReScheduleInterviewInput, required: true }),
      },
      type: InterviewSchema,
      resolve: async (_root, args, ctx) => {
        return await reScheduleInterview(args.input, ctx);
      },
    })
  );
  