import { builder } from "~/graphql/builder";
import { Interview, InterviewStatus } from "../interview";
import { isActiveUser, isDashboardOperator } from "~/account/shield";
import { getInterviewById, getInterviews } from "../queries";
import { sequence } from "@erecruitment/testkit/dist/faker";

export const InterviewStatusSchema = builder.enumType(InterviewStatus, {
  name: 'InterviewStatus',
  description: 'Interview status',
});

export const InterviewSchema = builder.objectType(Interview, {
  name: "Interview",
  description: "Interview details",
  shield: isDashboardOperator,
  fields: (t) => ({
    id: t.exposeID("id"),
    applicationId: t.exposeString("applicationId"),
    jobId: t.exposeString("jobId"),
    jobTitle: t.exposeString("jobTitle"),
    status: t.expose("status", {type: InterviewStatusSchema}),
    applicantId: t.exposeString("applicantId"),
    name: t.exposeString("name"),
    surname: t.exposeString("surname"),
    sequence: t.exposeInt("sequence"),
    date: t.expose("date", { type: "Date" }),
    time: t.exposeString("time"),
    location: t.exposeString("location"),
    description: t.exposeString("description", { nullable: true }),
  }),
});

export const interviewFilter = builder.inputType("InterviewFilter", {
  fields: (t) => ({
    limit: t.field({ type: "Int", defaultValue: 10 }),
    page: t.field({ type: "Int", defaultValue: 1 }),
    search: t.field({ type: "String", required: false }),
  }),
});

builder.queryField("interviews", (t) =>
  t.field({
    shield: isDashboardOperator,
    description: "Interview list",
    args: {
      input: t.arg({ type: interviewFilter, required: false }),
    },
    type: [InterviewSchema],
    resolve: async (_root, args, ctx) => {
      return await getInterviews(args.input || {}, ctx);
    },
  })
);

builder.queryField("interview", (t) =>
  t.field({
    shield: isActiveUser,
    description: "Interview",
    args: {
      id: t.arg.id({ required: true }),
    },
    type: InterviewSchema,
    resolve: async (_root, args, ctx) => {
      return await getInterviewById(args.id.toString(), ctx);
    },
  })
);
