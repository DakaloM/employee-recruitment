import { shield } from "graphql-shield/typings/types";
import { isActiveUser } from "~/account/shield";
import { builder } from "~/graphql/builder";
import { ExperienceSchema } from "./experience";
import { createExperience } from "../mutation";
import { RegionSchema } from "~/education/graphql";


const CreateExperienceInput = builder.inputType('CreateExperienceInput', {
  fields: (t) => ({
    userId: t.string({required: true}),
    employer: t.string({required: true}),
    startDate: t.field({type: 'Date', required: true}),
    endDate: t.field({type: 'Date', required: true}),
    country: t.string({required: true}),
    region: t.field({type: RegionSchema, required: true}),
    industry: t.string({required: true}),
    jobTitle: t.string({required: true}),
    workContract: t.string({required: true}),

  })
});

builder.mutationField('createExperience', (t) => (
  t.field({
    shield: isActiveUser,
    description: 'Create user work experience',
    args: {
      input: t.arg({type: CreateExperienceInput, required: true}),
    },
    type: ExperienceSchema,
    resolve: async (_root, args, ctx) => {
      return await createExperience(args.input, ctx);
    }
  })
))