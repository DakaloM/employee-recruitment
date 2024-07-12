import { builder } from "~/graphql/builder";
import { EducationLevelSchema, EducationSchema, FinalGradeSchema, RegionSchema } from "./education";
import { isActiveUser } from "~/account/shield";
import { createEducation } from "../mutation";


const CreateEducationInput = builder.inputType('CreateEducationInput', {
  fields: (t) => ({
    userId: t.string({required: true}),
    institution: t.string({required: true}),
    startDate: t.field({type: 'Date', required: true}),
    endDate: t.field({type: 'Date', required: true}),
    country: t.string({required: true}),
    region: t.field({type: RegionSchema, required: true}),
    location: t.string({required: true}),
    educationLevel: t.field({type: EducationLevelSchema, required: true}),
    finalGrade: t.field({type: FinalGradeSchema, required: true}),

  })
});

builder.mutationField('createEducation', (t) => (
  t.field({
    shield: isActiveUser,
    description: 'Create education',
    args: {
      input: t.arg({type: CreateEducationInput, required: true})
    },
    type: EducationSchema,
    resolve: async(_root, args, ctx) => {
      return createEducation(args.input, ctx);
    }
  })
))