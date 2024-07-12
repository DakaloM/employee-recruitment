import { builder } from "~/graphql/builder";
import { EducationLevelSchema, EducationSchema, FinalGradeSchema, RegionSchema } from "./education";
import { isActiveUser } from "~/account/shield";
import { updateEducation } from "../mutation";


const UpdateEducationInput = builder.inputType('UpdateEducationInput', {
  fields: (t) => ({
    id: t.string({required: true}),
    institution: t.string({required: false}),
    startDate: t.field({type: 'Date', required: false}),
    endDate: t.field({type: 'Date', required: false}),
    country: t.string({required: false}),
    region: t.field({type: RegionSchema, required: false}),
    location: t.string({required: false}),
    educationLevel: t.field({type: EducationLevelSchema, required: false}),
    finalGrade: t.field({type: FinalGradeSchema, required: false}),

  })
});

builder.mutationField('updateEducation', (t) => (
  t.field({
    shield: isActiveUser,
    description: 'Update education',
    args: {
      input: t.arg({type: UpdateEducationInput, required: true})
    },
    type: EducationSchema,
    resolve: async(_root, args, ctx) => {
      return updateEducation(args.input, ctx);
    }
  })
))