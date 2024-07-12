import { builder } from "~/graphql/builder";

import { allow } from "graphql-shield";

import { Advert, AdvertStatus } from "../advert";
import { getAdvertById, getAdverts } from "../queries";
import { HasRequisitionType } from "./hasRequisition";
import { RequisitionSchema } from "./requisition";
import { HasQuestionsType } from "~/question/graphql/hasQuestions";
import { QuestionSchema } from "~/question/graphql";
import { sequence } from "@erecruitment/testkit/dist/faker";


export const AdvertStatusSchema = builder.enumType(AdvertStatus, {
  name: "AdvertStatus",
  description: "Status of the advert advertising a job position",
});

export const AdvertFilter = builder.inputType("AdvertFilter", {
  fields: (t) => ({
    search: t.field({ type: "String", required: false }),
    limit: t.field({ type: "Int", defaultValue: 10 }),
    page: t.field({ type: "Int", defaultValue: 1 }),
  }),
});

export const AdvertSchema = builder.objectType(Advert, {
  name: "Advert",
  description: "An advert for a job position",
  shield: allow,
  interfaces: [HasRequisitionType, HasQuestionsType],
  fields: (t) => ({
    id: t.exposeID("id"),
    requisitionId: t.exposeString("requisitionId"),
    positionTitle: t.exposeString("positionTitle"),
    title: t.exposeString("title"),
    location: t.exposeString("location"),
    sequence: t.exposeInt("sequence"),
    requisition: t.expose("requisition", {
      type: RequisitionSchema,
      description: "Requisition",
    }),
    questions: t.expose("questions", { type: [QuestionSchema]}),
    status: t.expose("status", {
      type: AdvertStatusSchema,
      description: "Advert status",
     
    }),
    createdAt: t.expose("createdAt", { type: "Date" }),
  }),
});

builder.queryField("adverts", (t) =>
  t.field({
    shield: allow,
    description: "A list of job advertisements",
    args: {
      input: t.arg({ type: AdvertFilter, required: false }),
    },
    type: [AdvertSchema],
    resolve: async (_root, args, ctx) => {
      return await getAdverts(ctx, args.input || {});
    },
  })
);

builder.queryField("advert", (t) =>
  t.field({
    shield: allow,
    description: "A single job advertisements",
    args: {
      id: t.arg.id({ required: true }),
    },
    type: AdvertSchema,
    resolve: async (_root, args, ctx) => {
      return await getAdvertById(args.id.toLocaleString(), ctx);
    },
  })
);
