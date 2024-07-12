import { builder } from "~/graphql/builder";
import { Education, EducationLevel, FinalGrade, Region } from "../education";
import { isActiveUser } from "~/account/shield";
import { getUserEducation, getEducationById } from "../queries";


export const EducationLevelSchema = builder.enumType(EducationLevel, {
  name: 'EducationLevel',
  description: 'Education type'
});

export const FinalGradeSchema = builder.enumType(FinalGrade, {
  name: 'FinalGrade',
  description: 'Final grade'
});

export const RegionSchema = builder.enumType(Region, {
  name: 'Region',
  description: 'Region'
});


export const EducationSchema = builder.objectType(Education, {
  name: 'Education',
  description: "Applicant's education details",
  shield: isActiveUser,
  fields: (t) => ({
    id: t.exposeID('id'),
    userId: t.exposeString('userId'),
    institution: t.exposeString('institution'),
    educationLevel: t.expose('educationLevel', {type: EducationLevelSchema, description: 'Education level'}),
    finalGrade: t.expose('finalGrade', {type: FinalGradeSchema, description: 'Final grade passed'}),
    startDate: t.expose('startDate', {type: 'Date', description: 'Education start date'}),
    endDate: t.expose('endDate', {type: 'Date', description: 'Education end date'}),
    country: t.exposeString('country'),
    region: t.expose('region', {type: RegionSchema, description: 'Region'}),
    location: t.exposeString('location'),
    
  })
});

builder.queryField('userEducation', (t) => (
  t.field({
    shield: isActiveUser,
    description: 'User education information',
    args: {},
    type: [EducationSchema],
    resolve: async (_root, args, ctx) => {
      return getUserEducation(ctx);
    }
  })
));

builder.queryField('education', (t) => (
  t.field({
    shield: isActiveUser,
    description: 'Education',
    args: {
      id: t.arg.id({required: true})
    },
    type: EducationSchema,
    resolve: async (_root, args, ctx) => {
      return getEducationById(args.id.toString(), ctx);
    }
  })
));