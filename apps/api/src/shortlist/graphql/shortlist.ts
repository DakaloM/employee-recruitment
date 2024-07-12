import { builder } from "~/graphql/builder";
import { Shortlist } from "../shortlist";
import { isActiveUser, isDashboardOperator } from "~/account/shield";
import { getShortlistById, getShortlists } from "../queries";

export const ShortlistSchema = builder.objectType(Shortlist, {
  name: "Shortlist",
  description: "Shortlist details",
  shield: isActiveUser,
  fields: (t) => ({
    id: t.exposeID("id"),
    applicationId: t.exposeString("applicationId"),
    jobId: t.exposeString("jobId"),
    jobTitle: t.exposeString("jobTitle"),
    applicantId: t.exposeString("applicantId"),
    name: t.exposeString("name"),
    surname: t.exposeString("surname"),
    sequence: t.exposeInt("sequence"),
  }),
});

const ShortlistFilter = builder.inputType("ShortlistFilter", {
  fields: (t) => ({
    page: t.int({ required: false }),
    limit: t.int({ required: false }),
    search: t.string({ required: false }),
  }),
})

builder.queryField("shortlists", (t) =>
  t.field({
    shield: isDashboardOperator,
    description: "list of shortlisted applicants",
    args: {
      input: t.arg({ type: ShortlistFilter, required: false }),
    },
    type: [ShortlistSchema],
    resolve: async (_root, args, ctx) => {
      return await getShortlists(args.input || {}, ctx);
    },
  })
);

builder.queryField("shortlist", (t) =>
  t.field({
    shield: isDashboardOperator,
    description: "one shortlisted applicant",
    args: {
      id: t.arg.id({required: true }),
    },
    type: ShortlistSchema,
    resolve: async (_root, args, ctx) => {
      return await getShortlistById(args.id.toLocaleString(), ctx);
    },
  })
);



