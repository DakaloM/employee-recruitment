import { builder } from "~/graphql/builder";
import { InterviewPackage } from "../interview_package";
import { isActiveUser, isDashboardOperator } from "~/account/shield";
import { getInterviewPackage } from "../queries";
import { HasQuestionsType, QuestionSchema } from "~/question/graphql";


export const InterviewPackageSchema = builder.objectType(InterviewPackage, {
    name: "InterviewPackage",
    description: "An interview package object",
    shield: isDashboardOperator,
    interfaces: [HasQuestionsType],
    fields: (t) => ({
        id: t.exposeID("id"),
        jobId: t.exposeID("jobId"),
        date: t.expose("date", { type: "Date" }),
        time: t.exposeString("time"),
        location: t.exposeString("location"),
        description: t.exposeString("description"),
        questions: t.expose('questions',{type: [QuestionSchema]}),
    }),
})

builder.queryField("interviewPackage", (t) =>
    t.field({
      shield: isActiveUser,
      args: {
        jobId: t.arg({ type: "String", required: true }),
      },
      type: InterviewPackageSchema,
      resolve: async (_root, args, ctx) => {
        return await getInterviewPackage(args.jobId, ctx);
      },
    })
  );