import { isActiveUser } from "~/account/shield";
import { builder } from "~/graphql/builder";
import { ExperienceSchema } from "./experience";
import { updateExperience } from "../mutation";
import { RegionSchema } from "~/education/graphql";


const UpdateExperienceInput = builder.inputType('UpdateExperienceInput', {
  fields: (t) => ({
    id: t.string({required: true}),
    employer: t.string({required: false}),
    startDate: t.field({type: 'Date', required: false}),
    endDate: t.field({type: 'Date', required: false}),
    country: t.string({required: false}),
    region: t.field({type: RegionSchema, required: true}),
    industry: t.string({required: false}),
    jobTitle: t.string({required: false}),
    workContract: t.string({required: false}),

  })
});


builder.mutationField('updateExperience', (t) => (
  t.field({
    shield: isActiveUser,
    description: 'Update user work experience',
    args: {
      input: t.arg({type: UpdateExperienceInput, required: true}),
    },
    type: ExperienceSchema,
    resolve: async (_root, args, ctx) => {
      return await updateExperience(args.input, ctx);
    }
  })
))